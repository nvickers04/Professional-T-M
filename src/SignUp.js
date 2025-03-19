import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState('Employee');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate signup success (replace with real auth later)
    setTimeout(() => {
      navigate('/dashboard', { state: { accountType } });
    }, 1000);
  };

  return (
    <div className="signup-container">
      <header className="signup-header">
        <h1>Professional T&M</h1>
      </header>
      <div className="signup-form-wrapper">
        <div className="signup-form-container">
          <h2>Sign up</h2>
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
            <div className="form-group">
              <select
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
              >
                <option value="Employee">Employee</option>
                <option value="Manager">Manager</option>
              </select>
            </div>
            <button type="submit" className="signup-button">Sign up</button>
          </form>
          <a href="/signin" className="signin-link">Already have an account? Log in</a>
        </div>
      </div>
      <footer className="signup-footer">
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

export default SignUp;