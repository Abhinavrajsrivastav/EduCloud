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
      activity: 'schedule-meeting...working'
    },
    {
      icon: <FcContacts className="feature-icon" />,
      description: 'Add Contacts',
      activity: 'add-contacts...working'
    },
    {
      icon: <FcAbout className="feature-icon" />,
      description: 'View Chat History',
      activity: 'start-chat...working'
    },
    {
      icon: <FcUpload className="feature-icon" />,
      description: 'Upload Documents',
      activity: 'upload-media...working'
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
