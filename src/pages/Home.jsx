import { Box, Container, Typography, CircularProgress, Alert } from '@mui/material';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import PropertyCard from '../components/PropertyCard';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

const exampleProperties = [
  {
    id: '1',
    title: 'Beachfront Villa',
    location: 'Malindi, Kenya',
    price: 120,
    bedrooms: 3,
    bathrooms: 2,
    rating: 4.8,
    reviewCount: 42,
    amenities: ['Pool', 'Beach Access', 'WiFi'],
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&fit=crop'
    ],
    description: 'Stunning beachfront villa with ocean views.'
  },
  {
    id: '2',
    title: 'City Apartment',
    location: 'Nairobi, Kenya',
    price: 75,
    bedrooms: 2,
    bathrooms: 1,
    rating: 4.5,
    reviewCount: 36,
    amenities: ['WiFi', 'Parking', 'Kitchen'],
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&fit=crop'
    ],
    description: 'Modern apartment in the city center.'
  },
  {
    id: '3',
    title: 'Mountain Cabin',
    location: 'Mount Kenya',
    price: 95,
    bedrooms: 2,
    bathrooms: 1,
    rating: 4.9,
    reviewCount: 28,
    amenities: ['Fireplace', 'Mountain View', 'WiFi'],
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&fit=crop'
    ],
    description: 'Cozy cabin with mountain views.'
  }
];

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const querySnapshot = await getDocs(collection(db, 'properties'));
        const propertiesData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            images: Array.isArray(data.images) ? data.images : 
                  data.image ? [data.image] : 
                  exampleProperties.find(p => p.id === doc.id)?.images || [exampleProperties[0].images[0]],
            ...data
          };
        });
        
        setProperties(propertiesData.length > 0 ? propertiesData : exampleProperties);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setError('');
        setProperties(exampleProperties);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Box sx={{ 
        bgcolor: 'primary.main', 
        py: 8,
        color: 'white',
        backgroundImage: 'linear-gradient(rgba(255, 90, 95, 0.9), rgba(255, 90, 95, 0.9))'
      }}>
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}>
            Find your perfect stay at The Baobab Haven
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}>
            Discover entire homes and private rooms perfect for any trip
          </Typography>
          <SearchBar />
        </Container>
      </Box>
      
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <FilterBar />
        
        {error && (
          <Alert severity="warning" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
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
            {properties.map((property) => (
              <Box key={property.id}>
                <PropertyCard 
                  property={{
                    ...property,
                    image: property.images[0],
                    allImages: property.images
                  }}
                  clickable={false}  // Ensure PropertyCard doesn't make it clickable
                />
              </Box>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Home;