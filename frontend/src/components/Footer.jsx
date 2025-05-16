import React from 'react'
import { Link } from 'react-router-dom'
import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  CarIcon,
  PhoneIcon,
  MailIcon,
  MapPinIcon,
} from 'lucide-react'
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <CarIcon size={24} className="text-blue-400" />
              <span className="text-xl font-bold">DrivEase</span>
            </div>
            <p className="text-gray-400 mb-4">
              Providing premium car rental services with a wide range of
              vehicles to meet all your driving needs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <FacebookIcon size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <TwitterIcon size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <InstagramIcon size={20} />
              </a>
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-blue-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/cars" className="text-gray-400 hover:text-blue-400">
                  Browse Cars
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-blue-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-blue-400">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-blue-400">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          {/* Car Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Car Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/cars" className="text-gray-400 hover:text-blue-400">
                  SUVs
                </Link>
              </li>
              <li>
                <Link to="/cars" className="text-gray-400 hover:text-blue-400">
                  Sedans
                </Link>
              </li>
              <li>
                <Link to="/cars" className="text-gray-400 hover:text-blue-400">
                  Luxury
                </Link>
              </li>
              <li>
                <Link to="/cars" className="text-gray-400 hover:text-blue-400">
                  Sports Cars
                </Link>
              </li>
              <li>
                <Link to="/cars" className="text-gray-400 hover:text-blue-400">
                  Electric Vehicles
                </Link>
              </li>
            </ul>
          </div>
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPinIcon
                  size={20}
                  className="text-blue-400 mt-1 flex-shrink-0"
                />
                <span className="text-gray-400">
                  123 Rental Street, Car City, CC 12345
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <PhoneIcon size={20} className="text-blue-400 flex-shrink-0" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <MailIcon size={20} className="text-blue-400 flex-shrink-0" />
                <span className="text-gray-400">info@driveease.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} DrivEase. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
export default Footer
