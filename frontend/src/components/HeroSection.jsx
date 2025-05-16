import React, { useState } from 'react';
import { Calendar, MapPin, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // In a real app, we would use these values for filtering
    navigate('/cars');
  };

  return (
    <div className="relative bg-gradient-to-r from-blue-800 to-blue-600 text-white">
      {/* Background overlay with car image */}
      <div className="absolute inset-0 z-0 opacity-20">
        <img
          src="https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80 "
          alt="Background car"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Drive</h1>
          <p className="text-xl text-blue-100">
            Rent the car of your dreams with just a few clicks.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
              <div className="p-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Pick-up Location
                </label>
                <div className="flex items-center">
                  <MapPin size={20} className="text-blue-500 mr-2" />
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full border-none focus:ring-0 text-gray-800"
                  >
                    <option value="">Select location</option>
                    <option value="new-york">New York</option>
                    <option value="los-angeles">Los Angeles</option>
                    <option value="chicago">Chicago</option>
                    <option value="miami">Miami</option>
                    <option value="las-vegas">Las Vegas</option>
                  </select>
                </div>
              </div>
              <div className="p-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Pick-up Date
                </label>
                <div className="flex items-center">
                  <Calendar size={20} className="text-blue-500 mr-2" />
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full border-none focus:ring-0 text-gray-800"
                  />
                </div>
              </div>
              <div className="p-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Return Date
                </label>
                <div className="flex items-center">
                  <Calendar size={20} className="text-blue-500 mr-2" />
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full border-none focus:ring-0 text-gray-800"
                  />
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 text-right">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors inline-flex items-center"
              >
                <Search size={18} className="mr-2" />
                Search Cars
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;