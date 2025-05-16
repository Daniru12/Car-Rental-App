from flask import Flask, jsonify, request, g
from flask_cors import CORS
import sqlite3
import re
import hashlib
import os

app = Flask(__name__)
CORS(app)

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

    # Return user info (excluding password)
    return jsonify({
        "success": True,
        "message": "Login successful!",
        "user": {
            "id": user['id'],
            "name": user['name'],
            "email": user['email']
        }
    }), 200

@app.route('/api/profile', methods=['GET'])
def profile():
    # In a real app, you'd check auth token/session and get user id from that.
    # For demo, just return the first user (or 401 if none)
    db = get_db()
    cursor = db.cursor()
    cursor.execute('SELECT id, name, email FROM users LIMIT 1')
    user = cursor.fetchone()
    if not user:
        return jsonify({"success": False, "message": "Unauthorized"}), 401

    return jsonify({
        "success": True,
        "user": {
            "id": user['id'],
            "name": user['name'],
            "email": user['email'],
            "avatar": "https://randomuser.me/api/portraits/men/32.jpg",
            "memberSince": "January 2023"  # you can customize this
        }
    })

if __name__ == '__main__':
    init_db()
    app.run(host='0.0.0.0', port=5000, debug=True)
