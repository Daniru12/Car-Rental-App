from flask import Flask, jsonify, request, g
from flask_cors import CORS
import sqlite3
import re
import hashlib
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Database setup
DATABASE = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'database.db')

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
        db.row_factory = sqlite3.Row
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

def init_db():
    with app.app_context():
        db = get_db()
        cursor = db.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL,
                agreeTerms BOOLEAN NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS bookings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                car_id TEXT NOT NULL,
                car_name TEXT NOT NULL,
                car_image TEXT NOT NULL,
                start_date TEXT NOT NULL,
                end_date TEXT NOT NULL,
                location TEXT NOT NULL,
                status TEXT NOT NULL,
                price REAL NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        ''')
        db.commit()


def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

def is_valid_email(email):
    return re.match(r'^\S+@\S+\.\S+$', email)

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()

    if not data:
        return jsonify({"success": False, "errors": {"general": "No input data provided"}}), 400

    name = data.get('name', '').strip()
    email = data.get('email', '').strip()
    password = data.get('password', '')
    agree_terms = data.get('agreeTerms', False)

    errors = {}

    if not name:
        errors['name'] = 'Name is required'
    if not email:
        errors['email'] = 'Email is required'
    elif not is_valid_email(email):
        errors['email'] = 'Invalid email format'
    if not password:
        errors['password'] = 'Password is required'
    elif len(password) < 6:
        errors['password'] = 'Password must be at least 6 characters'
    if not agree_terms:
        errors['agreeTerms'] = 'You must agree to the terms and conditions'

    if errors:
        return jsonify({"success": False, "errors": errors}), 400

    db = get_db()
    cursor = db.cursor()

    # Check if email already registered
    cursor.execute('SELECT id FROM users WHERE email = ?', (email,))
    if cursor.fetchone():
        return jsonify({"success": False, "errors": {"email": "Email already registered"}}), 400

    hashed_password = hash_password(password)

    cursor.execute('''
        INSERT INTO users (name, email, password, agreeTerms) VALUES (?, ?, ?, ?)
    ''', (name, email, hashed_password, agree_terms))
    db.commit()

    return jsonify({"success": True, "message": "Signup successful!"}), 201


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email', '').strip()
    password = data.get('password', '')

    if not email or not password:
        return jsonify({"success": False, "message": "Email and password required"}), 400

    hashed_password = hash_password(password)

    db = get_db()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM users WHERE email = ?', (email,))
    user = cursor.fetchone()

    if not user or user['password'] != hashed_password:
        return jsonify({"success": False, "message": "Invalid email or password"}), 401

    return jsonify({
        "success": True,
        "message": "Login successful!",
        "user": {
            "id": user['id'],
            "name": user['name'],
            "email": user['email']
        }
    }), 200


# Insert demo bookings
def insert_demo_data():
    with app.app_context():
        db = get_db()
        cursor = db.cursor()
        cursor.execute('SELECT COUNT(*) FROM bookings')
        if cursor.fetchone()[0] == 0:
            demo_bookings = [
                (1, '1', 'Tesla Model 3',
                 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80 ',
                 '2023-07-15', '2023-07-18', 'New York', 'Upcoming', 267),
                (1, '2', 'BMW X5',
                 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80 ',
                 '2023-06-10', '2023-06-12', 'Los Angeles', 'Completed', 360),
                (1, '3', 'Mercedes C-Class',
                 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2031&q=80 ',
                 '2023-05-22', '2023-05-25', 'Chicago', 'Completed', 285),
            ]
            cursor.executemany('''
                INSERT INTO bookings (user_id, car_id, car_name, car_image, start_date, end_date, location, status, price)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', demo_bookings)
            db.commit()


# GET Bookings
@app.route('/api/bookings', methods=['GET'])
def get_bookings():
    user_id = 1  # For demo purposes
    db = get_db()
    cursor = db.cursor()

    cursor.execute('''
        SELECT id, car_id, car_name, car_image, start_date, end_date, location, status, price
        FROM bookings 
        WHERE user_id = ?
    ''', (user_id,))

    rows = cursor.fetchall()

    bookings = [{
        'id': row['id'],
        'carId': row['car_id'],
        'carName': row['car_name'],
        'carImage': row['car_image'],
        'startDate': row['start_date'],
        'endDate': row['end_date'],
        'location': row['location'],
        'status': row['status'],
        'price': row['price'],
    } for row in rows]

    return jsonify({"success": True, "bookings": bookings})


# POST Booking
@app.route('/api/bookings', methods=['POST'])
def create_booking():
    data = request.get_json()

    if not data:
        return jsonify({"success": False, "message": "No input data provided"}), 400

    required_fields = ['user_id', 'car_id', 'car_name', 'car_image', 'start_date', 'end_date', 'location', 'price']
    for field in required_fields:
        if field not in data:
            return jsonify({"success": False, "message": f"Missing required field: {field}"}), 400

    try:
        db = get_db()
        cursor = db.cursor()
        cursor.execute('''
            INSERT INTO bookings (user_id, car_id, car_name, car_image, start_date, end_date, location, status, price)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            data['user_id'],
            data['car_id'],
            data['car_name'],
            data['car_image'],
            data['start_date'],
            data['end_date'],
            data['location'],
            data.get('status', 'Upcoming'),
            data['price']
        ))
        db.commit()
        return jsonify({"success": True, "message": "Booking created successfully"}), 201
    except Exception as e:
        db.rollback()
        return jsonify({"success": False, "message": str(e)}), 500


# Profile endpoint
@app.route('/api/profile', methods=['GET'])
def profile():
    db = get_db()
    cursor = db.cursor()
    cursor.execute('SELECT id, name, email, created_at FROM users LIMIT 1')
    user = cursor.fetchone()
    if not user:
        return jsonify({"success": False, "message": "Unauthorized"}), 401

    created = datetime.strptime(user['created_at'], '%Y-%m-%d %H:%M:%S')
    member_since = created.strftime('%B %Y')

    return jsonify({
        "success": True,
        "user": {
            "id": user['id'],
            "name": user['name'],
            "email": user['email'],
            "avatar": "https://randomuser.me/api/portraits/men/32.jpg ",
            "memberSince": member_since
        }
    })


if __name__ == '__main__':
    init_db()
    insert_demo_data()  # Insert demo bookings once
    app.run(host='0.0.0.0', port=5000, debug=True)