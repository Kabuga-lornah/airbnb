// src/pages/SearchResults.jsx
import { Box, Container, Typography } from '@mui/material';
import Header from '../components/Header';
import FilterBar from '../components/FilterBar';
import PropertyCard from '../components/PropertyCard';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';

const SearchResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const locationQuery = searchParams.get('location');
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        let q;
        if (locationQuery) {
          q = query(collection(db, 'properties'), where('location', '>=', locationQuery), where('location', '<=', locationQuery + '\uf8ff'));
        } else {
          q = collection(db, 'properties');
        }
        
        const querySnapshot = await getDocs(q);
        const propertiesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProperties(propertiesData);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [locationQuery]);

  return (
    <Box>
      <Header />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {locationQuery ? `Stays in ${locationQuery}` : 'All stays'}
        </Typography>
        <FilterBar />
        
        {loading ? (
          <Typography>Loading properties...</Typography>
        ) : (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default SearchResults;