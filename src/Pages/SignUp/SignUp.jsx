import React from 'react';
import './SignUp.css'; // Importing CSS file
import { BsMicrosoft } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';

const SignUp = () => {
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <img
            className="logo"
            src="./logo/hexagon.png"
            alt="Logo"
          />
          <h2>Welcome Back!!</h2>
        </div>

        <div className="login-form">
          <input type="email" placeholder="Your email address" className="input-field" />
          <button className="continue-btn">Continue</button>
          <p>OR</p>
          <div className="alternative-login">
            <button className="alt-btn google-btn" > 
              <FcGoogle size={'15'} style={{position:'relative',right:'10px'}}/>
              Continue with Google
            </button>
            <button className="alt-btn microsoft-btn">
              <BsMicrosoft size={'15'} style={{position:'relative',right:'10px'}}/>
              Continue with Microsoft
            </button>
          </div>
        </div>

        <div className="signup-section">
          <p>Don't have an account? <a href="#">Sign up</a></p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
