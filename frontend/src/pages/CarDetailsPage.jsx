import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Calendar,
  Users,
  Fuel,
  Gauge,
  ArrowLeft,
  Check,
  Star,
  MapPin,
} from 'lucide-react';

// Mock data - would typically come from an API
const cars = [
  {
    id: '1',
    name: 'Tesla Model 3',
    image:
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80 ',
    price: 89,
    category: 'Electric',
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Electric',
    year: 2023,
    mileage: '0-60 in 5.8s',
    description:
      'Experience the future of driving with the Tesla Model 3. This all-electric sedan combines performance, safety, and technology in a sleek package. With its minimalist interior, large touchscreen display, and impressive range, the Model 3 offers a premium driving experience without the premium price tag.',
    features: [
      'Autopilot capabilities',
      '15-inch touchscreen',
      'Panoramic glass roof',
      'Dual motor all-wheel drive',
      'Zero emissions',
      'Over-the-air updates',
      'Supercharger network access',
      'Premium audio system',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80 ',
      'https://images.unsplash.com/photo-1554744512-d6c603f27c54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80 ',
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80 ',
    ],
    rating: 4.9,
    reviews: 124,
  },
  {
    id: '2',
    name: 'BMW X5',
    image:
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80 ',
    price: 120,
    category: 'SUV',
    seats: 7,
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    year: 2022,
    mileage: '25 mpg',
    description:
      "The BMW X5 redefines what it means to be a Sport Activity Vehicle. With its powerful engine, spacious interior, and advanced technology features, the X5 delivers a driving experience that's both luxurious and exhilarating. Whether you're navigating city streets or exploring off-road trails, the X5 offers the perfect blend of performance, comfort, and versatility.",
    features: [
      'xDrive all-wheel drive',
      'Panoramic sunroof',
      'Live Cockpit Professional',
      'Harman Kardon surround sound',
      'Gesture control',
      'Heated and ventilated seats',
      'Adaptive LED headlights',
      'Parking Assistant Plus',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80 ',
      'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80 ',
      'https://images.unsplash.com/photo-1556800572-1b8aeef2c54f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80 ',
    ],
    rating: 4.7,
    reviews: 98,
  },
];

const CarDetailsPage = () => {
  const { id } = useParams();
  const car = cars.find((car) => car.id === id);
  const [selectedImage, setSelectedImage] = useState(car?.gallery[0] || '');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');

  if (!car) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Car not found</h2>
        <p className="text-gray-600 mb-8">
          The car you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/cars"
          className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to all cars
        </Link>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Booking:', {
      carId: car.id,
      pickupDate,
      returnDate,
      pickupLocation,
    });
    alert('Booking submitted! In a real app, this would proceed to payment.');
  };

  return (
    <div className="bg-gray-50 w-full">
      <div className="container mx-auto px-4 py-8">
        <Link
          to="/cars"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to all cars
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Car Details and Gallery */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Main Image */}
              <div className="relative pb-[56.25%]">
                <img
                  src={selectedImage || car.image}
                  alt={car.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-blue-600 text-white text-sm font-bold uppercase px-3 py-1 rounded">
                  {car.category}
                </div>
              </div>
              {/* Gallery */}
              <div className="p-4 border-t border-gray-100">
                <h3 className="font-medium text-gray-700 mb-3">Gallery</h3>
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {car.gallery.map((image, index) => (
                    <div
                      key={index}
                      className={`flex-shrink-0 w-20 h-20 rounded overflow-hidden cursor-pointer border-2 ${
                        selectedImage === image ? 'border-blue-600' : 'border-transparent'
                      }`}
                      onClick={() => setSelectedImage(image)}
                    >
                      <img
                        src={image}
                        alt={`${car.name} - image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Car Details */}
            <div className="bg-white rounded-lg shadow-sm mt-6 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">{car.name}</h1>
                  <div className="flex items-center mt-1">
                    <div className="flex items-center text-yellow-500">
                      <Star size={18} fill="currentColor" />
                      <span className="ml-1 text-gray-800 font-medium">
                        {car.rating}
                      </span>
                    </div>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-gray-600">{car.reviews} reviews</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">${car.price}</div>
                  <span className="text-sm text-gray-500">per day</span>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center">
                  <Calendar size={20} className="text-gray-400 mr-2" />
                  <div>
                    <div className="text-sm text-gray-500">Year</div>
                    <div className="font-medium">{car.year}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users size={20} className="text-gray-400 mr-2" />
                  <div>
                    <div className="text-sm text-gray-500">Seats</div>
                    <div className="font-medium">{car.seats}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Fuel size={20} className="text-gray-400 mr-2" />
                  <div>
                    <div className="text-sm text-gray-500">Fuel</div>
                    <div className="font-medium">{car.fuelType}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Gauge size={20} className="text-gray-400 mr-2" />
                  <div>
                    <div className="text-sm text-gray-500">Mileage</div>
                    <div className="font-medium">{car.mileage}</div>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Description</h3>
                <p className="text-gray-600">{car.description}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {car.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Check size={18} className="text-green-500 mr-2" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Booking Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Book this car</h3>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pick-up Location
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin size={18} className="text-gray-400" />
                      </div>
                      <select
                        value={pickupLocation}
                        onChange={(e) => setPickupLocation(e.target.value)}
                        className="block w-full pl-10 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        required
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pick-up Date
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar size={18} className="text-gray-400" />
                      </div>
                      <input
                        type="date"
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        className="block w-full pl-10 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Return Date
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar size={18} className="text-gray-400" />
                      </div>
                      <input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="block w-full pl-10 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Daily rate</span>
                      <span className="font-medium">${car.price}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Service fee</span>
                      <span className="font-medium">
                        ${Math.round(car.price * 0.1)}
                      </span>
                    </div>
                    <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-gray-200">
                      <span>Total</span>
                      <span>${car.price + Math.round(car.price * 0.1)}</span>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-medium mt-2"
                  >
                    Book Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPage;