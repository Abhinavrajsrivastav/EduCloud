import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'; // Import ZegoUIKitPrebuilt

function JoinMeeting() {
  const [meetingCode, setMeetingCode] = useState('');
  const [userName, setUserName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const navigate = useNavigate();

  const handleMeetingCodeChange = (e) => {
    setMeetingCode(e.target.value);
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleJoinMeeting = (e) => {
    e.preventDefault();

    if (!meetingCode || !userName) {
      setErrorMessage('Please enter both your name and the meeting code.');
      return;
    }

    setIsJoining(true);

    setTimeout(() => {
      navigate(`/meeting/${meetingCode}`, {
        state: { userName, meetingCode }, // Optionally pass the username and meeting code as state
      });

      // Use ZegoUIKitPrebuilt to start the meeting here if needed
      const appID = 123456789; // Replace with your actual App ID
      const serverSecret = 'your-server-secret'; // Replace with your server secret
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, meetingCode, randomID(5), randomID(5));

      // Create the instance and start the meeting
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zp.joinRoom({
        container: document.getElementById('meetingContainer'), // Make sure there's a container element with this ID
        sharedLinks: [
          {
            name: 'Copy Link',
            url: `${window.location.href}?roomID=${meetingCode}`,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall, // Adjust as needed
        },
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

      <div id="meetingContainer" style={{ width: '100vw', height: '100vh' }}></div> {/* Container for the meeting */}
    </div>
  );
}

function randomID(len = 5) {
  const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
  let result = '';
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export default JoinMeeting;
