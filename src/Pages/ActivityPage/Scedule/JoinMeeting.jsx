import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function JoinMeeting() {
  const [meetingCode, setMeetingCode] = useState('');
  const [userName, setUserName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const navigate = useNavigate(); // To navigate the user to the meeting room

  // Handle the change in the meeting code input
  const handleMeetingCodeChange = (e) => {
    setMeetingCode(e.target.value);
  };

  // Handle the change in the username input
  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  // Handle the join meeting action
  const handleJoinMeeting = (e) => {
    e.preventDefault();

    // Basic validation
    if (!meetingCode || !userName) {
      setErrorMessage('Please enter both your name and the meeting code.');
      return;
    }

    setIsJoining(true);

    // Simulate joining the meeting by navigating to the meeting page
    // Here, we're just redirecting the user to the meeting page using the meeting code.
    // This assumes that the meeting page URL will be something like /meeting/{meetingCode}.
    setTimeout(() => {
      // For this simple version, no need to send an API request. Just navigate to the meeting page.
      // Redirect the user to the meeting page
      navigate(`/meeting/${meetingCode}`, {
        state: { userName, meetingCode }, // Optionally pass the username and meeting code as state
      });
    }, 1000);
  };

  return (
    <div className="join-meeting">
      <h2>Join Meeting</h2>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form onSubmit={handleJoinMeeting}>
        <input
          type="text"
          placeholder="Enter Your Name"
          value={userName}
          onChange={handleUserNameChange}
          required
        />
        <input
          type="text"
          placeholder="Enter Meeting Code"
          value={meetingCode}
          onChange={handleMeetingCodeChange}
          required
        />
        <button type="submit" disabled={isJoining}>
          {isJoining ? 'Joining...' : 'Join Meeting'}
        </button>
      </form>
    </div>
  );
}

export default JoinMeeting;
