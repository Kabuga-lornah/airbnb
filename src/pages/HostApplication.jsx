// src/pages/HostApplication.jsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Box, Typography, Button, TextField, Alert } from '@mui/material';

const HostApplication = () => {
  const { currentUser } = useAuth();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await updateDoc(doc(db, 'users', currentUser.uid), {
        isHostPending: true,
        hostApplication: message
      });
      setSuccess(true);
    } catch (error) {
      console.error('Error submitting application:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Become a Host
      </Typography>
      {success ? (
        <Alert severity="success">
          Your application has been submitted! We'll review it and get back to you soon.
        </Alert>
      ) : (
        <>
          <Typography paragraph>
            Tell us why you want to become a host and what makes your property special.
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your message..."
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading || !message.trim()}
          >
            {loading ? 'Submitting...' : 'Submit Application'}
          </Button>
        </>
      )}
    </Box>
  );
};

export default HostApplication;