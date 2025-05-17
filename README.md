


# Car Rental App

A full-stack application built with **Python Flask** for the backend and **React** for the frontend, allowing users to browse and rent cars. The app provides a smooth user experience for selecting cars, viewing details, and submitting booking requests.

## Features

### Frontend (React)

- Browse available cars
- View detailed information about each car
- Filter and search for cars by type, price, or availability
- Car gallery with multiple images
- Booking form for users to rent a car

### Backend (Flask)

- Serve car data through RESTful APIs
- Handle user requests for booking cars
- Store booking information (in memory or database)

## Project Structure

```

/car-rental-app
├── /backend
│   ├── app.py              # Flask application entry point
│   ├── /models             # Data models (if using a database)
│   └── /routes             # API routes for handling car data and bookings
├── /frontend
│   ├── /src
│   │   ├── /components     # React components (Car list, Car details, Booking form, etc.)
│   │   ├── /pages          # Pages for displaying the car listing and booking form
│   │   └── App.js          # Main React component
│   └── package.json        # Frontend dependencies and scripts
├── .gitignore              # Git ignore file to exclude node\_modules, Python virtualenv, etc.
└── README.md               # This file

````

## Requirements

### Backend (Flask)

- Python 3.x
- Flask
- Flask-CORS (for handling cross-origin requests)

### Frontend (React)

- Node.js and npm
- React (React Router for routing)
- Axios (for making HTTP requests to the backend)

## Getting Started

### 1. Backend Setup (Flask)

#### Install dependencies

Navigate to the `backend` directory and install the required Python packages.

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
````

#### Running the Flask Backend

To start the Flask server, run:

```bash
python app.py
```

By default, the backend will run at `http://127.0.0.1:5000`.

### 2. Frontend Setup (React)

#### Install dependencies

Navigate to the `frontend` directory and install the required npm packages.

```bash
cd frontend
npm install
```

#### Running the React Frontend

To start the React development server, run:

```bash
npm start
```

By default, the React app will run at `http://localhost:3000`.

### 3. API Endpoints

#### GET `/api/cars`

Fetch a list of all available cars.

**Response Example**:

```json
[
  {
    "id": 1,
    "name": "Tesla Model 3",
    "price": 89,
    "category": "Electric",
    "seats": 5,
    "transmission": "Automatic",
    "fuelType": "Electric",
    "year": 2023,
    "mileage": "0-60 in 5.8s",
    "description": "Experience the future of driving with the Tesla Model 3.",
    "features": [
      "Autopilot capabilities",
      "15-inch touchscreen",
      "Panoramic glass roof"
    ]
  }
]
```

#### POST `/api/book`

Submit a booking request for a car.

**Request Body**:

```json
{
  "carId": 1,
  "pickupDate": "2023-05-15",
  "returnDate": "2023-05-18",
  "pickupLocation": "New York"
}
```

**Response Example**:

```json
{
  "message": "Booking successful! Proceed to payment."
}
```

## Deployment

You can deploy the app on any hosting service like Heroku, AWS, or DigitalOcean. Here’s a quick guide for deploying on **Heroku**:

### Backend (Flask)

1. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli).
2. Log in to your Heroku account:

   ```bash
   heroku login
   ```
3. Create a new Heroku app:

   ```bash
   heroku create car-rental-app
   ```
4. Push your changes to Heroku:

   ```bash
   git push heroku master
   ```

### Frontend (React)

1. Build the React app:

   ```bash
   npm run build
   ```
2. Push the build to a static hosting service, or you can use Heroku to serve the React app as well.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---


