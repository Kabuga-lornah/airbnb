import React from 'react';
import PropertyCard from './PropertyCard';

function PropertyList({ properties, onView, onEdit, onDelete }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Available Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.length === 0 ? (
          <p>No properties found. Add a new property to get started!</p>
        ) : (
          properties.map(property => (
            <PropertyCard 
              key={property.id} 
              property={property} 
              onView={onView} 
              onEdit={onEdit} 
              onDelete={onDelete} 
            />
          ))
        )}
      </div>
    </div>
  );
}

export default PropertyList;
