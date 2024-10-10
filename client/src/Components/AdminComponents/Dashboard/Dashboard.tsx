import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";

const Dashboard: React.FC = () => {
  interface User {
    name: string;
    email: string;
    phone: string;
    _id: string;
    isDeleted: Number;
  }

  const navigate = useNavigate();
  const admin = useSelector((state: RootState) => state.admin);

  const [data, setData] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    fetch("/admin/dashboard", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${admin.token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data?.status === false) {
          toast.error(data.message);
        } else {
          if (data.usersData.length > 0) {
            setData(data.usersData);
          } else {
            setData([]);
          }
        }
      });
  });

  function deleteUser(id: string): void {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`/admin/delete-user/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${admin.token}`,
          },
        })
          .then((res) => {
            return res.json();
          })
          .then((response) => {
            if (response?.status === false) toast.error(response.message);
            else setData(data.filter((user) => user._id !== id));
          });
      }
    });
  }

  function editUser(id: string): void {
    navigate(`/admin/edit-user/${id}`);
  }

  function hanldeAddUserDirect(): void {
    navigate("/admin/add-user");
  }
  const filteredData = data.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
  );
  return (
    <div className="dashboard-wrapper">
      <ToastContainer />
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <button className="add-user-button" onClick={hanldeAddUserDirect}>
          + Add User
        </button>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name, email, or phone"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="table-wrapper">
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData
              .filter((user) => user.isDeleted !== 1)
              .map((user) => {
                return (
                  <tr>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                      <div className="table-actions">
                        <button
                          className="btn edit-btn"
                          onClick={() => editUser(user._id)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn delete-btn"
                          onClick={() => deleteUser(user._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
