import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard: React.FC = () => {
  interface User {
    name: string;
    email: string;
    phone: string;
    _id: string;
    isDeleted: Number;
  }

  const navigate = useNavigate();

  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    fetch("/admin/dashboard")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.usersData.length > 0) {
          setData(data.usersData);
        } else {
          setData([]);
        }
      });
  }, []);

  function deleteUser(id: string): void {
    fetch(`/admin/delete-user/${id}`)
      .then((res) => {
        res.json();
      })
      .then((response) => {
        setData(data.filter((user) => user._id !== id));
      });
  }

  function editUser(id: string): void {
    navigate(`/admin/edit-user/${id}`);
  }

  function hanldeAddUserDirect(): void {
    navigate("/admin/add-user");
  }

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <button className="add-user-button" onClick={hanldeAddUserDirect}>
          + Add User
        </button>
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
            {data
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
