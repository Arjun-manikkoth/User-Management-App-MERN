import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

function Protected() {
  const user = useSelector((state: RootState) => state.user);

  return user.token ? <Outlet /> : <Navigate to="/sign-in" />;
}

export default Protected;
