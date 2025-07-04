import { useEffect, useState } from 'react';
import { FcBarChart, FcCalendar, FcLineChart, FcPieChart } from 'react-icons/fc';
import { useUser } from '../../UserContext';
import './Analytics.css';

const Analytics = () => {
  const { user: contextUser } = useUser();
  const [user, setUser] = useState(null);
  const [analyticsData, setAnalyticsData] = useState({
    totalMeetings: 0,
    completedInterviews: 0,
    averageRating: 0,
    thisMonthMeetings: 0,
    upcomingMeetings: 0
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    // Simulate loading analytics data
    loadAnalyticsData();
  }, []);

  const currentUser = contextUser || user;

  const loadAnalyticsData = () => {
    // Simulate API call - replace with actual data fetching
    setTimeout(() => {
      setAnalyticsData({
        totalMeetings: 24,
        completedInterviews: 18,
        averageRating: 4.2,
        thisMonthMeetings: 8,
        upcomingMeetings: 3
      });
    }, 1000);
  };

  const StatCard = ({ icon, title, value, description, color }) => (
    <div className="stat-card" style={{ borderLeft: `4px solid ${color}` }}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        <h3>{value}</h3>
        <p className="stat-title">{title}</p>
        <span className="stat-description">{description}</span>
      </div>
    </div>
  );

  if (!currentUser) {
    return (
      <div className="analytics-page">
        <div className="analytics-container">
          <h2>Please log in to view your analytics</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="analytics-page">
      <div className="analytics-container">
        <div className="analytics-header">
          <h1>Analytics Dashboard</h1>
          <p>Welcome back, {currentUser.userName}! Here's your interview performance overview.</p>
        </div>

        <div className="stats-grid">
          <StatCard
            icon={<FcBarChart size={40} />}
            title="Total Meetings"
            value={analyticsData.totalMeetings}
            description="All time meetings conducted"
            color="#4CAF50"
          />
          <StatCard
            icon={<FcLineChart size={40} />}
            title="Completed Interviews"
            value={analyticsData.completedInterviews}
            description="Successfully completed interviews"
            color="#2196F3"
          />
          <StatCard
            icon={<FcPieChart size={40} />}
            title="Average Rating"
            value={`${analyticsData.averageRating}/5`}
            description="Interview satisfaction score"
            color="#FF9800"
          />
          <StatCard
            icon={<FcCalendar size={40} />}
            title="This Month"
            value={analyticsData.thisMonthMeetings}
            description="Meetings conducted this month"
            color="#9C27B0"
          />
        </div>

        <div className="analytics-charts">
          <div className="chart-container">
            <h3>Monthly Meeting Trends</h3>
            <div className="chart-placeholder">
              <div className="chart-bars">
                <div className="bar" style={{height: '60%'}}><span>Jan</span></div>
                <div className="bar" style={{height: '80%'}}><span>Feb</span></div>
                <div className="bar" style={{height: '45%'}}><span>Mar</span></div>
                <div className="bar" style={{height: '90%'}}><span>Apr</span></div>
                <div className="bar" style={{height: '70%'}}><span>May</span></div>
                <div className="bar" style={{height: '85%'}}><span>Jun</span></div>
              </div>
            </div>
          </div>

          <div className="chart-container">
            <h3>Interview Success Rate</h3>
            <div className="success-rate">
              <div className="rate-circle">
                <span className="rate-percentage">75%</span>
                <span className="rate-label">Success Rate</span>
              </div>
              <div className="rate-details">
                <p>✅ Successful: 18</p>
                <p>⏳ Pending: 3</p>
                <p>❌ Cancelled: 3</p>
              </div>
            </div>
          </div>
        </div>

        <div className="recent-activity">
          <h3>Recent Activity</h3>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon">📹</div>
              <div className="activity-content">
                <p><strong>Interview with John Doe</strong></p>
                <span>Frontend Developer position - 2 days ago</span>
              </div>
              <div className="activity-status success">Completed</div>
            </div>
            <div className="activity-item">
              <div className="activity-icon">📅</div>
              <div className="activity-content">
                <p><strong>Interview with Jane Smith</strong></p>
                <span>Backend Developer position - 4 days ago</span>
              </div>
              <div className="activity-status success">Completed</div>
            </div>
            <div className="activity-item">
              <div className="activity-icon">⏰</div>
              <div className="activity-content">
                <p><strong>Interview with Mike Johnson</strong></p>
                <span>Full Stack Developer position - Tomorrow</span>
              </div>
              <div className="activity-status pending">Upcoming</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
