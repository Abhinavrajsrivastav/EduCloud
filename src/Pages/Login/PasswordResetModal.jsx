import React, { useState } from 'react';
import { auth } from '../../API/Firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import './PasswordResetModal.css'; // Ensure this CSS file is created

const PasswordResetModal = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleResetPassword = async () => {
        if (!email) {
            setMessage('Please enter your email address.');
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email);
            setMessage('Password reset email sent! Check your inbox.');
            setEmail(''); // Clear the email field
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
        onclose()
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <span className="close-button" onClick={onClose}>&times;</span> {/* Close button */}
                <h2>Reset Password</h2>
                <input 
                    type="email" 
                    placeholder="Your email address" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <button onClick={handleResetPassword}>Reset</button>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default PasswordResetModal;
