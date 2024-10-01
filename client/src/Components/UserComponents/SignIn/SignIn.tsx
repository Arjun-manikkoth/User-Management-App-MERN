import React from 'react'
import './SignIn.css'
import { useNavigate } from 'react-router-dom'

const SignIn:React.FC =()=> {

  const navigate = useNavigate()
  
 function handleSignUpClick():void{
      navigate('/sign-up')
  }

  return (
    <div className="signin-container">
      <div className="signin-box">
        <div className="signup-header">
          <h2>SignIn To E-HUB</h2>
        </div>
        <form className="signin-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter a password" />
          </div>
          <button type="submit" className="signin-btn">Sign In</button>
        </form>
        <div className='signup-link' onClick={handleSignUpClick}>Create an Account?</div>
      </div>
    </div>
  )
}

export default SignIn
