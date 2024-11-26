import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useUser } from '../../UserContext';
import './Navbar.css';

const Navbar = () => {
  const { user } = useUser();
  const [drawerOpen, setDrawerOpen] = useState(false); 

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#162591cd' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo and Title */}
        <div className="navbar-brand">
          <img src='./logo/hexagon.png' className='nav-logo' alt="Logo" />
          <Typography variant="h6" component={Link} to="/" sx={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>
            Columbae
          </Typography>
        </div>

        <div className="navbar-links">
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/profile">Profile</Button>
          <Button color="inherit" href="#developer">Developer</Button>
        
          {user ? (
            <img
              src={user.photoURL || './logo/Calm-Full-HD-Wallpaper.jpg'}
              alt={user.userName}
              className="profile-photo"
            />
          ) : (
            <Button color="inherit" component={Link} to="/login">Login</Button>
          )}
        </div>

        <IconButton edge="end" color="inherit" onClick={() => toggleDrawer(true)} sx={{ display: { md: 'none' } }}>
          <MenuIcon />
        </IconButton>


       <Drawer
       anchor="right"
       open={drawerOpen}
       onClose={() => toggleDrawer(false)}
       sx={{
       '& .MuiDrawer-paper': {
       backgroundColor: 'black',  
       color: 'white', 
    },
  }}
>
          <List>
            <ListItem button onClick={() => toggleDrawer(false)} component={Link} to="/">
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button onClick={() => toggleDrawer(false)} component={Link} to="/profile">
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem button onClick={() => toggleDrawer(false)} href="#developer">
              <ListItemText primary="Developer" />
            </ListItem>
            {user ? (
              <ListItem button onClick={() => toggleDrawer(false)} component={Link} to="/profile">
                <ListItemText primary={user.userName || 'Profile'} />
              </ListItem>
            ) : (
              <ListItem button onClick={() => toggleDrawer(false)} component={Link} to="/login">
                <ListItemText primary="Login" />
              </ListItem>
            )}
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
