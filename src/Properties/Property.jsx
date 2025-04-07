import React from 'react';

function Property({ property, onEdit, onDelete, onBack }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <button 
        onClick={onBack}
        className="mb-4 flex items-center text-gray-600 hover:text-gray-900"
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to listings
      </button>
      
      <div className="mb-6">
        <img 
          src={property.images[0]} 
          alt={property.title} 
          className="w-full h-64 object-cover rounded-lg"
        />
      </div>
      
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-3xl font-bold">{property.title}</h1>
        <div className="flex items-center">
          <svg className="w-5 h-5 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <span className="text-lg">{property.rating}</span>
        </div>
      </div>
      
      <p className="text-xl text-gray-600 mb-2">{property.location}</p>
      <p className="text-2xl font-semibold mb-4">${property.price} <span className="text-lg font-normal text-gray-500">night</span></p>
      
      <div className="flex space-x-4 mb-6">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>{property.bedrooms} {property.bedrooms === 1 ? 'bedroom' : 'bedrooms'}</span>
        </div>
        <div className="flex items-center">
          <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{property.bathrooms} {property.bathrooms === 1 ? 'bathroom' : 'bathrooms'}</span>
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p className="text-gray-700">{property.description}</p>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Amenities</h2>
        <div className="grid grid-cols-2 gap-2">
          {property.amenities.map((amenity, index) => (
            <div key={index} className="flex items-center">
              <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>{amenity}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Hosted by</h2>
        <p>{property.host}</p>
      </div>
      
      <div className="flex space-x-4">
        <button 
          onClick={onEdit}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Edit Property
        </button>
        <button 
          onClick={onDelete}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Delete Property
        </button>
      </div>
    </div>
  );
}

export default Property;