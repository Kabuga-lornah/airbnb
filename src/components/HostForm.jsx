import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Divider,
  InputAdornment,
  IconButton,
  FormHelperText,
  CircularProgress,
} from '@mui/material';
import {
  PhotoCamera,
  Home,
  AttachMoney,
  KingBed,
  Bathtub,
  Wifi,
  Room as RoomIcon,
} from '@mui/icons-material';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../config/firebase';
import Header from '../components/Header';

const HostForm = () => {
  const [property, setProperty] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    amenities: '',
    image: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const propertyData = {
        ...property,
        locationLowercase: property.location.toLowerCase(),
        price: Number(property.price),
        bedrooms: Number(property.bedrooms),
        bathrooms: Number(property.bathrooms),
        amenities: property.amenities.split(',').map((item) => item.trim()),
        createdAt: new Date(),
      };

      await addDoc(collection(db, 'properties'), propertyData);
      navigate('/host/success');
    } catch (err) {
      console.error('Error adding property:', err);
      setError('Failed to submit property. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
     
      <Box sx={{ maxWidth: 880, mx: 'auto', px: { xs: 2, md: 4 }, py: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" fontWeight="bold" color="primary.main" sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}>
            List Your Property
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Become a host and start earning with The Baobab Haven
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            {/* Input Fields */}
            {[
              {
                label: 'Property Title',
                name: 'title',
                icon: <Home color="primary" />,
                helper: 'Give your property a catchy name',
              },
              {
                label: 'Location (City, Country)',
                name: 'location',
                icon: <RoomIcon color="primary" />,
                helper: 'Where is your property located?',
              },
              {
                label: 'Nightly Price ($)',
                name: 'price',
                type: 'number',
                icon: <AttachMoney color="primary" />,
                helper: 'Price per night in USD',
              },
              {
                label: 'Bedrooms',
                name: 'bedrooms',
                type: 'number',
                icon: <KingBed color="primary" />,
              },
              {
                label: 'Bathrooms',
                name: 'bathrooms',
                type: 'number',
                icon: <Bathtub color="primary" />,
              },
              {
                label: 'Amenities',
                name: 'amenities',
                placeholder: 'WiFi, Pool, Kitchen, Parking, etc.',
                icon: <Wifi color="primary" />,
                helper: 'Separate amenities with commas',
              },
              {
                label: 'Image URL',
                name: 'image',
                placeholder: 'https://example.com/image.jpg',
                icon: (
                  <IconButton color="primary">
                    <PhotoCamera />
                  </IconButton>
                ),
                isEnd: true,
                helper: 'Paste a direct link to your property image',
              },
            ].map((field, index) => (
              <Grid key={index} item xs={12} md={field.name === 'location' || field.name === 'price' || field.name === 'bedrooms' || field.name === 'bathrooms' ? 6 : 12}>
                <TextField
                  fullWidth
                  required={field.name !== 'image' && field.name !== 'amenities'}
                  label={field.label}
                  name={field.name}
                  value={property[field.name]}
                  onChange={handleChange}
                  type={field.type || 'text'}
                  placeholder={field.placeholder || ''}
                  variant="outlined"
                  InputProps={{
                    [field.isEnd ? 'endAdornment' : 'startAdornment']: (
                      <InputAdornment position={field.isEnd ? 'end' : 'start'}>
                        {field.icon}
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
                {field.helper && <FormHelperText>{field.helper}</FormHelperText>}
              </Grid>
            ))}

            {/* Description Field */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={property.description}
                onChange={handleChange}
                multiline
                rows={5}
                required
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
              <FormHelperText>Describe what makes your place special</FormHelperText>
            </Grid>

            {/* Error Message */}
            {error && (
              <Grid item xs={12}>
                <Typography color="error" sx={{ bgcolor: '#ffecec', p: 2, borderRadius: 2 }}>
                  ⚠️ {error}
                </Typography>
              </Grid>
            )}

            {/* Submit Button */}
            <Grid item xs={12}>
              <Divider sx={{ my: 3 }} />
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                fullWidth
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  py: 2,
                  borderRadius: 2,
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  textTransform: 'none',
                  boxShadow: 2,
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                  '&:disabled': {
                    bgcolor: 'primary.light',
                  },
                }}
              >
                {loading ? (
                  <>
                    <CircularProgress size={24} sx={{ color: 'white', mr: 2 }} />
                    Submitting...
                  </>
                ) : (
                  'List My Property'
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default HostForm;