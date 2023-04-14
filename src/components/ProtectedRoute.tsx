import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectDataUser } from "../app/futures/accountSlice";

const ProtectedRoute = ({ children }: { children: any }) => {
  const selectUser = useSelector(selectDataUser);

  if (!selectUser.type) {
    return <Navigate to={"/"} />;
  }
  return children;
};

export default ProtectedRoute;
