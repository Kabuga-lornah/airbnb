// App.js - Main Application Component
import React, { useState, useEffect } from 'react';
import PropertyList from './Properties/PropertyList';
import PropertyForm from './Properties/PropertyForm';
import Property from './Properties/Property';
// import PropertyCard from './Properties/PropertyCard';
import { db } from './firebase/firebaseConfig';

import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
  orderBy 
} from 'firebase/firestore';

function App() {
  const [properties, setProperties] = useState([]);
  const [currentProperty, setCurrentProperty] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [view, setView] = useState('list');
  const [loading, setLoading] = useState(true);
  
  
  const sampleProperties = [
    {
      id: 'sample-1',
      title: 'Modern Downtown Apartment',
      description: 'Stylish apartment in the heart of downtown with city views',
      price: 120,
      bedrooms: 2,
      bathrooms: 1,
      location: 'New York, NY',
      amenities: ['WiFi', 'Kitchen', 'Air Conditioning'],
      images: ['/api/placeholder/600/400'],
      host: 'John Doe',
      rating: 4.8
    },
    {
      id: 'sample-2',
      title: 'Cozy Beach House',
      description: 'Relax in this comfortable beach house just steps from the ocean',
      price: 200,
      bedrooms: 3,
      bathrooms: 2,
      location: 'Malibu, CA',
      amenities: ['WiFi', 'Kitchen', 'Pool', 'Beach Access'],
      images: ['/api/placeholder/600/400'],
      host: 'Jane Smith',
      rating: 4.9
    }
  ];

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const propertiesCollection = collection(db, 'properties');
        const propertiesQuery = query(propertiesCollection, orderBy('title'));
        const querySnapshot = await getDocs(propertiesQuery);
        
        const propertiesList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // If data exists in Firebase, use it; otherwise use sample data
        if (propertiesList.length > 0) {
          setProperties(propertiesList);
        } else {
          console.log("No properties found in database, using sample data");
          setProperties(sampleProperties);
        }
      } catch (error) {
        console.error("Error fetching properties: ", error);
        console.log("Firebase connection error, using sample data");
        setProperties(sampleProperties);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const addProperty = async (property) => {
    try {
      const propertiesCollection = collection(db, 'properties');
      const newProperty = {
        ...property,
        rating: 0,
        createdAt: new Date()
      };
      
      const docRef = await addDoc(propertiesCollection, newProperty);
      
      setProperties([...properties, { 
        ...newProperty, 
        id: docRef.id 
      }]);
      
      setView('list');
    } catch (error) {
      console.error("Error adding property: ", error);
      alert("Failed to add property. Please try again.");
    }
  };

  const updateProperty = async (updatedProperty) => {
    try {
      // Only attempt Firebase operations for non-sample data
      if (!updatedProperty.id.startsWith('sample-')) {
        const propertyRef = doc(db, 'properties', updatedProperty.id);
        
        const { id, ...propertyData } = updatedProperty;
        
        await updateDoc(propertyRef, {
          ...propertyData,
          updatedAt: new Date()
        });
      } else {
        console.log("Cannot update sample property in Firebase");
      }
      
      // Update UI regardless of Firebase operation
      setProperties(properties.map(property => 
        property.id === updatedProperty.id ? updatedProperty : property
      ));
      
      setCurrentProperty(updatedProperty);
      setView('detail');
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating property: ", error);
      alert("Failed to update property. Please try again.");
    }
  };

  const deleteProperty = async (id) => {
    try {
      // Only attempt Firebase operations for non-sample data
      if (!id.startsWith('sample-')) {
        const propertyRef = doc(db, 'properties', id);
        await deleteDoc(propertyRef);
      } else {
        console.log("Cannot delete sample property from Firebase");
      }
      
      // Update UI regardless of Firebase operation
      setProperties(properties.filter(property => property.id !== id));
      
      if (currentProperty && currentProperty.id === id) {
        setCurrentProperty(null);
        setView('list');
      }
    } catch (error) {
      console.error("Error deleting property: ", error);
      alert("Failed to delete property. Please try again.");
    }
  };

  const viewProperty = (id) => {
    const property = properties.find(p => p.id === id);
    setCurrentProperty(property);
    setView('detail');
  };

  const handleEdit = (id) => {
    const property = properties.find(p => p.id === id);
    setCurrentProperty(property);
    setIsEditing(true);
    setView('edit');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-rose-500">StayBnB</h1>
          <div className="flex space-x-4">
            <button 
              onClick={() => setView('list')}
              className="px-4 py-2 text-gray-700 hover:text-rose-500 rounded-md"
            >
              Browse Properties
            </button>
            <button 
              onClick={() => setView('add')}
              className="px-4 py-2 bg-rose-500 text-white rounded-md hover:bg-rose-600"
            >
              Add Property
            </button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl">Loading properties...</p>
          </div>
        ) : (
          <>
            {view === 'list' && (
              <PropertyList 
                properties={properties} 
                onView={viewProperty} 
                onEdit={handleEdit} 
                onDelete={deleteProperty} 
              />
            )}
            
            {view === 'detail' && currentProperty && (
              <Property
                property={currentProperty} 
                onEdit={() => handleEdit(currentProperty.id)} 
                onDelete={() => deleteProperty(currentProperty.id)}
                onBack={() => setView('list')}
              />
            )}
            
            {(view === 'add' || view === 'edit') && (
              <PropertyForm 
                property={isEditing ? currentProperty : null} 
                onSubmit={isEditing ? updateProperty : addProperty} 
                onCancel={() => isEditing ? setView('detail') : setView('list')}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;