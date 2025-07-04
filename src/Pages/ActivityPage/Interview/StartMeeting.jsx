import { useEffect, useState } from 'react';
import { FaLink, FaPlay, FaPlus, FaUsers } from 'react-icons/fa';
import { FcBusinessman, FcCalendar, FcConferenceCall, FcPhone, FcVideoCall } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../UserContext';
import './StartMeeting.css';

function StartMeeting() {
  const [isJoining, setIsJoining] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    meetingUrl: '',
  });
  
  const navigate = useNavigate();
  const { user: contextUser } = useUser();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const currentUser = contextUser || user;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleToggle = (mode) => {
    setIsJoining(mode);
    // Clear meeting URL when switching modes
    setFormData(prev => ({ ...prev, meetingUrl: '' }));
  };

  // Pre-fill user data if available
  useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        name: currentUser.userName || '',
        email: currentUser.email || ''
      }));
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: formData.name,
      email: formData.email,
      meetingUrl: isJoining ? formData.meetingUrl : null,
    };

    // Show loading state
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Connecting...';
    submitButton.disabled = true;

    // Simulate loading time
    setTimeout(() => {
      if (isJoining && formData.meetingUrl) {
        // If joining with URL, could redirect to external URL or handle accordingly
        // For now, navigate to internal meeting page
        navigate("/meeting");
      } else {
        // Starting new meeting
        navigate("/meeting");
      }
    }, 1500);

    //Now Database is not connected so we are not able to save user data into the database...**

    //     try {
    //   const response = await fetch('http://localhost:8080/start-meeting', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data),
    //   });

    //   if (response.ok) {
    //     const responseData = await response.json();
    //     console.log('Received data:', responseData);
    //     const meetingId = responseData.meetingCode;

    //     if (meetingId) {
    //       navigate(`/room/${meetingId}`);
    //     } else {
    //       console.error('Error: Meeting ID not found in the response.');
    //     }
    //   } else {
    //     const errorData = await response.json();
    //     console.error('Error:', errorData.message);
    //   }
    // } catch (error) {
    //   console.error('Error:', error.message);
    // }
  };

  return (
    <div className='meeting-page'>
      <div className="meeting-hero">
        <div className="hero-content">
          <FcConferenceCall size={80} className="hero-icon" />
          <h1>Professional Video Meetings</h1>
          <p>Connect with candidates and teams through secure, high-quality video interviews</p>
        </div>
      </div>

      <div className="meeting-container">
        <div className="meeting-header">
          <h2>Ready to {isJoining ? 'Join' : 'Start'} Your Meeting?</h2>
          <p>{isJoining ? 'Enter your meeting details to join' : 'Create a new meeting room'}</p>
        </div>

        <div className="toggle-section">
          <div className="toggle-buttons">
            <button
              className={`toggle-button ${isJoining ? 'active' : ''}`}
              onClick={() => handleToggle(true)}
            >
              <FaUsers className="toggle-icon" />
              <span>Join Meeting</span>
            </button>
            <button
              className={`toggle-button ${!isJoining ? 'active' : ''}`}
              onClick={() => handleToggle(false)}
            >
              <FaPlus className="toggle-icon" />
              <span>Start New Meeting</span>
            </button>
          </div>
        </div>

        <form className="meeting-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="input-group">
              <FcBusinessman className="input-icon" />
              <input
                type="text"
                name="name"
                placeholder="Your Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <div className="input-group">
              <FcPhone className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="Your Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            {isJoining && (
              <div className="input-group">
                <FaLink className="input-icon" />
                <input
                  type="url"
                  name="meetingUrl"
                  placeholder="Enter Meeting URL or Link"
                  value={formData.meetingUrl}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
            )}
          </div>

          <button 
            type="submit" 
            className="submit-button"
          >
            <FaPlay className="btn-icon" />
            {isJoining ? 'Join Meeting Now' : 'Start Meeting Now'}
          </button>
        </form>

      </div>
    </div>
  );
}

export default StartMeeting;
