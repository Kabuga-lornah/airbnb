// src/pages/HostSuccess.jsx
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const HostSuccess = () => {
  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', textAlign: 'center', p: 4 }}>
      <Typography variant="h3" gutterBottom fontWeight="bold" color="primary.main">
        Thank You!
      </Typography>
      <Typography variant="h5" gutterBottom>
        Your property has been submitted for review
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Our team will review your listing and get back to you within 24 hours. 
        You'll receive an email once your property is approved.
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="contained"
        size="large"
        sx={{
          bgcolor: 'primary.main',
          '&:hover': { bgcolor: 'primary.dark' }
        }}
      >
        Back to Home
      </Button>
    </Box>
  );
};

export default HostSuccess;