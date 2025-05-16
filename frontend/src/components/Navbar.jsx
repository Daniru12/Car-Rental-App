import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MenuIcon, XIcon, UserIcon, CarIcon, LogOutIcon } from 'lucide-react';
import { AuthContext } from '../AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout actions here (clear tokens, session, etc.)
    setIsLoggedIn(false)
    navigate('/') // Redirect to home page after logout
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <CarIcon size={28} className="text-blue-600" />
            <span className="text-xl font-bold text-gray-800">DrivEase</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium">
              Home
            </Link>
            <Link to="/cars" className="text-gray-600 hover:text-blue-600 font-medium">
              Cars
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-blue-600 font-medium">
              About
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-blue-600 font-medium">
              Contact
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                >
                  <UserIcon size={20} />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-700 hover:text-red-600 focus:outline-none"
                >
                  <LogOutIcon size={20} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-600 hover:text-blue-600 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-3">
            <Link to="/" className="text-gray-600 hover:text-blue-600 py-2">
              Home
            </Link>
            <Link to="/cars" className="text-gray-600 hover:text-blue-600 py-2">
              Cars
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-blue-600 py-2">
              About
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-blue-600 py-2">
              Contact
            </Link>
            <div className="border-t border-gray-100 pt-3 mt-3">
              {isLoggedIn ? (
                <>
                  <Link
                    to="/dashboard"
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 py-2"
                  >
                    <UserIcon size={20} />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={() => {
                      setIsLoggedIn(false)
                      setIsOpen(false)
                      navigate('/')
                    }}
                    className="flex items-center space-x-2 text-gray-700 hover:text-red-600 py-2 w-full focus:outline-none"
                  >
                    <LogOutIcon size={20} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-3">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-center text-gray-600 hover:text-blue-600 font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
