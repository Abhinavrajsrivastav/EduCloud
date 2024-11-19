// src/Components/MeetingScheduler.jsx
import React, { useState } from 'react';
import { gapi } from 'gapi-script';
import { API_KEY, CLIENT_ID, DISCOVERY_DOCS, SCOPES } from '../../../API/GoogleCloud';
import './Schedule.css'; 

const Schedule = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [meetingLink, setMeetingLink] = useState('');

  // Initialize Google API client
  const initializeGapi = () => {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      }).then(() => {
        const authInstance = gapi.auth2.getAuthInstance();
        setIsAuthenticated(authInstance.isSignedIn.get());
        authInstance.isSignedIn.listen(setIsAuthenticated);
      });
    });
  };

  // Handle sign-in
  const handleAuthClick = () => {
    gapi.auth2.getAuthInstance().signIn();
  };

  // Handle sign-out
  const handleSignOutClick = () => {
    gapi.auth2.getAuthInstance().signOut();
  };

  // Create a Google Meet event
  const createMeeting = async () => {
    const event = {
      summary: 'Scheduled Interview',
      start: { dateTime: new Date().toISOString(), timeZone: 'Asia/Kolkata' },
      end: { dateTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(), timeZone: 'Asia/Kolkata' },
      conferenceData: { createRequest: { requestId: 'xyz123' } },
    };

    try {
      const response = await gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event,
        conferenceDataVersion: 1,
      });
      setMeetingLink(response.result.hangoutLink);
    } catch (error) {
      console.error('Error creating meeting:', error);
    }
  };

  return (
    <div className="scheduler-container">
      {!isAuthenticated ? (
        <button onClick={handleAuthClick} className="auth-button">
          Sign in with Google
        </button>
      ) : (
        <>
          <button onClick={createMeeting} className="create-button">
            Schedule Interview
          </button>
          {meetingLink && (
            <div className="meeting-info">
              <p>Meeting Link:</p>
              <a href={meetingLink} target="_blank" rel="noopener noreferrer">
                {meetingLink}
              </a>
            </div>
          )}
          <button onClick={handleSignOutClick} className="auth-button">
            Sign Out
          </button>
        </>
      )}
    </div>
  );
};

export default Schedule;
