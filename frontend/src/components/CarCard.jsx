import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Fuel, Gauge, Calendar } from 'lucide-react';

const CarCard = ({
  id,
  name,
  image,
  price,
  category,
  seats,
  transmission,
  fuelType,
  year,
  mileage,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg">
      <div className="relative pb-[60%]">
        <img
          src={image}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold uppercase px-2 py-1 rounded">
          {category}
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800">{name}</h3>
          <div className="text-right">
            <span className="block text-blue-600 font-bold">${price}</span>
            <span className="text-xs text-gray-500">per day</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Users size={16} className="mr-1 text-gray-400" />
            <span>{seats} Seats</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Fuel size={16} className="mr-1 text-gray-400" />
            <span>{fuelType}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar size={16} className="mr-1 text-gray-400" />
            <span>{year}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Gauge size={16} className="mr-1 text-gray-400" />
            <span>{mileage}</span>
          </div>
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <span className="text-sm text-gray-500">{transmission}</span>
          <Link
            to={`/car/${id}`}
            className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;