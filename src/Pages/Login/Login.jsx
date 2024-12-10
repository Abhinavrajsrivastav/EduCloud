import React, { useState, useEffect } from 'react';
import PasswordResetModal from './PasswordResetModal'; 
import './Login.css';
import { auth } from '../../API/Firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';
import { useUser } from '../../UserContext'; 

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(false);
    const { user, setUser } = useUser(); 

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
            setEmail(parsedUser.email); 
        }
    }, [setUser]);

    const toggleCard = () => {
        setIsLogin(!isLogin);
    }

    const handleContinue = async () => {
        if (isLogin) {
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                console.log('Login successful');

                const userData = {
                    userName: user.displayName || email.split('@')[0], 
                    email: user.email,
                };
                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData));
            } catch (error) {
                console.error('Login error:', error.message);
            }
        } else {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                console.log('Sign up successful');

                const userData = {
                    userName: user.displayName || email.split('@')[0],
                    email: user.email,
                };
                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData)); 
            } catch (error) {
                console.error('Sign up error:', error.message);
            }
        }
    }

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log('Google login successful. Email:', user.email);

            const userData = {
                userName: user.displayName || user.email.split('@')[0],
                email: user.email,
            };
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
        } catch (error) {
            console.error('Google login error:', error.message);
        }
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h2>{isLogin ? 'Welcome Back!!' : 'Create Account'}</h2>
                </div>

                <div className="login-form">
                    <input 
                        type="email" 
                        placeholder="Your email address" 
                        className="input-field" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <input 
                        type="password" 
                        placeholder="Your password" 
                        className="input-field" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <button className="continue-btn" onClick={handleContinue}>
                        Continue
                    </button>
                    <p>OR</p>
                    <div className="alternative-login">
                        <button className="alt-btn google-btn" onClick={handleGoogleSignIn}> 
                            <FcGoogle size={'15'} style={{position:'relative',right:'10px'}}/> Continue with Google
                        </button>
                    </div>
                    <div className="signup-section">
                        <p>
                            {isLogin ? "Don't have an account?" : "Already have an account?"} 
                            <a href="#" onClick={toggleCard}>
                                {isLogin ? ' Sign up' : ' Log in'}
                            </a>
                        </p>
                        {isLogin && (
                            <p>
                                <a href="#" onClick={() => setShowModal(true)}>Forgot Password?</a> {/* Open modal */}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {showModal && <PasswordResetModal onClose={() => setShowModal(false)} />}
        </div>
    );
}

export default Login;
