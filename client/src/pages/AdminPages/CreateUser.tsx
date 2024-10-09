import React from "react";
import Header from "../../Components/AdminComponents/Header/Header";
import AddUser from "../../Components/AdminComponents/AddUser/AddUser";

const DashboardPage: React.FC = () => {
  return (
    <>
      <Header />
      <AddUser />
    </>
  );
};

export default DashboardPage;
