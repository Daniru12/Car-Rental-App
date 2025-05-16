import React, { useState } from 'react'
import {
  Calendar,
  Car,
  CreditCard,
  Settings,
  User,
  LogOut,
  Clock,
  MapPin,
} from 'lucide-react'
import { Link } from 'react-router-dom'
// Mock data for bookings
const bookings = [
  {
    id: 'b1',
    carId: '1',
    carName: 'Tesla Model 3',
    carImage:
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    startDate: '2023-07-15',
    endDate: '2023-07-18',
    location: 'New York',
    status: 'Upcoming',
    price: 267,
  },
  {
    id: 'b2',
    carId: '2',
    carName: 'BMW X5',
    carImage:
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    startDate: '2023-06-10',
    endDate: '2023-06-12',
    location: 'Los Angeles',
    status: 'Completed',
    price: 360,
  },
  {
    id: 'b3',
    carId: '3',
    carName: 'Mercedes C-Class',
    carImage:
      'https://images.unsplash.com/photo-1616422285623-13ff0162193c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2031&q=80',
    startDate: '2023-05-22',
    endDate: '2023-05-25',
    location: 'Chicago',
    status: 'Completed',
    price: 285,
  },
]
const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('bookings')
  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    memberSince: 'January 2023',
  }
  return (
    <div className="bg-gray-50 min-h-screen w-full">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Dashboard</h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col items-center mb-6">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-20 h-20 rounded-full object-cover mb-4"
                />
                <h3 className="text-xl font-bold text-gray-800">{user.name}</h3>
                <p className="text-gray-600">{user.email}</p>
                <div className="text-sm text-gray-500 mt-1 flex items-center">
                  <Clock size={14} className="mr-1" />
                  Member since {user.memberSince}
                </div>
              </div>
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`flex items-center w-full px-3 py-2 rounded-md ${activeTab === 'bookings' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <Calendar size={18} className="mr-3" />
                  My Bookings
                </button>
                <button
                  onClick={() => setActiveTab('favorites')}
                  className={`flex items-center w-full px-3 py-2 rounded-md ${activeTab === 'favorites' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <Car size={18} className="mr-3" />
                  Favorite Cars
                </button>
                <button
                  onClick={() => setActiveTab('payment')}
                  className={`flex items-center w-full px-3 py-2 rounded-md ${activeTab === 'payment' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <CreditCard size={18} className="mr-3" />
                  Payment Methods
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex items-center w-full px-3 py-2 rounded-md ${activeTab === 'profile' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <User size={18} className="mr-3" />
                  Profile Settings
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`flex items-center w-full px-3 py-2 rounded-md ${activeTab === 'settings' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <Settings size={18} className="mr-3" />
                  Account Settings
                </button>
                <Link
                  to="/"
                  className="flex items-center w-full px-3 py-2 rounded-md text-red-600 hover:bg-red-50"
                >
                  <LogOut size={18} className="mr-3" />
                  Logout
                </Link>
              </nav>
            </div>
          </div>
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  My Bookings
                </h2>
                {bookings.length > 0 ? (
                  <div className="space-y-6">
                    {bookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex flex-col md:flex-row gap-4">
                          {/* Car Image */}
                          <div className="md:w-1/4">
                            <div className="rounded-md overflow-hidden h-24 md:h-full">
                              <img
                                src={booking.carImage}
                                alt={booking.carName}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                          {/* Booking Details */}
                          <div className="md:w-2/4">
                            <h3 className="font-bold text-gray-800">
                              {booking.carName}
                            </h3>
                            <div className="mt-2 space-y-1 text-sm">
                              <div className="flex items-center text-gray-600">
                                <Calendar size={16} className="mr-2" />
                                <span>
                                  {new Date(
                                    booking.startDate,
                                  ).toLocaleDateString()}{' '}
                                  -{' '}
                                  {new Date(
                                    booking.endDate,
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <MapPin size={16} className="mr-2" />
                                <span>{booking.location}</span>
                              </div>
                            </div>
                            <div
                              className={`mt-2 inline-block px-2 py-1 text-xs font-medium rounded-full ${booking.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}
                            >
                              {booking.status}
                            </div>
                          </div>
                          {/* Price and Actions */}
                          <div className="md:w-1/4 flex flex-col justify-between items-end">
                            <div className="text-right">
                              <div className="text-lg font-bold text-gray-800">
                                ${booking.price}
                              </div>
                              <div className="text-sm text-gray-500">Total</div>
                            </div>
                            <div className="mt-4 md:mt-0">
                              <Link
                                to={`/car/${booking.carId}`}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                              >
                                View Details
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">
                      You don't have any bookings yet.
                    </p>
                    <Link
                      to="/cars"
                      className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Browse Cars
                    </Link>
                  </div>
                )}
              </div>
            )}
            {/* Other tabs would be implemented similarly */}
            {activeTab !== 'bookings' && (
              <div className="bg-white rounded-lg shadow-sm p-6 text-center py-12">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  {activeTab === 'favorites' && 'Favorite Cars'}
                  {activeTab === 'payment' && 'Payment Methods'}
                  {activeTab === 'profile' && 'Profile Settings'}
                  {activeTab === 'settings' && 'Account Settings'}
                </h2>
                <p className="text-gray-500">
                  This section is under development.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default UserDashboard
