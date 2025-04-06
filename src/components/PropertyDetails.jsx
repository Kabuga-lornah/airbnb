// src/components/PropertyDetails.jsx
import { Box, Typography, Divider, Grid, Rating, Avatar, Button } from '@mui/material';
import { LocationOn, KingBed, Bathtub, Wifi, AcUnit, Pool } from '@mui/icons-material';

const PropertyDetails = ({ property }) => {
  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        {property.title}
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Rating value={property.rating || 4} readOnly />
        <Typography variant="body2" color="text.secondary">
          {property.reviewCount || 24} reviews
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
          <LocationOn fontSize="small" /> {property.location}
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <Box sx={{ flex: 2 }}>
          <img 
            src={property.image || 'https://via.placeholder.com/800x500'} 
            alt={property.title} 
            style={{ width: '100%', borderRadius: 12 }} 
          />
        </Box>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {[1, 2, 3].map((i) => (
            <img 
              key={i}
              src={property[`image${i}`] || `https://via.placeholder.com/400x250?text=Image+${i}`} 
              alt={`${property.title} ${i}`} 
              style={{ width: '100%', borderRadius: 12 }} 
            />
          ))}
        </Box>
      </Box>
      
      <Divider sx={{ my: 4 }} />
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
            <Avatar src={property.hostAvatar} sx={{ width: 56, height: 56 }} />
            <Box>
              <Typography variant="h6">Hosted by {property.hostName || 'John Doe'}</Typography>
              <Typography variant="body2" color="text.secondary">
                Joined in {property.hostSince || '2020'}
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="body1" paragraph>
              {property.description || 'This is a beautiful property with amazing amenities. Perfect for families and groups looking for a comfortable stay.'}
            </Typography>
          </Box>
          
          <Divider sx={{ my: 4 }} />
          
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Amenities
          </Typography>
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {[
              { icon: <KingBed />, label: 'Bedroom' },
              { icon: <Bathtub />, label: 'Bathroom' },
              { icon: <Wifi />, label: 'WiFi' },
              { icon: <AcUnit />, label: 'Air conditioning' },
              { icon: <Pool />, label: 'Pool' },
            ].map((amenity, index) => (
              <Grid item xs={6} sm={4} key={index}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {amenity.icon}
                  <Typography>{amenity.label}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Box sx={{ border: '1px solid #ddd', borderRadius: 2, p: 3, position: 'sticky', top: 20 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">
                <span style={{ fontWeight: 'bold' }}>${property.price}</span> night
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Rating value={property.rating || 4} size="small" readOnly />
                <Typography variant="body2" ml={1}>
                  {property.reviewCount || 24}
                </Typography>
              </Box>
            </Box>
            

<Button 
  variant="contained" 
  fullWidth 
  onClick={onBookProperty}
  sx={{ 
    bgcolor: 'primary.main', 
    color: 'white', 
    py: 1.5, 
    borderRadius: 2, 
    fontWeight: 'bold',
    '&:hover': { bgcolor: 'primary.dark' }
  }}
>
  Reserve
</Button>
            
            <Typography variant="body2" color="text.secondary" textAlign="center" mt={1}>
              You won't be charged yet
            </Typography>
            
            <Box sx={{ mt: 3 }}>
              {[
                { label: 'Check-in', value: 'Add date' },
                { label: 'Check-out', value: 'Add date' },
                { label: 'Guests', value: '1 guest' },
              ].map((item, index) => (
                <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', py: 1.5, borderBottom: '1px solid #eee' }}>
                  <Typography variant="body2" fontWeight="bold">{item.label}</Typography>
                  <Typography variant="body2" color="text.secondary">{item.value}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PropertyDetails;