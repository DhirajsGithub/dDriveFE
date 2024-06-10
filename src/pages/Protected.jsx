import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import authContext from "../store/auth-context";

const Protected = () => {
  const navigate = useNavigate();
  const ctx = useContext(authContext);
  const token = localStorage.getItem("dDriveToken");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Protected;
