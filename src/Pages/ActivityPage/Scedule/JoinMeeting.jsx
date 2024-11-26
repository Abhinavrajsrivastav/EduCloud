import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

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

    // Extract the meeting code from the full URL (if necessary)
    const extractedMeetingCode = meetingCode.includes('roomID=') 
      ? new URLSearchParams(new URL(meetingCode).search).get('roomID')
      : meetingCode;

    // Navigate to the meeting URL
    if (extractedMeetingCode) {
      navigate(`/meeting/${extractedMeetingCode}`, {
        state: { userName, meetingCode: extractedMeetingCode },
      });

      // Zego token generation and joining the room
      const appID = 123456789;
      const serverSecret = 'your-server-secret'; 
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        extractedMeetingCode,
        randomID(5),
        randomID(5)
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zp.joinRoom({
        container: document.getElementById('meetingContainer'),
        sharedLinks: [
          {
            name: 'Copy Link',
            url: `${window.location.href}?roomID=${extractedMeetingCode}`,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall,
        },
      });
    } else {
      setErrorMessage('Invalid meeting code.');
    }
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
          placeholder="Enter Meeting Link or Room ID"
          value={meetingCode}
          onChange={handleMeetingCodeChange}
          required
        />
        <button type="submit" disabled={isJoining}>
          {isJoining ? 'Joining...' : 'Join Meeting'}
        </button>
      </form>

      <div id="meetingContainer" style={{ width: '100vw', height: '100vh' }}></div>
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
