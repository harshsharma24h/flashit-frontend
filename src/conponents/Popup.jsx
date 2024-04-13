import React, { useState, useRef, useEffect } from 'react';
import '../App.css';

const Popup = ({ onClose }) => {
  const [showLogin, setShowLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleClose = () => {
    setShowLogin(true);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = showLogin ? 'login' : 'register';
      const response = await fetch(`http://localhost:5000/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          email
        }),
      });
      if (response.ok) {
        const data = await response.json();
        const successMessage = showLogin ? 'User logged in successfully!' : 'User registered successfully!';
        setMessage(successMessage);
        setIsLoggedIn(true);
      } else {
        const errorMessage = showLogin ? 'Invalid username or password.' : 'User registration failed.';
        setMessage(errorMessage);
      }
    } catch (error) {
      console.error(`${showLogin ? 'Login' : 'Registration'} failed:`, error);
      setMessage(`${showLogin ? 'Login' : 'Registration'} failed.`);
    }
  };

  const handleLogout = async () => {
    try {
      // Add logout functionality here if needed
      setIsLoggedIn(false);
      handleClose();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="popup-overlay">
      <div ref={popupRef} className="popup">
        <button className="close-btn" onClick={handleClose}>
          x
        </button>
        {isLoggedIn ? (
          <div>
            <h2>Logged In</h2>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <>
            {showLogin ? (
              <div>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit">Login</button>
                </form>
                <p>Don't have an account? <span onClick={() => setShowLogin(false)}>Sign Up</span></p>
              </div>
            ) : (
              <div>
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit">Sign Up</button>
                </form>
                <p>Already have an account? <span onClick={() => setShowLogin(true)}>Login</span></p>
              </div>
            )}
          </>
        )}
        <p className="message">{message}</p>
      </div>
    </div>
  );
};

export default Popup;
