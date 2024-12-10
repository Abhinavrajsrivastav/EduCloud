import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VideoCallPage from './ActivityPage/VideoCallPage';

function MeetingPage() {
  const { meetingCode } = useParams();
  const navigate = useNavigate();
  const [isMeetingStarted, setIsMeetingStarted] = useState(false);

  useEffect(() => {
    console.log("Meeting Code:", meetingCode);
    setTimeout(() => {
      setIsMeetingStarted(true);
    }, 1000);
  }, [meetingCode]);

  const handleStartMeeting = () => {
    navigate(`/meeting/${meetingCode}/video`);
  };

  return (
    <div>
      <h2>Meeting Code: {meetingCode}</h2>
      {!isMeetingStarted ? (
        <div>
          <p>Preparing the meeting...</p>
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
