import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { FcVideoCall, FcFeedback, FcComboChart, FcCalendar } from 'react-icons/fc';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return <h1>Please log in to view your profile</h1>;
  }

  return (
    <div className="profile-page">
      <div className="user-info">
        <FaUserCircle className="user-avatar" />
        <h2>Welcome, {user.email}</h2>
      </div>
      {isSidebarOpen && (
        <div className="contact-sidebar">
          <h3>Contact Info</h3>
          <ul>
            <li>Email: {user.email}</li>
            <li>Phone: {user.phone || 'Not available'}</li>
          </ul>
        </div>
      )}

      <div className="features-grid">
        <Link to="/start-meeting" className="feature-card">
          <FcVideoCall className="feature-icon" />
          <h3>Start a Meeting</h3>
          <p>Join video calls seamlessly.</p>
        </Link>
        {/* <Link to="/join-meeting" className="feature-card">
          <FcFeedback className="feature-icon" />
          <h3>Join Meeting</h3>
          <p>Instantly connect to interviews.</p>
        </Link> */}
        <Link to="/features" className="feature-card">
          <FcComboChart className="feature-icon" />
          <h3>Analytics</h3>
          <p>Monitor interview metrics...working</p>
        </Link>
        <Link to="/schedule-meeting" className="feature-card">
          <FcCalendar className="feature-icon" />
          <h3>Schedule Interview</h3>
          <p>Plan interviews with calendar sync...working</p>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
