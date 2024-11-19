// src/components/Navbar/Navbar.jsx
import React from 'react';
import './Navbar.css';
import { useUser } from '../../UserContext';
import { FcAbout } from 'react-icons/fc';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { user } = useUser();  // Destructure user from context

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="./logo/hexagon.png" alt="App Logo" />
        <span>columbae</span>
      </div>
      <ul className="navbar-links">
        <Link to="/"><a href="#landing">Home</a></Link>
        <li><a href="#features">Features</a></li>
        <li><a href="#developer">Developer</a></li>
        
        {/* Show user's profile photo if logged in */}
        {user ? (
          <Link to="/profile" className="navbar-profile">
            <img
              src={user.photoURL || './Logo/Calm-Full-HD-Wallpaper.jpg'}
              alt={user.userName}
              className="profile-photo"
            />
            {/* <span>{user.userName}</span> */}
          </Link>
        ) : (
          <li className="navbar-profile">
            <span>Login</span> {/* Placeholder for login or sign up option */}
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
