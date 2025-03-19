import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login success (replace with real auth later)
    setTimeout(() => {
      navigate('/dashboard', { state: { accountType: 'Employee' } });
    }, 1000);
  };

  return (
    <div className="signin-container">
      <header className="signin-header">
        <h1>Professional T&M</h1>
      </header>
      <div className="signin-form-wrapper">
        <div className="signin-form-container">
          <h2>Log in or sign up</h2>
          <button className="social-login google">Continue with Google</button>
          <button className="social-login apple">Continue with Apple</button>
          <div className="separator">or</div>
          <form onSubmit={handleSubmit}>
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
              <div className="password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '🙈' : '👁️'}
                </span>
              </div>
            </div>
            <button type="submit" className="login-button">Log in</button>
          </form>
          <a href="/signup" className="signup-link">New to Professional T&M? Sign up</a>
        </div>
      </div>
      <footer className="signin-footer">
        <div className="footer-links">
          <a href="#">Terms</a>
          <span> • </span>
          <a href="#">Privacy</a>
        </div>
        <div className="language-selector">
          <span>English (United States) ▼</span>
        </div>
      </footer>
    </div>
  );
}

export default SignIn;