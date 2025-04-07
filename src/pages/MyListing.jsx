// src/pages/MyListings.jsx
import { Box, Container, Typography, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../context/AuthContext';
import PropertyCard from '../components/PropertyCard';

const MyListings = () => {
  const { currentUser } = useAuth();
  const [savedProperties, setSavedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedProperties = async () => {
      if (!currentUser) return;

      try {
        setLoading(true);
        const q = query(
          collection(db, 'users', currentUser.uid, 'savedProperties')
        );
        const querySnapshot = await getDocs(q);
        const properties = querySnapshot.docs.map(doc => doc.data());
        setSavedProperties(properties);
      } catch (error) {
        console.error('Error fetching saved properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedProperties();
  }, [currentUser]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        My Saved Listings
      </Typography>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress color="primary" size={80} thickness={4} />
        </Box>
      ) : (
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { 
            xs: '1fr', 
            sm: '1fr 1fr', 
            md: '1fr 1fr 1fr'
          }, 
          gap: 4
        }}>
          {savedProperties.map((property) => (
            <PropertyCard 
              key={property.id} 
              property={property}
            />
          ))}
        </Box>
      )}
    </Container>
  );
};

export default MyListings;