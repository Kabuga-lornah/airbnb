// src/components/BookingForm.jsx
import { Box, Typography, Button, TextField, Divider } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const BookingForm = ({ property }) => {
  return (
    <Box sx={{ border: '1px solid #ddd', borderRadius: 2, p: 3 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Book your stay
      </Typography>
      
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <DatePicker
            label="Check-in"
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
          <DatePicker
            label="Check-out"
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </Box>
      </LocalizationProvider>
      
      <TextField
        select
        label="Guests"
        fullWidth
        SelectProps={{ native: true }}
        sx={{ mb: 2 }}
      >
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <option key={num} value={num}>
            {num} {num === 1 ? 'guest' : 'guests'}
          </option>
        ))}
      </TextField>
      
      <Button 
        variant="contained" 
        fullWidth 
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'white', 
          py: 1.5, 
          borderRadius: 2, 
          fontWeight: 'bold',
          '&:hover': { bgcolor: 'primary.dark' },
          mb: 2
        }}
      >
        Reserve
      </Button>
      
      <Typography variant="body2" color="text.secondary" textAlign="center">
        You won't be charged yet
      </Typography>
      
      <Divider sx={{ my: 2 }} />
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="body2">${property.price} x 5 nights</Typography>
        <Typography variant="body2">${property.price * 5}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="body2">Cleaning fee</Typography>
        <Typography variant="body2">$50</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="body2">Service fee</Typography>
        <Typography variant="body2">$75</Typography>
      </Box>
      
      <Divider sx={{ my: 2 }} />
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body1" fontWeight="bold">Total</Typography>
        <Typography variant="body1" fontWeight="bold">
          ${property.price * 5 + 50 + 75}
        </Typography>
      </Box>
    </Box>
  );
};

export default BookingForm;