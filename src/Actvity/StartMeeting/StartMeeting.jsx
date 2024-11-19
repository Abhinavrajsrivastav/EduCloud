import React, { useState } from 'react';  
import './StartMeeting.css';  
  
const StartMeeting = () => {  
  const [meetingStarted, setMeetingStarted] = useState(false);  
  
  const startMeeting = () => {  
   setMeetingStarted(true);  
  };  
  
  return (  
   <div className="meeting-start-container">  
    <h2>Interview Meeting Start</h2>  
    <button className="start-meeting-btn" onClick={startMeeting}>  
      Start Meeting  
    </button>  
    {meetingStarted && (  
      <div className="meeting-started-container">  
       <h3>Meeting Started</h3>  
       <p>Interviewer: John Doe</p>  
       <p>Candidate: Jane Doe</p>  
       <p>Meeting ID: 123456</p>  
      </div>  
    )}  
   </div>  
  );  
};  
  
export default StartMeeting;
