import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditUser.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";

const EditUser: React.FC = () => {
  const [formData, setFormData] = useState({
    id: "",
    userName: "",
    email: "",
    phone: "",
  });
  const admin = useSelector((state: RootState) => state.admin);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    fetch(`/admin/edit-user/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${admin.token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        if (response?.status === false) {
          toast.error(response.message);
        } else {
          if (response.success) {
            setFormData({
              id: response.data._id,
              userName: response.data.name,
              email: response.data.email,
              phone: response.data.phone,
            });
          } else {
            navigate("/admin/dashboard");
          }
        }
      });
  }, []);

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

    if (isValid) {
      //sending form data to server
      fetch(`/admin/update-user`, {
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
            if (data?.email) {
              toast.error("Email Already Exists");
            } else if (data.success) {
              navigate("/admin/dashboard");
            } else {
              toast.error("User not updated");
            }
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }

  return (
    <div className="edit-user-container">
      <ToastContainer position="bottom-right" />
      <div className="edit-user-box">
        <div className="edit-user-header">
          <h2>Edit User</h2>
        </div>
        <form className="edit-user-form" onSubmit={onSubmitSignUp}>
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

          <input type="hidden" id="id" value={formData.id} />

          <button type="submit" className="edit-user-btn">
            Update User
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
