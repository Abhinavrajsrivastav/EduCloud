import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { 
  FcVideoCall, FcPlanner, FcComments, FcAbout, FcCollaboration, FcContacts, FcSettings, FcFile, FcTodoList, FcPhoneAndroid, 
  FcUpload
} from 'react-icons/fc';
import './Features.css';

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(null);

  const features = [
    {
      icon: <FcVideoCall className="feature-icon" />,
      description: 'Start a meeting',
      activity: 'start-meeting'
    },
    {
      icon: <FcCollaboration  className='feature-icon' />,
      description: 'Join a meeting',
      activity: 'start-meeting'
    },
    {
      icon: <FcPlanner className="feature-icon" />,
      description: 'Schedule an Interview',
      activity: 'start-meeting'
    },
    {
      icon: <FcContacts className="feature-icon" />,
      description: 'Add Contacts',
      activity: 'start-meeting'
    },
    {
      icon: <FcAbout className="feature-icon" />,
      description: 'View Chat History',
      activity: 'start-meeting'
    },
    {
      icon: <FcSettings className="feature-icon" />,
      description: 'Settings',
      activity: 'start-meeting'
    },
    {
      icon: <FcUpload className="feature-icon" />,
      description: 'Upload Documents',
      activity: 'start-meeting'
    },
    {
      icon: <FcTodoList className="feature-icon" />,
      description: 'View Interview Agenda',
      activity: 'start-meeting'
    },
    {
      icon: <FcPhoneAndroid className="feature-icon" />,
      description: 'Start a Mobile Call',
      activity: 'start-meeting'
    },
  ];

  return (
    <div className="features-container">
      <ul className="features-list">
        {features.map((feature, index) => (
          <li
            key={index}
            className={`feature-item ${activeFeature === index ? 'active' : ''}`}
            onClick={() => setActiveFeature(index)}
          >
            <Link to={`/${feature.activity}`}>
            {feature.icon}
            </Link>
            <div className="feature-info">
              <div className="feature-description">
                {feature.description}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Features;
