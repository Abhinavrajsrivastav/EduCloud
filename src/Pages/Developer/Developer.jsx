// src/components/Developer/Developer.jsx
import React from 'react';
import './Developer.css';

const Developer = () => {
  return (
    <section id="developer" className="developer">
      <h2>About the Developer</h2>
      <div className="developer-container">
        <div className="developer-image">
          <img src="./logo/profile.jpg" alt="Developer" />
        </div>
        <div className="developer-info">
          <h3>Your Name</h3>
          <p>
            Hi! I'm Abhinav, the developer behind LearnCloud. I'm passionate about creating tools that enhance learning and make information more accessible. With a background in Software Engineering, I strive to build applications that are both functional and user-friendly.
          </p>
          <p>
            When I'm not coding, I enjoy coding. I'm always eager to learn new technologies and take on challenging projects.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Developer;
