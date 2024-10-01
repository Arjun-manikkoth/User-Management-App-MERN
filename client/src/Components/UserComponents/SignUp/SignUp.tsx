import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUp: React.FC = () => {

const navigate = useNavigate()

  function handleSignInClick(): void{
    navigate('/sign-in')
  }

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="signup-header">
          <h2>Create Your Account</h2>
        </div>
        <form className="signup-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" placeholder="Enter your username" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" placeholder="Enter your phone number" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter a password" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Confirm Password</label>
            <input type="password" id="passwordConfirm" placeholder="Re-enter password" />
          </div>

          <button type="submit" className="signup-btn">Sign Up</button>
        </form>
        <div className='signin-link' onClick={handleSignInClick}>Login to Your Account?</div>
      </div>
    </div>
  );
}

export default SignUp;
