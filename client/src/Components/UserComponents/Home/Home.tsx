import React from 'react';
import './Home.css'
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
   
  const navigate = useNavigate();
  
  function handleProfileDirect(): void{
    navigate("/profile")
  }

  return (
      <main className="user-home-content">
        <section className="profile-card">
        <h2>Welcome Back, John Doe!</h2>
        <div>
        <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="profile-image"
          />
        </div>
        <div className='view-profile-button'>
          <button onClick={handleProfileDirect}>View Profile</button>
        </div>
        </section>
      </main>
  )

}

export default Home; 