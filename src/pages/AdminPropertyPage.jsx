// src/pages/AdminPropertyPage.jsx
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminPropertyPage = () => {
  const { currentUser } = useAuth();

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Property Management
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
        <Button 
          component={Link}
          to="/host"
          variant="contained"
          size="large"
        >
          Add New Property
        </Button>
        <Button 
          component={Link}
          to="/my-listings"
          variant="outlined"
          size="large"
        >
          View My Listings
        </Button>
      </Box>
    </Box>
  );
};

export default AdminPropertyPage;