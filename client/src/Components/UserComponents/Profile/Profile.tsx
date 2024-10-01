import React from 'react';
import './Profile.css';

const Profile: React.FC = () => {
 
  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="image-upload">  
            <img className="profile-image" src="https://via.placeholder.com/150" alt="User" />   
        </div>  
      </div>
      <div className="profile-body">
      <div className="profile-info">
          <h2 className="section-title">Profile Details</h2>
        </div>
        <div className="profile-section">
          <h4 className="profile-name">John Doe</h4>
          <p className="profile-info"> john.doe@example.com</p>
          <p className="profile-info"> +123 456 7890</p>
        </div>
      </div>
      <div className="profile-footer">
        <form action="">
          <input type="file" accept="image/*" /> 
          <button className="edit-profile-button">Upload Image</button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
