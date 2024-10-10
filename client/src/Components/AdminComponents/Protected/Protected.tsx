import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

function Protected() {
  const admin = useSelector((state: RootState) => state.admin);

  return admin.token ? <Outlet /> : <Navigate to="/admin/sign-in" />;
}

export default Protected;
