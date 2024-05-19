import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const registrationData = (event) => {
    event.preventDefault();
    console.log("Form data submitted:", formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-600 to-sky-400">
      <div className="bg-transparent border-2 border-white rounded-md w-full max-w-md p-6 mx-4 md:mx-0">
        <h1 className="text-3xl font-quicksand font-bold text-center text-white mb-4">
          Register Your Account
        </h1>
        <hr />
        <form onSubmit={registrationData} className="p-4">
          <div className="flex flex-col my-2">
            <label
              htmlFor="name"
              className="font-quicksand font-medium text-lg text-white"
            >
              Name :
            </label>
            <input
              className="p-3 mt-2 rounded focus:outline-none"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>
          <div className="flex flex-col my-2">
            <label
              htmlFor="email"
              className="font-quicksand font-medium text-lg text-white"
            >
              Email :
            </label>
            <input
              className="p-3 mt-2 rounded focus:outline-none"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
          <div className="flex flex-col my-2">
            <label
              htmlFor="password"
              className="font-quicksand font-medium text-lg text-white"
            >
              Password :
            </label>
            <input
              className="p-3 mt-2 rounded focus:outline-none"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>

          <NavLink
            className="flex justify-center font-quicksand text-white font-medium mt-2 hover:underline"
            to="/login"
          >
            Already have an account? Login now!
          </NavLink>

          <button
            type="submit"
            className="bg-white text-black text-lg font-medium w-full py-2 mt-8 rounded font-quicksand hover:bg-gray-200"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
