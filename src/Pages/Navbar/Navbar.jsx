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
    <AppBar position="sticky" sx={{ backgroundColor: '#4b59f7' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="navbar-brand">
          <img src='./logo/hexagon.png' className='nav-logo' alt="Logo" />
          <Typography variant="h6" component={Link} to="/" sx={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>
            Columbae
          </Typography>
        </div>

        <div className="navbar-links">
          <Button component={Link} to="/" sx={{ color: 'white' }}>Home</Button>
          {user&&<Button color="inherit" component={Link} to="/profile">Profile</Button>}
          <Button color="inherit" href="#developer">Developer</Button>
        
          {user ? (
           <Link to="/profile">
             <img
              src={user.photoURL || './logo/Calm-Full-HD-Wallpaper.jpg'}
              alt={user.userName}
              className="profile-photo"
            /></Link>
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
       backgroundColor: '#181e59',  
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
