// src/pages/PropertyPage.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { doc, getDoc, collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../config/firebase';
import { Box, Typography, Alert, Button } from '@mui/material';
import PropertyDetails from '../components/PropertyDetails';

const PropertyPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const docRef = doc(db, 'properties', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setProperty({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log('No such property!');
        }
      } catch (error) {
        console.error('Error fetching property:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleBookProperty = async () => {
    try {
      if (!currentUser) {
        navigate('/login', { state: { from: location.pathname } });
        return;
      }

      // Create booking document in Firestore
      await addDoc(collection(db, 'bookings'), {
        propertyId: id,
        userId: currentUser.uid,
        checkIn: new Date(), // You should get these from a form
        checkOut: new Date(), // You should get these from a form
        guests: 1, // Default value
        createdAt: new Date(),
        status: 'confirmed'
      });

      setBookingSuccess(true);
    } catch (error) {
      console.error('Error booking property:', error);
    }
  };

  if (loading) return <Typography>Loading property...</Typography>;
  if (!property) return <Typography>Property not found</Typography>;

  return (
    <Box>
      {bookingSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Property has been successfully booked!
        </Alert>
      )}
      
      <PropertyDetails 
        property={property} 
        onBookProperty={handleBookProperty}
      />
    </Box>
  );
};

export default PropertyPage;