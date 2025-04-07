import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { Box, Typography, TextField, Button, Paper, Alert, CircularProgress } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get redirect path or default to '/home'
  const from = location.state?.from?.pathname || '/home';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect to either the intended path or home
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Login error:", err); // Debug logging
      setError(
        err.message.includes('auth/invalid-credential') 
          ? 'Invalid email or password' 
          : err.message.includes('auth/too-many-requests')
          ? 'Account temporarily locked. Try again later or reset password.'
          : 'Login failed. Please try again.'
      );
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
          Login
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            sx={{ mb: 2 }}
          />
          
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            sx={{ mb: 2 }}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            size="large"
            sx={{ 
              mt: 2, 
              mb: 2, 
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 'bold'
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : 'Login'}
          </Button>
          
          <Typography align="center" sx={{ mt: 2 }}>
            Don't have an account?{' '}
            <Link 
              to="/signup"
              state={{ from: location.state?.from }}
              style={{ 
                color: '#FF5A5F', 
                fontWeight: 'bold',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              Sign up
            </Link>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;