import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/UserPages/SignIn";
import SignUp from "./pages/UserPages/SignUp";
import Profile from "./pages/UserPages/Account";
import Home from "./pages/UserPages/HomePage";
import Error from "./pages/UserPages/Fallback";
import LoginPage from "./pages/AdminPages/LoginPage";
import DashboardPage from "./pages/AdminPages/DashboardPage";
import CreateUser from "./pages/AdminPages/CreateUser";
import UpdateUser from "./pages/AdminPages/UpdateUser";
import UserPrivate from "./Components/UserComponents/Protected/Protected";
import AdminPrivate from "./Components/AdminComponents/Protected/Protected";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />

          <Route element={<UserPrivate />}>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route element={<AdminPrivate />}>
            <Route path="/admin/dashboard" element={<DashboardPage />} />
            <Route path="/admin/add-user" element={<CreateUser />} />
            <Route path="/admin/edit-user/:id" element={<UpdateUser />} />
          </Route>

          <Route path="/admin/sign-in" element={<LoginPage />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
