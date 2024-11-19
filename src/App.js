import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Pages/Navbar/Navbar';
import { UserProvider } from './UserContext';
import Profile from './Pages/Profile/Profile';
import Features from './Pages/Features/Features';
import Landing from './Pages/Landing/InfoSection';
import StartMeeting from './Pages/ActivityPage/Interview/StartMeeting';
import JoinMeeting from './Pages/ActivityPage/Scedule/JoinMeeting';
import MeetingPage from './Pages/MeetingPage'; // Add this import
import VideoCallPage from './Pages/ActivityPage/VideoCallPage'

function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/features" element={<Features />} />
          <Route path="/start-meeting" element={<StartMeeting />} />
          <Route path="/join-meeting" element={<JoinMeeting />} />
          <Route path="/schedule" element={<Schedule />} />
          
          {/* Route for MeetingPage */}
          <Route path="/meeting/:meetingCode" element={<MeetingPage />} />

          {/* Route for VideoCallPage (Optional depending on design) */}
          <Route path="/meeting" element={<VideoCallPage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
