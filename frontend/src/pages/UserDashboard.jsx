import React, { useState, useEffect ,useContext } from 'react'
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
 import { AuthContext } from '../AuthContext'; 
 import UserProfile from '../components/UserProfile'; // Adjust the import path as needed

const UserDashboard = ({ userId }) => {
  // For demo/testing: if no userId passed, fallback to 1
const { user } = useContext(AuthContext);  // get logged-in user
  const currentUserId = user?.id;

  

  const [activeTab, setActiveTab] = useState('bookings')
  const [bookings, setBookings] = useState([])
  const [loadingUser, setLoadingUser] = useState(true)
  const [loadingBookings, setLoadingBookings] = useState(true)
  const [errorUser, setErrorUser] = useState(null)
  const [errorBookings, setErrorBookings] = useState(null)

  useEffect(() => {
    if (!currentUserId) return

    setLoadingUser(true)
    setErrorUser(null)
    fetch(`http://localhost:5000/api/profile?user_id=${currentUserId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load profile')
        return res.json()
      })
      .then((data) => {
        if (data.success) {
          setUser(data.user)
        } else {
          setErrorUser('Failed to fetch profile')
        }
      })
      .catch(() => setErrorUser('Failed to fetch profile'))
      .finally(() => setLoadingUser(false))

    setLoadingBookings(true)
    setErrorBookings(null)
    fetch(`http://localhost:5000/api/bookings?user_id=${currentUserId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load bookings')
        return res.json()
      })
      .then((data) => {
        if (data.success) {
          setBookings(data.bookings)
        } else {
          setErrorBookings('Failed to fetch bookings')
        }
      })
      .catch(() => setErrorBookings('Failed to fetch bookings'))
      .finally(() => setLoadingBookings(false))
  }, [currentUserId])

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="container px-4 py-8 mx-auto">
        <h1 className="mb-6 text-3xl font-bold text-gray-800">My Dashboard</h1>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <div className="flex flex-col items-center mb-6">
                {loadingUser ? (
                  <div className="w-20 h-20 mb-4 bg-gray-200 rounded-full animate-pulse" />
                ) : user ? (
                  <>
                    <img
                      src="https://i.postimg.cc/vTm3PGSR/image.png"
                      alt={user.name}
                      className="object-cover w-20 h-20 mb-4 rounded-full"
                    />
                    <h3 className="text-xl font-bold text-gray-800">{user.name}</h3>
                    <p className="text-gray-600">{user.email}</p>
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      <Clock size={14} className="mr-1" />
                      Member since {user.memberSince}
                    </div>
                  </>
                ) : (
                  <p className="text-red-500">Failed to load user info</p>
                )}
              </div>
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`flex items-center w-full px-3 py-2 rounded-md ${
                    activeTab === 'bookings'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Calendar size={18} className="mr-3" />
                  My Bookings
                </button>
                <button
                  onClick={() => setActiveTab('favorites')}
                  className={`flex items-center w-full px-3 py-2 rounded-md ${
                    activeTab === 'favorites'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Car size={18} className="mr-3" />
                  Favorite Cars
                </button>
                <button
                  onClick={() => setActiveTab('payment')}
                  className={`flex items-center w-full px-3 py-2 rounded-md ${
                    activeTab === 'payment'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <CreditCard size={18} className="mr-3" />
                  Payment Methods
                </button>
                
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`flex items-center w-full px-3 py-2 rounded-md ${
                    activeTab === 'settings'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Settings size={18} className="mr-3" />
                  Account Settings
                </button>
                <Link
                  to="/"
                  className="flex items-center w-full px-3 py-2 text-red-600 rounded-md hover:bg-red-50"
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
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <h2 className="mb-4 text-xl font-bold text-gray-800">My Bookings</h2>
                {loadingBookings ? (
                  <p className="text-gray-500">Loading bookings...</p>
                ) : errorBookings ? (
                  <p className="text-red-500">{errorBookings}</p>
                ) : bookings.length > 0 ? (
                  <div className="space-y-6">
                    {bookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="p-4 border border-gray-200 rounded-lg"
                      >
                        <div className="flex flex-col gap-4 md:flex-row">
                          {/* Car Image */}
                          <div className="md:w-1/4">
                            <div className="h-24 overflow-hidden rounded-md md:h-full">
                              <img
                                src={booking.carImage}
                                alt={booking.carName}
                                className="object-cover w-full h-full"
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
                                  {new Date(booking.startDate).toLocaleDateString()}{' '}
                                  -{' '}
                                  {new Date(booking.endDate).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <MapPin size={16} className="mr-2" />
                                <span>{booking.location}</span>
                              </div>
                            </div>
                            <div
                              className={`mt-2 inline-block px-2 py-1 text-xs font-medium rounded-full ${
                                booking.status === 'Upcoming'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-green-100 text-green-800'
                              }`}
                            >
                              {booking.status}
                            </div>
                          </div>
                          {/* Price and Actions */}
                          <div className="flex flex-col items-end justify-between md:w-1/4">
                            <div className="text-right">
                              <div className="text-lg font-bold text-gray-800">
                                ${booking.price}
                              </div>
                              <div className="text-sm text-gray-500">Total</div>
                            </div>
                            <div className="mt-4 md:mt-0">
                              <Link
                                to={`/car/${booking.carId}`}
                                className="text-sm font-medium text-blue-600 hover:text-blue-800"
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
                  <div className="py-8 text-center">
                    <p className="text-gray-500">You don't have any bookings yet.</p>
                    <Link
                      to="/cars"
                      className="inline-block mt-4 font-medium text-blue-600 hover:text-blue-800"
                    >
                      Browse Cars
                    </Link>
                  </div>
                )}
              </div>
            )}
            {/* Other tabs placeholder */}
            {activeTab !== 'bookings' && (
              <div className="p-6 py-12 text-center bg-white rounded-lg shadow-sm">
                <h2 className="mb-4 text-xl font-bold text-gray-800">
                  {activeTab === 'favorites' && 'Favorite Cars'}
                  {activeTab === 'payment' && 'Payment Methods'}
                   
                  {activeTab === 'settings' && 'Account Settings'}
                </h2>
                <p className="text-gray-500">This section is under development.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
