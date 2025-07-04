import { useEffect, useState } from 'react';
import { FcCalendar, FcComboChart, FcVideoCall } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { useUser } from '../../UserContext';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { user: contextUser } = useUser();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Get user data from context or local state
  const currentUser = contextUser || user;


  return (
    <div className="profile-page">
      <div className="user-info">
        <img src={'./logo/Calm-Full-HD-Wallpaper.jpg'} alt={""} className="user-avatar" />
        <h2>Welcome{currentUser ? `, ${currentUser.userName}` : ''}</h2>
        {/* {currentUser && currentUser.email && (
          <p className="user-email">{currentUser.email}</p>
        )} */}
      </div>
      {isSidebarOpen && (
        <div className="contact-sidebar">
          <h3>Contact Info</h3>
          <ul>
            {currentUser && <li>Email: {currentUser.email}</li>}
            {currentUser && currentUser.phone && <li>Phone: {currentUser.phone}</li>}
          </ul>
        </div>
      )}

      <div className="features-grid">
        <Link to="/start-meeting" className="feature-card">
          <FcVideoCall className="feature-icon" size='50'/>
          <h3>Start a Meeting</h3>
          <p>Join video calls seamlessly.</p>
        </Link>
        <Link to="/features" className="feature-card">
          <FcComboChart className="feature-icon" size='50'/>
          <h3>Analytics</h3>
          <p>Monitor interview metrics...working</p>
        </Link>
        <Link to="/schedule-meeting" className="feature-card">
          <FcCalendar className="feature-icon" size='50'/>
          <h3>Schedule Interview</h3>
          <p>Plan interviews with calendar sync...working</p>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
