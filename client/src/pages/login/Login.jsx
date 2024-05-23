import React, { useEffect } from "react";
import { Form,message } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { LoginUser } from "../../api/user.api.js";

const Register = () => {
  const navigate = useNavigate()
  const onFinish = async (values) => {
    try {
      const response = await LoginUser(values);
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token",response.data)
        window.location.href = '/' 
      } else {
        message.error(response.message)
      }
    } catch (error) {
      message.error(error.message)
    }
  };

  useEffect(() => {
    if(localStorage.getItem("token")){
      navigate('/')
    }
  },[])



  return (
    <div className="flex justify-center min-h-screen items-center bg-slate-300 p-4">
      <div className="bg-white p-6 md:p-10 rounded-md shadow-lg w-full max-w-md">
        <h1 className="text-2xl mb-3 text-center font-poppins text-slate-600">
          Login and Get Started
        </h1>
        <hr />
        <Form layout="vertical" className="mt-6" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email !!" }]}
            className="mb-2"
          >
            <input
              type="email"
              className="border-2 border-slate-300/70 rounded p-2 w-full focus:outline-none font-poppins"
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter your password !!" },
            ]}
            className="mb-2"
          >
            <input
              type="password"
              className="border-2 border-slate-300/70 rounded p-2 w-full focus:outline-none font-poppins"
              placeholder="Password"
            />
          </Form.Item>

          <button
            type="submit"
            className="bg-blue-600 text-white w-full rounded p-2 transition-colors duration-300 font-poppins border-2 border-blue-500 hover:bg-white hover:text-blue-500 hover:duration-700 hover:border-2 hover:border-blue-500 mt-4"
          >
            Login
          </button>

          <NavLink
            to="/register"
            className=" flex justify-center mt-3 font-poppins hover:text-blue-500 bg-slate-300/30 rounded text-slate-600 text-sm w-auto"
          >
            Don't have an account? Register
          </NavLink>
        </Form>
      </div>
    </div>
  );
};

export default Register;
