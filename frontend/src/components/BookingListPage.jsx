import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext'; // Assuming you have an AuthContext

const BookingListPage = () => {
  const { user } = React.useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch the list of bookings from the backend
    const fetchBookings = async () => {
      try {
        const response = await fetch(`/api/bookings?user_id=${user.id}`);
        const data = await response.json();
        
        if (data.success) {
          setBookings(data.bookings);  // Set bookings state
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, [user.id]);

  return (
    <div className="container py-8 mx-auto">
      <h2 className="text-2xl font-bold">Your Bookings</h2>
      <div className="grid grid-cols-1 gap-4 mt-4">
        {bookings.length === 0 ? (
          <p>No bookings found</p>
        ) : (
          bookings.map((booking) => (
            <div key={booking.id} className="p-4 bg-white rounded shadow">
              <img src={booking.carImage} alt={booking.carName} className="object-cover w-full h-64" />
              <h3 className="text-xl font-bold">{booking.carName}</h3>
              <p>{booking.startDate} to {booking.endDate}</p>
              <Link to={`/booking/${booking.id}`} className="text-blue-600">View Details</Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BookingListPage;
