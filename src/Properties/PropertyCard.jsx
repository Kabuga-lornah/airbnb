import React from 'react';

function PropertyCard({ property, onView, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={property.images && property.images.length > 0 ? property.images[0] : 'https://via.placeholder.com/300'} 
        alt={property.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-semibold">{property.title}</h2>
          <div className="flex items-center">
            <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <span>{property.rating}</span>
          </div>
        </div>
        <p className="text-gray-500 mt-1">{property.location}</p>
        <p className="text-gray-700 mt-2 truncate">{property.description}</p>
        <p className="font-bold mt-2">${property.price} <span className="font-normal text-gray-500">night</span></p>
        <div className="flex space-x-2 text-sm mt-4">
          <span className="px-2 py-1 bg-gray-100 rounded">{property.bedrooms} {property.bedrooms === 1 ? 'bedroom' : 'bedrooms'}</span>
          <span className="px-2 py-1 bg-gray-100 rounded">{property.bathrooms} {property.bathrooms === 1 ? 'bathroom' : 'bathrooms'}</span>
        </div>
        <div className="flex mt-4 space-x-2">
          <button 
            onClick={() => onView(property.id)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 flex-1"
          >
            View
          </button>
          <button 
            onClick={() => onEdit(property.id)}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Edit
          </button>
          <button 
            onClick={() => onDelete(property.id)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;