import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Shield, Clock, Award, Star } from 'lucide-react'
import HeroSection from '../components/HeroSection'
import CarCard from '../components/CarCard'
const featuredCars = [
  {
    id: 1,
    name: 'Tesla Model 3',
    image:
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    price: 89,
    category: 'Electric',
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Electric',
    year: 2023,
    mileage: '0-60 in 5.8s',
  },
  {
    id: 2,
    name: 'BMW X5',
    image:
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    price: 120,
    category: 'SUV',
    seats: 7,
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    year: 2022,
    mileage: '25 mpg',
  },
  {
    id: 3,
    name: 'Mercedes C-Class',
    image:
      'https://images.unsplash.com/photo-1616422285623-13ff0162193c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2031&q=80',
    price: 95,
    category: 'Sedan',
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    year: 2022,
    mileage: '28 mpg',
  },
]
const HomePage = () => {
  return (
    <div className="w-full">
      <HeroSection />
      {/* Featured Cars Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                Featured Cars
              </h2>
              <p className="text-gray-600 mt-2">
                Explore our top-rated vehicles
              </p>
            </div>
            <Link
              to="/cars"
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
            >
              View All Cars
              <ChevronRight size={20} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCars.map((car) => (
              <CarCard key={car.id} {...car} />
            ))}
          </div>
        </div>
      </section>
      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">
              Why Choose DrivEase
            </h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              We provide the best car rental experience with our premium
              services
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield size={28} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Secure Booking
              </h3>
              <p className="text-gray-600">
                Your personal information and payments are always secure with us
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock size={28} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                24/7 Support
              </h3>
              <p className="text-gray-600">
                Our customer support team is available 24/7 to assist you
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award size={28} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Quality Vehicles
              </h3>
              <p className="text-gray-600">
                All our cars are regularly serviced and maintained to high
                standards
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star size={28} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Best Price
              </h3>
              <p className="text-gray-600">
                We offer competitive rates and price match guarantee
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Hit the Road?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who choose DrivEase for their
            car rental needs.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/cars"
              className="px-6 py-3 bg-white text-blue-600 font-bold rounded-md hover:bg-gray-100 transition-colors"
            >
              Browse Cars
            </Link>
            <Link
              to="/signup"
              className="px-6 py-3 bg-blue-700 text-white font-bold rounded-md border border-blue-500 hover:bg-blue-800 transition-colors"
            >
              Sign Up Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
export default HomePage
