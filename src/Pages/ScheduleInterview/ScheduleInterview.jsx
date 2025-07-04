import { useEffect, useState } from 'react';
import { FcBusinessman, FcCalendar, FcClock, FcPhone } from 'react-icons/fc';
import { useUser } from '../../UserContext';
import './ScheduleInterview.css';

const ScheduleInterview = () => {
  const { user: contextUser } = useUser();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    candidateName: '',
    candidateEmail: '',
    position: '',
    date: '',
    time: '',
    duration: '30',
    interviewType: 'video',
    notes: ''
  });
  const [scheduledInterviews, setScheduledInterviews] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    // Load scheduled interviews from localStorage
    loadScheduledInterviews();
  }, []);

  const currentUser = contextUser || user;

  const loadScheduledInterviews = () => {
    const stored = localStorage.getItem('scheduledInterviews');
    if (stored) {
      setScheduledInterviews(JSON.parse(stored));
    } else {
      // Sample data
      const sampleInterviews = [
        {
          id: 1,
          candidateName: 'John Doe',
          candidateEmail: 'john.doe@email.com',
          position: 'Frontend Developer',
          date: '2025-07-10',
          time: '14:00',
          duration: '45',
          interviewType: 'video',
          status: 'scheduled'
        },
        {
          id: 2,
          candidateName: 'Jane Smith',
          candidateEmail: 'jane.smith@email.com',
          position: 'Backend Developer',
          date: '2025-07-12',
          time: '10:30',
          duration: '60',
          interviewType: 'phone',
          status: 'scheduled'
        }
      ];
      setScheduledInterviews(sampleInterviews);
      localStorage.setItem('scheduledInterviews', JSON.stringify(sampleInterviews));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newInterview = {
      id: Date.now(),
      ...formData,
      status: 'scheduled',
      scheduledBy: currentUser?.userName || 'Unknown'
    };

    const updatedInterviews = [...scheduledInterviews, newInterview];
    setScheduledInterviews(updatedInterviews);
    localStorage.setItem('scheduledInterviews', JSON.stringify(updatedInterviews));
    
    // Reset form
    setFormData({
      candidateName: '',
      candidateEmail: '',
      position: '',
      date: '',
      time: '',
      duration: '30',
      interviewType: 'video',
      notes: ''
    });
    
    setShowForm(false);
    alert('Interview scheduled successfully!');
  };

  const handleCancelInterview = (id) => {
    const updatedInterviews = scheduledInterviews.map(interview => 
      interview.id === id ? { ...interview, status: 'cancelled' } : interview
    );
    setScheduledInterviews(updatedInterviews);
    localStorage.setItem('scheduledInterviews', JSON.stringify(updatedInterviews));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    });
  };

  if (!currentUser) {
    return (
      <div className="schedule-page">
        <div className="schedule-container">
          <h2>Please log in to schedule interviews</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="schedule-page">
      <div className="schedule-container">
        <div className="schedule-header">
          <h1>Schedule Interview</h1>
          <p>Manage your interview schedule efficiently</p>
          <button 
            className="new-interview-btn"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : '+ Schedule New Interview'}
          </button>
        </div>

        {showForm && (
          <div className="schedule-form-container">
            <form onSubmit={handleSubmit} className="schedule-form">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="candidateName">Candidate Name *</label>
                  <input
                    type="text"
                    id="candidateName"
                    name="candidateName"
                    value={formData.candidateName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="candidateEmail">Candidate Email *</label>
                  <input
                    type="email"
                    id="candidateEmail"
                    name="candidateEmail"
                    value={formData.candidateEmail}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="position">Position *</label>
                  <input
                    type="text"
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="date">Interview Date *</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="time">Interview Time *</label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="duration">Duration (minutes)</label>
                  <select
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                  >
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="90">1.5 hours</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="interviewType">Interview Type</label>
                  <select
                    id="interviewType"
                    name="interviewType"
                    value={formData.interviewType}
                    onChange={handleInputChange}
                  >
                    <option value="video">Video Call</option>
                    <option value="phone">Phone Call</option>
                    <option value="in-person">In-Person</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="notes">Additional Notes</label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Any additional information about the interview..."
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  Schedule Interview
                </button>
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="interviews-list">
          <h2>Scheduled Interviews</h2>
          {scheduledInterviews.length === 0 ? (
            <div className="no-interviews">
              <p>No interviews scheduled yet. Click "Schedule New Interview" to get started.</p>
            </div>
          ) : (
            <div className="interviews-grid">
              {scheduledInterviews.map(interview => (
                <div key={interview.id} className={`interview-card ${interview.status}`}>
                  <div className="interview-header">
                    <h3>{interview.candidateName}</h3>
                    <span className={`status-badge ${interview.status}`}>
                      {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="interview-details">
                    <div className="detail-item">
                      <FcBusinessman size={16} />
                      <span>{interview.position}</span>
                    </div>
                    <div className="detail-item">
                      <FcCalendar size={16} />
                      <span>{formatDate(interview.date)}</span>
                    </div>
                    <div className="detail-item">
                      <FcClock size={16} />
                      <span>{formatTime(interview.time)} ({interview.duration} min)</span>
                    </div>
                    <div className="detail-item">
                      <FcPhone size={16} />
                      <span>{interview.interviewType.charAt(0).toUpperCase() + interview.interviewType.slice(1)}</span>
                    </div>
                  </div>

                  <div className="interview-contact">
                    <p><strong>Email:</strong> {interview.candidateEmail}</p>
                    {interview.notes && (
                      <p><strong>Notes:</strong> {interview.notes}</p>
                    )}
                  </div>

                  {interview.status === 'scheduled' && (
                    <div className="interview-actions">
                      <button 
                        className="cancel-interview-btn"
                        onClick={() => handleCancelInterview(interview.id)}
                      >
                        Cancel Interview
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScheduleInterview;
