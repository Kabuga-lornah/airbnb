// src/components/Header.jsx
import { AppBar, Toolbar, Typography, Button, Box, Avatar, Menu, MenuItem, Divider } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const open = Boolean(anchorEl);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    handleClose();
    navigate('/login');
  };

  const handleSignUp = () => {
    handleClose();
    navigate('/signup');
  };

  const handleProfile = () => {
    handleClose();
    navigate('/profile');
  };

  const handleMyListings = () => {
    handleClose();
    navigate('/my-listings');
  };

  const handleBecomeHost = () => {
    if (!currentUser) {
      navigate('/login', { state: { from: '/host' } });
    } else {
      navigate('/host'); 
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      handleClose();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: 'white', 
        color: 'primary.main', 
        boxShadow: 'none',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
      }}
    >
      <Toolbar sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        maxWidth: 'xl',
        mx: 'auto',
        width: '100%',
        px: { xs: 2, sm: 3, md: 4 }
      }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: { xs: '1.5rem', md: '2rem' } }}>
            The Baobab Haven
          </Typography>
        </Link>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button 
            color="inherit" 
            component={Link} 
            to="/"
            sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
          >
            Home
          </Button>
          <Button 
            color="inherit" 
            onClick={handleBecomeHost}
            sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
          >
            Become a Host
          </Button>
          <Avatar 
            sx={{ 
              bgcolor: 'primary.main',
              cursor: 'pointer',
              width: 40,
              height: 40,
              '&:hover': {
                transform: 'scale(1.1)',
                transition: 'transform 0.2s ease-in-out'
              }
            }}
            onClick={handleAvatarClick}
          >
            U
          </Avatar>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              elevation: 3,
              sx: {
                mt: 1.5,
                minWidth: 200,
                borderRadius: 2,
                overflow: 'visible',
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            {currentUser ? (
              [
                <MenuItem key="profile" onClick={handleProfile}>My Profile</MenuItem>,
                <MenuItem key="listings" onClick={handleMyListings}>My Listings</MenuItem>,
                <Divider key="divider" />,
                <MenuItem key="logout" onClick={handleLogout}>Logout</MenuItem>
              ]
            ) : (
              [
                <MenuItem key="login" onClick={handleLogin}>Login</MenuItem>,
                <MenuItem key="signup" onClick={handleSignUp}>Sign Up</MenuItem>
              ]
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;