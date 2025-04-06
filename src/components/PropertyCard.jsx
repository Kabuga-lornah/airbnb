import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { 
  Card, CardMedia, CardContent, Typography, Box, Rating, Chip, Button, 
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, 
  Snackbar, Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const StyledCard = styled(Card)({
  maxWidth: 345,
  borderRadius: 12,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
});

const PropertyCard = ({ property }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isAdded, setIsAdded] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [bookingDetails, setBookingDetails] = useState({
    adults: 1,
    children: 0,
    checkIn: null,
    checkOut: null,
    specialRequests: ''
  });

  const handleAddToList = () => {
    if (!currentUser) {
      navigate('/login', { state: { from: '/my-listings' } });
      return;
    }
    setOpenDialog(true);
  };

  const handleBookingSubmit = async () => {
    try {
      await setDoc(
        doc(db, 'users', currentUser.uid, 'bookings', property.id),
        {
          propertyId: property.id,
          ...property,
          ...bookingDetails,
          bookingDate: new Date(),
          status: 'pending'
        }
      );
      
      await setDoc(
        doc(db, 'users', currentUser.uid, 'savedProperties', property.id),
        {
          propertyId: property.id,
          addedAt: new Date(),
          ...property
        }
      );

      setIsAdded(true);
      setSnackbarMessage('Booking request sent! Property saved to your listings.');
      setSnackbarOpen(true);
      setOpenDialog(false);
    } catch (error) {
      console.error('Error saving booking:', error);
      setSnackbarMessage('Failed to save booking. Please try again.');
      setSnackbarOpen(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <StyledCard>
        <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
          <CardMedia
            component="img"
            image={property.image}
            alt={property.title}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '100%',
              objectFit: 'cover',
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12
            }}
          />
        </Box>
        
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', pr: 1 }}>
              {property.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Rating value={property.rating || 4} readOnly size="small" precision={0.5} />
            </Box>
          </Box>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {property.location}
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <Typography variant="body1" fontWeight="bold">
              ${property.price} <Typography component="span" variant="body2" color="text.secondary">night</Typography>
            </Typography>
            
            {property.amenities?.length > 0 && (
              <Chip 
                label={property.amenities[0]} 
                size="small" 
                sx={{ bgcolor: 'rgba(255, 90, 95, 0.1)', color: 'primary.main', fontSize: '0.7rem' }} 
              />
            )}
          </Box>
        </CardContent>
      </StyledCard>
      
      <Button
        variant="contained"
        size="small"
        onClick={handleAddToList}
        disabled={isAdded}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          bgcolor: isAdded ? 'success.main' : 'primary.main',
          color: 'white',
          '&:hover': {
            bgcolor: isAdded ? 'success.dark' : 'primary.dark'
          }
        }}
      >
        {isAdded ? 'Saved' : 'Book Now'}
      </Button>

      {/* Booking Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Book {property.title}</DialogTitle>
        <DialogContent dividers>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <DatePicker
                label="Check-in"
                value={bookingDetails.checkIn}
                onChange={(newValue) => setBookingDetails({...bookingDetails, checkIn: newValue})}
                slotProps={{ textField: { fullWidth: true } }}
              />
              <DatePicker
                label="Check-out"
                value={bookingDetails.checkOut}
                onChange={(newValue) => setBookingDetails({...bookingDetails, checkOut: newValue})}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Box>
          </LocalizationProvider>

          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <TextField
              label="Adults"
              type="number"
              name="adults"
              value={bookingDetails.adults}
              onChange={handleInputChange}
              fullWidth
              inputProps={{ min: 1 }}
            />
            <TextField
              label="Children"
              type="number"
              name="children"
              value={bookingDetails.children}
              onChange={handleInputChange}
              fullWidth
              inputProps={{ min: 0 }}
            />
          </Box>

          <TextField
            label="Special Requests"
            name="specialRequests"
            value={bookingDetails.specialRequests}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleBookingSubmit}
            variant="contained"
            disabled={!bookingDetails.checkIn || !bookingDetails.checkOut}
          >
            Confirm Booking
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarMessage.includes('Failed') ? 'error' : 'success'} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PropertyCard;