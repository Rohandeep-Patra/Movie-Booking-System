import React, { useEffect } from "react";
import { message } from "antd";
import { useState } from "react";
import { GetCurrentUser } from "../api/user.api.js";
import {useNavigate} from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate()
  const [user, setUser] = useState(null);
  const getCurrentUser = async () => {
    try {
      const response = await GetCurrentUser();
      if (response.success) {
        setUser(response.data);
      } else {
        setUser(null);
        message.error(response.message);
      }
    } catch (error) {
      setUser(null);
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getCurrentUser();
    } else {
      navigate("/login");
    }
  }, []);
  return (
    user && (
      <>
        <div>
          {user.name}
          {children}
        </div>
      </>
    )
  );
};

export default ProtectedRoute;
