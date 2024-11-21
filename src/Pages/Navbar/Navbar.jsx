// src/components/Navbar/Navbar.jsx
import React, { useState } from 'react';
import './Navbar.css';
import { useUser } from '../../UserContext';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

const Navbar = () => {
  const { user } = useUser(); // Access user context
  const [isMenuOpen, setMenuOpen] = useState(null); // Mobile menu state

  const handleMenuOpen = (event) => {
    setMenuOpen(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuOpen(null);
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#162591cd', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo */}
        <div className="navbar-logo">
          <img src="./logo/hexagon.png" alt="App Logo" style={{ height: '40px', marginRight: '10px' }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>columbae</Typography>
        </div>

        {/* Mobile Menu Icon */}
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ display: { xs: 'block', md: 'none' } }} onClick={handleMenuOpen}>
          <MenuIcon />
        </IconButton>

        {/* Links */}
        <div className="navbar-links" sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button color="inherit" component={Link} to="/profile">Profile</Button>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component="a" href="#features">Features</Button>
          <Button color="inherit" component="a" href="#developer">Developer</Button>

          {/* Profile or Login */}
          {user ? (
            <Button color="inherit" component={Link} to="/profile">
              <img
                src={user.photoURL || './Logo/Calm-Full-HD-Wallpaper.jpg'}
                alt={user.userName}
                style={{ height: '35px', width: '35px', borderRadius: '50%' }}
              />
            </Button>
          ) : (
            <Button color="inherit" component={Link} to="/login">Login</Button>
          )}
        </div>

        {/* Mobile Menu */}
        <Menu
          anchorEl={isMenuOpen}
          open={Boolean(isMenuOpen)}
          onClose={handleMenuClose}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          <MenuItem onClick={handleMenuClose}>
            <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>Profile</Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <a href="#features" style={{ textDecoration: 'none', color: 'inherit' }}>Features</a>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <a href="#developer" style={{ textDecoration: 'none', color: 'inherit' }}>Developer</a>
          </MenuItem>
          {user ? (
            <MenuItem onClick={handleMenuClose}>
              <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                Profile
              </Link>
            </MenuItem>
          ) : (
            <MenuItem onClick={handleMenuClose}>
              <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                Login
              </Link>
            </MenuItem>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
