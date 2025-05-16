import React, { useState } from 'react';
import { Filter, ChevronDown, ChevronUp, Search } from 'lucide-react';
import CarCard from '../components/CarCard';

// Sample car data
const cars = [
  {
    id: 1,
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
  },
  {
    id: 2,
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
  },
  {
    id: 3,
    name: 'Mercedes C-Class',
    image:
      'https://images.unsplash.com/photo-1616422285623-13ff0162193c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2031&q=80 ',
    price: 95,
    category: 'Sedan',
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    year: 2022,
    mileage: '28 mpg',
  },
  {
    id: 4,
    name: 'Audi Q7',
    image:
      'https://images.unsplash.com/photo-1606664913224-9f39e9716dcc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80 ',
    price: 135,
    category: 'SUV',
    seats: 7,
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    year: 2022,
    mileage: '22 mpg',
  },
  {
    id: 5,
    name: 'Toyota Camry',
    image:
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80 ',
    price: 65,
    category: 'Sedan',
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    year: 2023,
    mileage: '32 mpg',
  },
  {
    id: 6,
    name: 'Porsche 911',
    image:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80 ',
    price: 250,
    category: 'Sports',
    seats: 2,
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    year: 2022,
    mileage: '20 mpg',
  },
  {
    id: 7,
    name: 'Range Rover Sport',
    image:
      'https://images.unsplash.com/photo-1566473965997-3de9c817e938?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80 ',
    price: 180,
    category: 'SUV',
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    year: 2023,
    mileage: '18 mpg',
  },
  {
    id: 8,
    name: 'Chevrolet Corvette',
    image:
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80 ',
    price: 195,
    category: 'Sports',
    seats: 2,
    transmission: 'Manual',
    fuelType: 'Gasoline',
    year: 2022,
    mileage: '19 mpg',
  },
  {
    id: 9,
    name: 'Ford Mustang',
    image:
      'https://images.unsplash.com/photo-1584345604476-8ec5f452d1f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80 ',
    price: 85,
    category: 'Sports',
    seats: 4,
    transmission: 'Manual',
    fuelType: 'Gasoline',
    year: 2022,
    mileage: '21 mpg',
  },
];

const CarsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState([]);
  const [selectedTransmissions, setSelectedTransmissions] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Get unique categories, fuel types, and transmissions for filter options
  const categories = [...new Set(cars.map((car) => car.category))];
  const fuelTypes = [...new Set(cars.map((car) => car.fuelType))];
  const transmissions = [...new Set(cars.map((car) => car.transmission))];

  // Filter the cars based on all selected filters
  const filteredCars = cars.filter((car) => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = car.price >= priceRange[0] && car.price <= priceRange[1];
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(car.category);
    const matchesFuelType =
      selectedFuelTypes.length === 0 || selectedFuelTypes.includes(car.fuelType);
    const matchesTransmission =
      selectedTransmissions.length === 0 || selectedTransmissions.includes(car.transmission);

    return matchesSearch && matchesPrice && matchesCategory && matchesFuelType && matchesTransmission;
  });

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleFuelTypeChange = (fuelType) => {
    setSelectedFuelTypes((prev) =>
      prev.includes(fuelType) ? prev.filter((f) => f !== fuelType) : [...prev, fuelType]
    );
  };

  const handleTransmissionChange = (transmission) => {
    setSelectedTransmissions((prev) =>
      prev.includes(transmission) ? prev.filter((t) => t !== transmission) : [...prev, transmission]
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen w-full">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Available Cars</h1>
          <p className="text-gray-600">Find your perfect rental from our diverse fleet</p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={20} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search cars..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors md:w-auto w-full"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={18} />
              <span>Filters</span>
              {showFilters ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>

          {/* Expandable Filter Options */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Price Range Filter */}
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Price Range</h3>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-500">${priceRange[0]}</span>
                    <input
                      type="range"
                      min="0"
                      max="300"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                    <span className="text-gray-500">${priceRange[1]}</span>
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Category</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <label key={category} className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => handleCategoryChange(category)}
                          className="rounded text-blue-600 focus:ring-blue-500 mr-1.5"
                        />
                        <span className="text-gray-700">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Fuel Type Filter */}
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Fuel Type</h3>
                  <div className="flex flex-wrap gap-2">
                    {fuelTypes.map((fuelType) => (
                      <label key={fuelType} className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedFuelTypes.includes(fuelType)}
                          onChange={() => handleFuelTypeChange(fuelType)}
                          className="rounded text-blue-600 focus:ring-blue-500 mr-1.5"
                        />
                        <span className="text-gray-700">{fuelType}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Transmission Filter */}
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Transmission</h3>
                  <div className="flex flex-wrap gap-2">
                    {transmissions.map((transmission) => (
                      <label key={transmission} className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedTransmissions.includes(transmission)}
                          onChange={() => handleTransmissionChange(transmission)}
                          className="rounded text-blue-600 focus:ring-blue-500 mr-1.5"
                        />
                        <span className="text-gray-700">{transmission}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredCars.length} {filteredCars.length === 1 ? 'car' : 'cars'}
          </p>
        </div>

        {/* Car Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.length > 0 ? (
            filteredCars.map((car) => <CarCard key={car.id} {...car} />)
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No cars match your current filters.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setPriceRange([0, 300]);
                  setSelectedCategories([]);
                  setSelectedFuelTypes([]);
                  setSelectedTransmissions([]);
                }}
                className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarsPage;