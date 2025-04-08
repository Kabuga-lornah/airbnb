// import { useState } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { doc, setDoc } from 'firebase/firestore';
// import { db } from '../config/firebase';
// import { 
//   Card, CardMedia, CardContent, Typography, Box, Rating, Chip, Button, 
//   Dialog, DialogTitle, DialogContent, DialogActions, TextField, 
//   Snackbar, Alert
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { styled } from '@mui/material/styles';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// const StyledCard = styled(Card)({
//   maxWidth: 345,
//   borderRadius: 12,
//   boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
// });

// const PropertyCard = ({ property }) => {
//   const { currentUser } = useAuth();
//   const navigate = useNavigate();
//   const [isAdded, setIsAdded] = useState(false);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [bookingDetails, setBookingDetails] = useState({
//     adults: 1,
//     children: 0,
//     checkIn: null,
//     checkOut: null,
//     specialRequests: ''
//   });

//   const handleAddToList = () => {
//     if (!currentUser) {
//       navigate('/login', { state: { from: '/my-listings' } });
//       return;
//     }
//     setOpenDialog(true);
//   };

//   const handleBookingSubmit = async () => {
//     try {
//       await setDoc(
//         doc(db, 'users', currentUser.uid, 'bookings', property.id),
//         {
//           propertyId: property.id,
//           ...property,
//           ...bookingDetails,
//           bookingDate: new Date(),
//           status: 'pending'
//         }
//       );
      
//       await setDoc(
//         doc(db, 'users', currentUser.uid, 'savedProperties', property.id),
//         {
//           propertyId: property.id,
//           addedAt: new Date(),
//           ...property
//         }
//       );

//       setIsAdded(true);
//       setSnackbarMessage('Booking request sent! Property saved to your listings.');
//       setSnackbarOpen(true);
//       setOpenDialog(false);
//     } catch (error) {
//       console.error('Error saving booking:', error);
//       setSnackbarMessage('Failed to save booking. Please try again.');
//       setSnackbarOpen(true);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setBookingDetails(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleCloseSnackbar = () => {
//     setSnackbarOpen(false);
//   };

//   return (
//     <Box sx={{ position: 'relative' }}>
//       <StyledCard>
//         <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
//           <CardMedia
//             component="img"
//             image={property.image}
//             alt={property.title}
//             sx={{
//               position: 'absolute',
//               top: 0,
//               left: 0,
//               height: '100%',
//               width: '100%',
//               objectFit: 'cover',
//               borderTopLeftRadius: 12,
//               borderTopRightRadius: 12
//             }}
//           />
//         </Box>
        
//         <CardContent sx={{ p: 2 }}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
//             <Typography variant="subtitle1" fontWeight="bold" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', pr: 1 }}>
//               {property.title}
//             </Typography>
//             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//               <Rating value={property.rating || 4} readOnly size="small" precision={0.5} />
//             </Box>
//           </Box>
          
//           <Typography variant="body2" color="text.secondary" sx={{ mb: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
//             {property.location}
//           </Typography>
          
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
//             <Typography variant="body1" fontWeight="bold">
//               ${property.price} <Typography component="span" variant="body2" color="text.secondary">night</Typography>
//             </Typography>
            
//             {property.amenities?.length > 0 && (
//               <Chip 
//                 label={property.amenities[0]} 
//                 size="small" 
//                 sx={{ bgcolor: 'rgba(255, 90, 95, 0.1)', color: 'primary.main', fontSize: '0.7rem' }} 
//               />
//             )}
//           </Box>
//         </CardContent>
//       </StyledCard>
      
//       <Button
//         variant="contained"
//         size="small"
//         onClick={handleAddToList}
//         disabled={isAdded}
//         sx={{
//           position: 'absolute',
//           top: 8,
//           right: 8,
//           bgcolor: isAdded ? 'success.main' : 'primary.main',
//           color: 'white',
//           '&:hover': {
//             bgcolor: isAdded ? 'success.dark' : 'primary.dark'
//           }
//         }}
//       >
//         {isAdded ? 'Saved' : 'Book Now'}
//       </Button>

//       {/* Booking Dialog */}
//       <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
//         <DialogTitle>Book {property.title}</DialogTitle>
//         <DialogContent dividers>
//           <LocalizationProvider dateAdapter={AdapterDateFns}>
//             <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
//               <DatePicker
//                 label="Check-in"
//                 value={bookingDetails.checkIn}
//                 onChange={(newValue) => setBookingDetails({...bookingDetails, checkIn: newValue})}
//                 slotProps={{ textField: { fullWidth: true } }}
//               />
//               <DatePicker
//                 label="Check-out"
//                 value={bookingDetails.checkOut}
//                 onChange={(newValue) => setBookingDetails({...bookingDetails, checkOut: newValue})}
//                 slotProps={{ textField: { fullWidth: true } }}
//               />
//             </Box>
//           </LocalizationProvider>

//           <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
//             <TextField
//               label="Adults"
//               type="number"
//               name="adults"
//               value={bookingDetails.adults}
//               onChange={handleInputChange}
//               fullWidth
//               inputProps={{ min: 1 }}
//             />
//             <TextField
//               label="Children"
//               type="number"
//               name="children"
//               value={bookingDetails.children}
//               onChange={handleInputChange}
//               fullWidth
//               inputProps={{ min: 0 }}
//             />
//           </Box>

//           <TextField
//             label="Special Requests"
//             name="specialRequests"
//             value={bookingDetails.specialRequests}
//             onChange={handleInputChange}
//             fullWidth
//             multiline
//             rows={3}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
//           <Button 
//             onClick={handleBookingSubmit}
//             variant="contained"
//             disabled={!bookingDetails.checkIn || !bookingDetails.checkOut}
//           >
//             Confirm Booking
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//       >
//         <Alert onClose={handleCloseSnackbar} severity={snackbarMessage.includes('Failed') ? 'error' : 'success'} sx={{ width: '100%' }}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default PropertyCard;


import React from 'react';

function PropertyCard({ property, onView, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={property.images && property.images.length > 0 ? property.images[0] : 'https://via.placeholder.com/300'} 
        alt={property.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-semibold">{property.title}</h2>
          <div className="flex items-center">
            <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <span>{property.rating}</span>
          </div>
        </div>
        <p className="text-gray-500 mt-1">{property.location}</p>
        <p className="text-gray-700 mt-2 truncate">{property.description}</p>
        <p className="font-bold mt-2">${property.price} <span className="font-normal text-gray-500">night</span></p>
        <div className="flex space-x-2 text-sm mt-4">
          <span className="px-2 py-1 bg-gray-100 rounded">{property.bedrooms} {property.bedrooms === 1 ? 'bedroom' : 'bedrooms'}</span>
          <span className="px-2 py-1 bg-gray-100 rounded">{property.bathrooms} {property.bathrooms === 1 ? 'bathroom' : 'bathrooms'}</span>
        </div>
        <div className="flex mt-4 space-x-2">
          <button 
            onClick={() => onView(property.id)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 flex-1"
          >
            View
          </button>
          <button 
            onClick={() => onEdit(property.id)}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Edit
          </button>
          <button 
            onClick={() => onDelete(property.id)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;