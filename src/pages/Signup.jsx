// src/pages/Signup.jsx
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { Box, Typography, TextField, Button, Paper, Alert } from '@mui/material';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirect = searchParams.get('redirect') || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password.length < 6) {
      return setError('Password should be at least 6 characters');
    }

    setLoading(true);
    setError('');
    
    try {

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
     
      await updateProfile(userCredential.user, {
        displayName: displayName
      });

    
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        uid: userCredential.user.uid,
        displayName,
        email,
        phone,
        isAdmin: false,
        isHost: false,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      maxWidth: 500, 
      mx: 'auto', 
      p: 4,
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      justifyContent: 'center'
    }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography 
          variant="h4" 
          gutterBottom 
          align="center" 
          color="primary"
          sx={{ fontWeight: 'bold' }}
        >
          Create Account
        </Typography>
        
        <Typography variant="body1" align="center" color="text.secondary" mb={3}>
          Join The Baobab Haven community
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Full Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            margin="normal"
            required
          />
          
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Phone Number"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            margin="normal"
          />
          
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            helperText="At least 6 characters"
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            size="large"
            sx={{ 
              mt: 3, 
              mb: 2, 
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 'bold'
            }}
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </Button>
          
          <Typography align="center" sx={{ mt: 2 }}>
            Already have an account?{' '}
            <Link 
              to={`/login?redirect=${encodeURIComponent(redirect)}`}
              style={{ 
                color: '#FF5A5F', 
                fontWeight: 'bold',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              Log in
            </Link>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
};

export default Signup;