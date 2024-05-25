import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { message } from "antd";
// import { useState } from "react";
import { GetCurrentUser } from "../api/user.api.js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/usersSlice.js";
import { HideLoading, ShowLoading } from "../redux/loadersSlice.js";
import Dropdown from "react-bootstrap/Dropdown";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getCurrentUser = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetCurrentUser();
      dispatch(HideLoading());
      if (response.success) {
        dispatch(setUser(response.data));
      } else {
        dispatch(setUser(null));
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      dispatch(setUser(null));
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

  const Show = () => {
    if (document.getElementById("submenu").style.display === "block") {
      document.getElementById("submenu").style.display = "none";
    } else {
      document.getElementById("submenu").style.display = "block";
    }
  };
  return (
    user && (
      <>
        <div className="">
          <div className="bg-slate-600 flex justify-between items-center p-4 px-6 m-1">
            <div className=" cursor-pointer" onClick={()=>{navigate('/')}}>
              <h1 className=" text-xl font-poppins text-white">Free Movies</h1>
            </div>
            <div className="">
              <Dropdown>
                <Dropdown.Toggle
                  variant="success"
                  id="dropdown-basic"
                  onClick={Show}
                  className=" flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="27px"
                    viewBox="0 -960 960 960"
                    width="27px"
                    fill="#ffffff"
                  >
                    <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
                  </svg>
                  <p className="text-white pl-1 mb-[3px]">{user.name}</p>
                </Dropdown.Toggle>

                <div
                  id="submenu"
                  className="absolute right-2 hidden bg-white text-black rounded-md shadow-lg w-auto font-poppins"
                >
                  <p className="px-3 py-2">Hello {user.name} !!</p>
                  <hr />
                  <div
                    onClick={() => {
                      if (user.isAdmin) {
                        navigate("/admin");
                      } else {
                        navigate("/profile");
                      }
                    }}
                    className=" px-2 py-1 hover:bg-blue-100/30 rounded-md hover:font-medium hover:text-blue-800 hover:duration-500 flex items-center hover:cursor-pointer"
                  >
                    <span class="material-symbols-outlined text-2xl">
                      person
                    </span>
                    <p className="ml-2">Profile</p>
                  </div>
                  <div
                    onClick={() => {
                      localStorage.removeItem("token");
                      navigate("/login");
                    }}
                    className=" px-2 py-2 hover:bg-blue-100/30 rounded-md hover:font-medium hover:text-blue-800 hover:duration-500 flex items-center ml-[2px] hover:cursor-pointer"
                  >
                    <span class="material-symbols-outlined text-[22px] font-medium">
                      logout
                    </span>
                    <p className="ml-2 text-[15px]">Log Out</p>
                  </div>
                </div>
              </Dropdown>
            </div>
          </div>
          <div className="h-[90vh] border border-slate-300 m-1">{children}</div>
        </div>
      </>
    )
  );
};

export default ProtectedRoute;
