import React, { useState, useEffect, useContext } from 'react'
import {
  Calendar,
  Car,
  CreditCard,
  Settings,
  LogOut,
  Clock,
  MapPin,
  Star,
  StarHalf,
  ExternalLink
} from 'lucide-react'
import { AuthContext } from '../AuthContext'

// Demo data for bookings
const DEMO_BOOKINGS = [
  {
    _id: "b1001",
    car_id: "car1",
    car_name: "Tesla Model 3",
    car_image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80 ',

    start_date: "2025-05-20T10:00:00",
    end_date: "2025-05-23T18:00:00",
    location: "San Francisco, CA",
    status: "Upcoming",
    price: 249,
    rating: 4.5
  },
  {
    _id: "b1002",
    car_id: "car2",
    car_name: "BMW X5",
    car_image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80 ',
    start_date: "2025-04-15T09:00:00",
    end_date: "2025-04-18T17:00:00",
    location: "Los Angeles, CA",
    status: "Completed",
    price: 320,
    rating: 5
  },
  {
    _id: "b1003",
    car_id: "car3",
    car_name: "Ford Mustang",
    car_image:  'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80 ',
    start_date: "2025-03-10T11:00:00",
    end_date: "2025-03-15T10:00:00",
    location: "San Diego, CA",
    status: "Completed",
    price: 275,
    rating: 4
  }
]

// Demo data for favorite cars
const DEMO_FAVORITES = [
  {
    id: "car1",
    name: "Tesla Model 3",
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80 ',
    price_per_day: 83,
    location: "San Francisco, CA",
    rating: 4.5,
    type: "Electric"
  },
  {
    id: "car4",
    name: "Porsche 911",
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80 ',

    price_per_day: 150,
    location: "San Francisco, CA",
    rating: 4.8,
    type: "Sports"
  },
  {
    id: "car5",
    name: "Jeep Wrangler",
    image: 'https://images.unsplash.com/photo-1566473965997-3de9c817e938?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80 ',

    price_per_day: 95,
    location: "Los Angeles, CA",
    rating: 4.3,
    type: "SUV"
  }
]

// Demo payment methods
const DEMO_PAYMENT_METHODS = [
  {
    id: "pm1",
    type: "credit_card",
    last4: "4242",
    brand: "Visa",
    expMonth: 12,
    expYear: 2026,
    isDefault: true
  },
  {
    id: "pm2",
    type: "credit_card",
    last4: "1234",
    brand: "Mastercard",
    expMonth: 8,
    expYear: 2025,
    isDefault: false
  }
]

const UserDashboard = () => {
  const { user } = useContext(AuthContext)
  const currentUserId = user?.id
  const [activeTab, setActiveTab] = useState('bookings')
  const [userProfile, setUserProfile] = useState(null)
  const [loadingUser, setLoadingUser] = useState(true)
  const [errorUser, setErrorUser] = useState(null)

  // Only fetch user profile from backend
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
          setUserProfile(data.user)
        } else {
          setErrorUser('Failed to fetch profile')
        }
      })
      .catch(() => setErrorUser('Failed to fetch profile'))
      .finally(() => setLoadingUser(false))
  }, [currentUserId])

  // Function to render rating stars
  const renderRating = (rating) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`star-${i}`} size={16} className="text-yellow-400 fill-yellow-400" />
        ))}
        {hasHalfStar && <StarHalf size={16} className="text-yellow-400 fill-yellow-400" />}
        <span className="ml-1 text-sm text-gray-600">{rating}</span>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="container px-4 py-8 mx-auto">
        <h1 className="mb-6 text-3xl font-bold text-gray-800">My Dashboard</h1>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Sidebar - Updated to use real user profile data */}
          <div className="lg:col-span-1">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <div className="flex flex-col items-center mb-6">
                {loadingUser ? (
                  <div className="w-20 h-20 mb-4 bg-gray-200 rounded-full animate-pulse" />
                ) : userProfile ? (
                  <>
                    <img
                      src={'https://i.postimg.cc/3x5NCw9r/image.png'}
                      alt={userProfile.name}
                      className="object-cover w-20 h-20 mb-4 rounded-full"
                    />
                    <h3 className="text-xl font-bold text-gray-800">{userProfile.name}</h3>
                    <p className="text-gray-600">{userProfile.email}</p>
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      <Clock size={14} className="mr-1" />
                      Member since {new Date(userProfile.createdAt).toLocaleDateString()}
                    </div>
                  </>
                ) : (
                  <p className="text-red-500">{errorUser || 'Failed to load user info'}</p>
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
                <a
                  href="/"
                  className="flex items-center w-full px-3 py-2 text-red-600 rounded-md hover:bg-red-50"
                >
                  <LogOut size={18} className="mr-3" />
                  Logout
                </a>
              </nav>
            </div>
          </div>

          {/* Main Content - Using demo data for other sections */}
          <div className="lg:col-span-3">
            {/* Bookings Tab - Using demo data */}
            {activeTab === 'bookings' && (
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <h2 className="mb-4 text-xl font-bold text-gray-800">My Bookings</h2>
                {DEMO_BOOKINGS.length > 0 ? (
                  <div className="space-y-6">
                    {DEMO_BOOKINGS.map((booking) => (
                      <div
                        key={booking._id}
                        className="p-4 transition-colors border border-gray-200 rounded-lg hover:border-blue-300"
                      >
                        <div className="flex flex-col gap-4 md:flex-row">
                          {/* Car Image */}
                          <div className="md:w-1/4">
                            <div className="h-24 overflow-hidden rounded-md md:h-32">
                              <img
                                src={booking.car_image}
                                alt={booking.car_name}
                                className="object-cover w-full h-full"
                              />
                            </div>
                          </div>
                          {/* Booking Details */}
                          <div className="md:w-2/4">
                            <h3 className="font-bold text-gray-800">{booking.car_name}</h3>
                            <div className="mt-2 space-y-1 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Calendar size={16} className="mr-2" />
                                <span>
                                  {new Date(booking.start_date).toLocaleDateString()} -{' '}
                                  {new Date(booking.end_date).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <MapPin size={16} className="mr-2" />
                                <span>{booking.location}</span>
                              </div>
                              <div>
                                <strong>Booking ID:</strong> {booking._id}
                              </div>
                              {booking.rating && (
                                <div className="flex items-center mt-1">
                                  {renderRating(booking.rating)}
                                </div>
                              )}
                            </div>
                            <div
                              className={`mt-2 inline-block px-2 py-1 text-xs font-medium rounded-full ${
                                booking.status === 'Upcoming'
                                  ? 'bg-blue-100 text-blue-800'
                                  : booking.status === 'Active'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-800'
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
                              <a
                                href={`/car/${booking.car_id}`}
                                className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                              >
                                View Details
                                <ExternalLink size={14} className="ml-1" />
                              </a>
                              {booking.status === 'Upcoming' && (
                                <button className="block mt-2 text-sm font-medium text-red-600 hover:text-red-800">
                                  Cancel Booking
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-gray-500">You don't have any bookings yet.</p>
                    <a
                      href="/cars"
                      className="inline-block mt-4 font-medium text-blue-600 hover:text-blue-800"
                    >
                      Browse Cars
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Favorites Tab - Using demo data */}
            {activeTab === 'favorites' && (
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <h2 className="mb-4 text-xl font-bold text-gray-800">Favorite Cars</h2>
                {DEMO_FAVORITES.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {DEMO_FAVORITES.map((car) => (
                      <div
                        key={car.id}
                        className="overflow-hidden transition-colors border border-gray-200 rounded-lg hover:border-blue-300"
                      >
                        <div className="h-40 overflow-hidden">
                          <img
                            src={car.image}
                            alt={car.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-gray-800">{car.name}</h3>
                          <div className="flex items-center mt-1">
                            {renderRating(car.rating)}
                          </div>
                          <div className="flex items-center mt-2 space-x-2 text-sm text-gray-600">
                            <MapPin size={14} />
                            <span>{car.location}</span>
                          </div>
                          <div className="flex items-center justify-between mt-4">
                            <div>
                              <span className="text-lg font-bold text-gray-800">${car.price_per_day}</span>
                              <span className="text-sm text-gray-500">/day</span>
                            </div>
                            <a
                              href={`/car/${car.id}`}
                              className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                            >
                              Book Now
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-gray-500">You don't have any favorite cars yet.</p>
                    <a
                      href="/cars"
                      className="inline-block mt-4 font-medium text-blue-600 hover:text-blue-800"
                    >
                      Browse Cars
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Payment Methods Tab - Using demo data */}
            {activeTab === 'payment' && (
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <h2 className="mb-4 text-xl font-bold text-gray-800">Payment Methods</h2>
                {DEMO_PAYMENT_METHODS.length > 0 ? (
                  <div className="space-y-4">
                    {DEMO_PAYMENT_METHODS.map((method) => (
                      <div
                        key={method.id}
                        className={`p-4 border rounded-lg flex justify-between items-center ${
                          method.isDefault ? 'border-blue-300 bg-blue-50' : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className="flex items-center justify-center w-12 h-8 mr-3 bg-white border border-gray-200 rounded">
                            {method.brand === 'Visa' && <span className="text-lg font-bold text-blue-600">VISA</span>}
                            {method.brand === 'Mastercard' && <span className="text-lg font-bold text-red-600">MC</span>}
                          </div>
                          <div>
                            <p className="font-medium">
                              {method.brand} •••• {method.last4}
                              {method.isDefault && <span className="ml-2 text-xs text-blue-600">Default</span>}
                            </p>
                            <p className="text-sm text-gray-500">Expires {method.expMonth}/{method.expYear}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="text-sm text-gray-600 hover:text-gray-800">Edit</button>
                          {!method.isDefault && (
                            <>
                              <button className="text-sm text-blue-600 hover:text-blue-800">Set as Default</button>
                              <button className="text-sm text-red-600 hover:text-red-800">Remove</button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                    <div className="mt-6">
                      <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                        Add Payment Method
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-gray-500">You don't have any payment methods yet.</p>
                    <button className="px-4 py-2 mt-4 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                      Add Payment Method
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Settings Tab - Using real user profile data */}
            {activeTab === 'settings' && (
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <h2 className="mb-6 text-xl font-bold text-gray-800">Account Settings</h2>
                {loadingUser ? (
                  <div className="space-y-6">
                    <div className="animate-pulse">
                      <div className="w-1/4 h-6 mb-2 bg-gray-200 rounded"></div>
                      <div className="h-10 bg-gray-200 rounded"></div>
                    </div>
                    <div className="animate-pulse">
                      <div className="w-1/4 h-6 mb-2 bg-gray-200 rounded"></div>
                      <div className="h-10 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ) : errorUser ? (
                  <div className="py-8 text-center text-red-500">
                    {errorUser}
                  </div>
                ) : (
                  <form className="space-y-6">
                    {/* Personal Information */}
                    <div>
                      <h3 className="mb-4 text-lg font-medium text-gray-800">Personal Information</h3>
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                          <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            defaultValue={userProfile?.name || ''}
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            defaultValue={userProfile?.email || ''}
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block mb-1 text-sm font-medium text-gray-700">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            defaultValue={userProfile?.phone || ''}
                          />
                        </div>
                        <div>
                          <label htmlFor="address" className="block mb-1 text-sm font-medium text-gray-700">
                            Home Address
                          </label>
                          <input
                            type="text"
                            id="address"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            defaultValue={userProfile?.address || ''}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Password Reset */}
                    <div>
                      <h3 className="mb-4 text-lg font-medium text-gray-800">Password</h3>
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                          <label htmlFor="current-password" className="block mb-1 text-sm font-medium text-gray-700">
                            Current Password
                          </label>
                          <input
                            type="password"
                            id="current-password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div></div>
                        <div>
                          <label htmlFor="new-password" className="block mb-1 text-sm font-medium text-gray-700">
                            New Password
                          </label>
                          <input
                            type="password"
                            id="new-password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="confirm-password" className="block mb-1 text-sm font-medium text-gray-700">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            id="confirm-password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Notification Preferences */}
                    <div>
                      <h3 className="mb-4 text-lg font-medium text-gray-800">Notification Preferences</h3>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="email-notifications"
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            defaultChecked={userProfile?.notifications?.email || false}
                          />
                          <label htmlFor="email-notifications" className="block ml-2 text-sm text-gray-700">
                            Email Notifications
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="sms-notifications"
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            defaultChecked={userProfile?.notifications?.sms || false}
                          />
                          <label htmlFor="sms-notifications" className="block ml-2 text-sm text-gray-700">
                            SMS Notifications
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="marketing-emails"
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            defaultChecked={userProfile?.notifications?.marketing || false}
                          />
                          <label htmlFor="marketing-emails" className="block ml-2 text-sm text-gray-700">
                            Marketing Emails
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard