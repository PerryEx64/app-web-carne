import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: any }) => {
  const dataUser = useSelector((state: any) => state.counts);
  if (!dataUser.value) {
    return <Navigate to={"/"} />;
  }
  return children;
};

export default ProtectedRoute;
