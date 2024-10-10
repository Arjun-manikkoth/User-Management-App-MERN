import React, { useState } from "react";
import "./AddUser.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const AddUser: React.FC = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirm: "",
  });
  const admin = useSelector((state: RootState) => state.admin);
  const navigate = useNavigate();

  //validate email
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  //controlled component state updation
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  //validation of inputs
  function onSubmitSignUp(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    let isValid = true;

    if (formData.userName.trim() === "") {
      toast.error("Please enter a username.");
      isValid = false;
    }

    if (formData.email.trim() === "") {
      toast.error("Please enter an email address");
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email.");
      isValid = false;
    }

    if (formData.phone.trim() === "") {
      toast.error("Please enter a phone number");
      isValid = false;
    } else if (formData.phone.trim().length !== 10) {
      toast.error("Phone number must be 10 digits.");
      isValid = false;
    }

    if (formData.password.trim().length < 6) {
      toast.error("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      if (formData.passwordConfirm.trim() === "") {
        toast.error("Please Re-enter password ");
        isValid = false;
      } else if (formData.password.trim() !== formData.passwordConfirm) {
        toast.error("Passwords doesnt match");
        isValid = false;
      }
    }

    if (isValid) {
      //sending form data to server
      fetch("/admin/add-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${admin.token}`,
        },
        body: JSON.stringify(formData),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data?.status === false) {
            toast.error(data.message);
          } else {
            if (data?.user?.name) {
              navigate("/admin/dashboard");
            } else {
              toast.error("Email Already Exists");
            }
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }

  return (
    <div className="add-user-container">
      <ToastContainer position="bottom-right" />
      <div className="add-user-box">
        <div className="add-user-header">
          <h2>Add User</h2>
        </div>
        <form className="add-user-form" onSubmit={onSubmitSignUp}>
          <div className="form-group">
            <label htmlFor="userName">Username</label>
            <input
              type="text"
              id="userName"
              placeholder="Enter your username"
              onChange={handleInputChange}
              value={formData.userName}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter a password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              type="password"
              id="passwordConfirm"
              placeholder="Re-enter password"
              value={formData.passwordConfirm}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit" className="add-user-btn">
            Create User
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
