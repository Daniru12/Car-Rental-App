import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  },{
    id: '3',
    name: 'Audi Q7',
    image:
       'https://images.unsplash.com/photo-1616422285623-13ff0162193c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2031&q=80 ',
    price: 135,
    category: 'SUV',
    seats: 7,
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    year: 2022,
    mileage: '22 mpg',
    description: 'Description for Audi Q7 goes here.',
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
    gallery: [ 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2031&q=80 ',
],
    rating: 4.5,
    reviews: 80,
  },
  {
    id: '4',
    name: 'Toyota Camry',
    image:
      'https://i.postimg.cc/NjSbp7B4/image.png',
    price: 65,
    category: 'Sedan',
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    year: 2023,
    mileage: '32 mpg',
    description: 'Description for Toyota Camry goes here.',
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
    gallery: ['https://i.postimg.cc/NjSbp7B4/image.png'],
    rating: 4.3,
    reviews: 50,
  },
  {
    id: '5',
    name: 'Porsche 911',
    image:
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80 ',
    price: 250,
    category: 'Sports',
    seats: 2,
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    year: 2022,
    mileage: '20 mpg',
    description: 'Description for Porsche 911 goes here.',
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
    gallery: ['https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80 ',
],
    rating: 4.8,
    reviews: 120,
  },
  {
    id: '6',
    name: 'Range Rover Sport',
    image:
     'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80 ',
    price: 180,
    category: 'SUV',
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    year: 2023,
    mileage: '18 mpg',
    description: 'Description for Range Rover Sport goes here.',
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
    gallery: ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80 ',
],
    rating: 4.6,
    reviews: 95,
  },
  {
    id: '7',
    name: 'Chevrolet Corvette',
    image:
      'https://images.unsplash.com/photo-1566473965997-3de9c817e938?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80 ',
    price: 195,
    category: 'Sports',
    seats: 2,
    transmission: 'Manual',
    fuelType: 'Gasoline',
    year: 2022,
    mileage: '19 mpg',
    description: 'Description for Chevrolet Corvette goes here.',
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
    gallery: ['https://images.unsplash.com/photo-1566473965997-3de9c817e938?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80 ',
],
    rating: 4.7,
    reviews: 110,
  },
  {
    id: '8',
    name: 'Ford Mustang',
    image:
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80 ',

    price: 85,
    category: 'Sports',
    seats: 4,
    transmission: 'Manual',
    fuelType: 'Gasoline',
    year: 2022,
    mileage: '21 mpg',
    description: 'Description for Ford Mustang goes here.',
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
    gallery: ['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80 ',
],
    rating: 4.4,
    reviews: 75,
  },{
    id: '9',
    name: 'Ford Mustang',
    image:
      'https://i.postimg.cc/sD1Nm253/image.png',
    price: 85,
    category: 'Sports',
    seats: 4,
    transmission: 'Manual',
    fuelType: 'Gasoline',
    year: 2022,
    mileage: '21 mpg',
    description: 'Description for Ford Mustang goes here.',
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
    gallery: ['https://i.postimg.cc/sD1Nm253/image.png'],
    rating: 4.4,
    reviews: 75,
  },
];

const CarDetailsPage = () => {
  const { id } = useParams();
  const car = cars.find((car) => car.id === id);
  const [selectedImage, setSelectedImage] = useState(car?.gallery[0] || '');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const navigate = useNavigate();
  
  if (!car) {
    return (
      <div className="container px-4 py-16 mx-auto text-center">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">Car not found</h2>
        <p className="mb-8 text-gray-600">
          The car you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/cars"
          className="flex items-center justify-center font-medium text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to all cars
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = 1; // Replace with real user ID later
    const bookingData = {
      user_id: userId,
      car_id: car.id,
      car_name: car.name,
      car_image: car.image,
      start_date: pickupDate,
      end_date: returnDate,
      location: pickupLocation,
      status: "Upcoming",
      price: car.price + Math.round(car.price * 0.1),
    };

    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to book");
      }

      // Show success toast
      toast.success(`✅ Booking for ${car.name} confirmed!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Redirect after toast has shown
      setTimeout(() => {
        navigate('/cars');
      }, 3500); // wait longer than autoClose

    } catch (error) {
      console.error("Booking error:", error);
      toast.error(`❌ ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="w-full bg-gray-50">
      <ToastContainer />
      <div className="container px-4 py-8 mx-auto">
        <Link
          to="/cars"
          className="inline-flex items-center mb-6 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to all cars
        </Link>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Car Details and Gallery */}
          <div className="lg:col-span-2">
            <div className="overflow-hidden bg-white rounded-lg shadow-sm">
              {/* Main Image */}
              <div className="relative pb-[56.25%]">
                <img
                  src={selectedImage || car.image}
                  alt={car.name}
                  className="absolute inset-0 object-cover w-full h-full"
                />
                <div className="absolute px-3 py-1 text-sm font-bold text-white uppercase bg-blue-600 rounded top-4 left-4">
                  {car.category}
                </div>
              </div>
              {/* Gallery */}
              <div className="p-4 border-t border-gray-100">
                <h3 className="mb-3 font-medium text-gray-700">Gallery</h3>
                <div className="flex pb-2 space-x-2 overflow-x-auto">
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
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Car Details */}
            <div className="p-6 mt-6 bg-white rounded-lg shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">{car.name}</h1>
                  <div className="flex items-center mt-1">
                    <div className="flex items-center text-yellow-500">
                      <Star size={18} fill="currentColor" />
                      <span className="ml-1 font-medium text-gray-800">
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
              <div className="grid grid-cols-2 gap-4 mb-6 md:grid-cols-4">
                <div className="flex items-center">
                  <Calendar size={20} className="mr-2 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-500">Year</div>
                    <div className="font-medium">{car.year}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users size={20} className="mr-2 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-500">Seats</div>
                    <div className="font-medium">{car.seats}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Fuel size={20} className="mr-2 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-500">Fuel</div>
                    <div className="font-medium">{car.fuelType}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Gauge size={20} className="mr-2 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-500">Mileage</div>
                    <div className="font-medium">{car.mileage}</div>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <h3 className="mb-2 text-lg font-bold text-gray-800">Description</h3>
                <p className="text-gray-600">{car.description}</p>
              </div>
              <div>
                <h3 className="mb-3 text-lg font-bold text-gray-800">Features</h3>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                  {car.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Check size={18} className="mr-2 text-green-500" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Booking Form */}
          <div className="lg:col-span-1">
            <div className="sticky p-6 bg-white rounded-lg shadow-sm top-24">
              <h3 className="mb-4 text-lg font-bold text-gray-800">Book this car</h3>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Pick-up Location
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
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
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Pick-up Date
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
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
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Return Date
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
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
                    <div className="flex justify-between pt-4 mt-4 text-lg font-bold border-t border-gray-200">
                      <span>Total</span>
                      <span>${car.price + Math.round(car.price * 0.1)}</span>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 mt-2 font-medium text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700"
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