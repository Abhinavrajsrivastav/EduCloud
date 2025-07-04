import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import StartMeeting from './Pages/ActivityPage/Interview/StartMeeting';
import JoinMeeting from './Pages/ActivityPage/Scedule/JoinMeeting';
import VideoCallPage from './Pages/ActivityPage/VideoCallPage';
import Analytics from './Pages/Analytics/Analytics';
import Features from './Pages/Features/Features';
import Footer from './Pages/Footer/Footer';
import Landing from './Pages/Landing/InfoSection';
import Navbar from './Pages/Navbar/Navbar';
import Profile from './Pages/Profile/Profile';
import ScheduleInterview from './Pages/ScheduleInterview/ScheduleInterview';
import { UserProvider } from './UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar /> 
        <Routes> 
          <Route path="/" element={<Landing />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/features" element={<Features />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/schedule-meeting" element={<ScheduleInterview />} />
          <Route path="/start-meeting" element={<StartMeeting />} />
          <Route path="/join-meeting" element={<JoinMeeting />} />
          <Route path="/meeting" element={<VideoCallPage />} />
        </Routes>
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;
