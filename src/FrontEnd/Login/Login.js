import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState(''); // Change 'email' to 'username'
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Loader state
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
    
        try {
            const response = await axios.post('http://77.37.125.30:5000/api/login', {
                username,  
                password,
            });
    
            if (response.status === 200) {
                // On successful login, redirect to the admin page
                setLoading(false);
                navigate('/adminpage');  // Redirect to admin page
            }
        } catch (err) {
            setLoading(false);
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <>
            <div className='container-fluid login-outer pt-5 pb-5'>
                <div className="login-container">
                    <form className="login-form" onSubmit={handleLogin}>
                        <h2 className="login-title">Admin <span>Login</span></h2>
                        <p className="login-subtitle pt-2">Please log in to your account</p>

                        {error && <p className="error-message">{error}</p>} {/* Show error message */}
                        
                        <div className="form-group login-form-group">
                            <label htmlFor="username">Username</label> {/* Changed to Username */}
                            <input 
                                type="text"  // Use text input for username
                                id="username" 
                                className="form-control login-control" 
                                placeholder="Enter your username" 
                                value={username}  // Using 'username' instead of 'email'
                                onChange={(e) => setUsername(e.target.value)}
                                required 
                            />
                        </div>

                        <div className="form-group login-form-group">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                className="form-control login-control" 
                                placeholder="Enter your password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="login-btn mt-3 w-50" 
                            disabled={loading} // Disable button while loading
                        >
                            {loading ? <span>Loading...</span> : <span>Login</span>} {/* Show loader or text */}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
