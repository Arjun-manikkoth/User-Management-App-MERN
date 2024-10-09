import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { clearAdmin } from "../../../redux/admin/adminSlice";
import { RootState } from "../../../redux/store";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const admin = useSelector((state: RootState) => state.admin);

  function handleSignIn() {
    navigate("/admin/sign-in");
  }
  function handleLogout(): void {
    dispatch(clearAdmin());
    navigate("/admin/sign-in");
  }

  return (
    <header className="header-admin">
      <div className="container-admin">
        <div className="logo-admin">
          <div className="name-admin">E-Hub</div>
        </div>
        <nav className="nav-admin">
          <ul className="nav-links-admin">
            {admin.isLogged && (
              <li>
                <div className="navigation">Home</div>
              </li>
            )}
          </ul>
          {admin.isLogged ? (
            <div className="cta-btn-admin" onClick={handleLogout}>
              logout
            </div>
          ) : (
            <div onClick={handleSignIn} className="cta-btn-admin">
              Sign In
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
