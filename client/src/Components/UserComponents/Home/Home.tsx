import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  function handleProfileDirect(): void {
    navigate("/profile");
  }

  return (
    <main className="user-home-content">
      <section className="profile-card">
        <h2>Welcome Back, {user.name}</h2>
        <div>
          {user?.url ? (
            <img className="profile-image" src={user.url} alt="User" />
          ) : (
            <img
              className="profile-image"
              src="https://via.placeholder.com/150"
              alt="User"
            />
          )}
        </div>
        <div className="view-profile-button">
          <button onClick={handleProfileDirect}>View Profile</button>
        </div>
      </section>
    </main>
  );
};

export default Home;
