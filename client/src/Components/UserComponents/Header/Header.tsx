import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { clearUser } from "../../../redux/user/userSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  function handleSignUp(): void {
    navigate("/sign-up");
  }
  function handleLogout(): void {
    dispatch(clearUser());
    navigate("/sign-in");
  }

  function directToHome(): void {
    navigate("/home");
  }
  function directToProfile(): void {
    navigate("/profile");
  }
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <div className="name">E-Hub</div>
        </div>
        <nav className="nav">
          {user?.name && (
            <ul className="nav-links">
              <li>
                <div className="navigation" onClick={directToHome}>
                  Home
                </div>
              </li>
              <li>
                <div className="navigation" onClick={directToProfile}>
                  Profile
                </div>
              </li>
              <li>
                <div className="navigation">Contact</div>
              </li>
            </ul>
          )}

          {user.name ? (
            <div className="cta-btn" onClick={handleLogout}>
              Logout
            </div>
          ) : (
            <div onClick={handleSignUp} className="cta-btn">
              Sign Up
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
