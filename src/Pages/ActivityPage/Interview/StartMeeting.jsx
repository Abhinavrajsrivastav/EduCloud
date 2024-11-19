import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './StartMeeting.css';

function StartMeeting() {
  const [isJoining, setIsJoining] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    meetingCode: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleToggle = () => setIsJoining(!isJoining);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: formData.name,
      email: formData.email,
    };

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

navigate("/meeting");  // Redirect to /meeting


  };

  return (
    <div className='meeting'>
      <div className="meeting-container">
        <div className="toggle-buttons">
          <button
            className={`toggle-button ${isJoining ? 'active' : ''}`}
            onClick={() => setIsJoining(true)}
          >
            Join Meeting
          </button>
          <button
            className={`toggle-button ${!isJoining ? 'active' : ''}`}
            onClick={() => setIsJoining(false)}
          >
            Start New Meeting
          </button>
        </div>

        <form className="meeting-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {isJoining && (
            <input
              type="text"
              name="meetingCode"
              placeholder="Meeting Code"
              value={formData.meetingCode}
              onChange={handleChange}
              required
            />
          )}
          <button type="submit" className="submit-button">
            {isJoining ? 'Join Meeting' : 'Start Meeting'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default StartMeeting;
