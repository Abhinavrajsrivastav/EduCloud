import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VideoCallPage from './ActivityPage/VideoCallPage';

function MeetingPage() {
  const { meetingCode } = useParams();
  const navigate = useNavigate();
  const [isMeetingStarted, setIsMeetingStarted] = useState(false);

  // Simulate checking if the meeting exists or can start
  useEffect(() => {
    // Here you can fetch meeting data or check if the meeting exists
    console.log("Meeting Code:", meetingCode);
    // Example: Simulate that the meeting is ready to start after 1 second
    setTimeout(() => {
      setIsMeetingStarted(true);
    }, 1000);
  }, [meetingCode]);

  const handleStartMeeting = () => {
    // Navigate to the video call page once the meeting is started
    navigate(`/meeting/${meetingCode}/video`);
  };

  return (
    <div>
      <h2>Meeting Code: {meetingCode}</h2>
      {!isMeetingStarted ? (
        <div>
          <p>Preparing the meeting...</p>
          {/* Simulate meeting loading */}
        </div>
      ) : (
        <div>
          <button onClick={handleStartMeeting}>Start Video Call</button>
        </div>
      )}
    </div>
  );
}

export default MeetingPage;
