import EditUser from "../../Components/AdminComponents/EditUser/EditUser";
import Header from "../../Components/AdminComponents/Header/Header";

import React from "react";

const LoginPage: React.FC = () => {
  return (
    <div>
      <Header />
      <EditUser />
    </div>
  );
};

export default LoginPage;
