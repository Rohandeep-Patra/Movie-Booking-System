import React, { useEffect } from "react";
import { message } from "antd";
// import { useState } from "react";
import { GetCurrentUser } from "../api/user.api.js";
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {setUser} from '../redux/usersSlice.js'
import { HideLoading, ShowLoading } from "../redux/loadersSlice.js";

const ProtectedRoute = ({ children }) => {
  const {user} = useSelector((state) => state.users)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const getCurrentUser = async () => {
    try {
      dispatch(ShowLoading())
      const response = await GetCurrentUser();
      dispatch(HideLoading())
      if (response.success) {
        dispatch(setUser(response.data))
      } else {
        dispatch(setUser(null))
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading())
      dispatch(setUser(null))
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
