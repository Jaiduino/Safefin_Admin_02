import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  let val = localStorage.getItem("key");
  console.log(val);

  if (val === "jay" && val !== null) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
