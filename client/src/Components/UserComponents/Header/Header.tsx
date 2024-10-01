
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';


function Header() {

  const navigate = useNavigate()

  function handleSignUp() {
    navigate('/sign-up')
  }
  
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <div className='name'>E-Hub</div>
        </div>
        <nav className="nav">
          <ul className="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
          <div onClick={handleSignUp} className="cta-btn">Sign Up</div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
