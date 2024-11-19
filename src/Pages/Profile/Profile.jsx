import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../UserContext';
import { 
  FcCalendar, FcVideoCall, FcFeedback, FcComboChart, 
  FcContacts, FcDocument, FcAlarmClock 
} from 'react-icons/fc';
import { FaUserCircle } from 'react-icons/fa';
import './Profile.css';

const Profile = () => {
  const { user, setUser } = useUser();
  const [email, setEmail] = useState('');
  
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setEmail(parsedUser.email);
    }
  }, [setUser]);

  // If no user is logged in
  if (!user) {
    return <h1>Please log in to view your profile</h1>;
  }

  return (
    <div className="profile-page">
      {/* User Info Section */}
      <div className="user-info">
        <FaUserCircle className="user-avatar" />
        <h2>Welcome, {email || 'User'}</h2>
      </div>

      {/* Profile Features with Links */}
      <div className="features-grid">
        {/* <Link to="/schedule-meeting" className="feature-card">
          <FcCalendar className="feature-icon" />
          <h3>Meeting Scheduler</h3>
          <p>Plan interviews with calendar sync.</p>
        </Link> */}

        <Link to="/start-meeting" className="feature-card">
          <FcVideoCall className="feature-icon" />
          <h3>Start a Interviews</h3>
          <p>Join video calls seamlessly.</p>
        </Link>

        <Link to="/join-meeting" className="feature-card">
          <FcFeedback className="feature-icon" />
          <h3>Join Meeting</h3>
          <p>Instantly connect to interviews.</p>
        </Link>

        <Link to="/features" className="feature-card">
          <FcComboChart className="feature-icon" />
          <h3>Analytics</h3>
          <p>Monitor interview metrics.</p>
        </Link>

      </div>
    </div>
  );
};

export default Profile;
