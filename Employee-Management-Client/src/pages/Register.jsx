import React, { useState } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/admin/register`,
        registerData
      );
      const newUser = await response.data;
      if (!newUser) {
        setError("Couldn't register, please try again.");
      }
      navigate("/login");
    } catch (err) {
      setError(err.response.data.message);
    }

    setRegisterData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-600">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Register</h1>
        <form onSubmit={handleRegister}>
          {error && (
            <p className="bg-red-500 text-white text-center px-4 py-2 rounded-md mb-4 font-semibold">
              {error}
            </p>
          )}
          <div className="mb-6">
            <label
              htmlFor="username"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={registerData.username}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={registerData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={registerData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white py-3 rounded-lg font-bold text-lg shadow-lg hover:shadow-2xl hover:from-green-500 transition duration-300"
            >
              Register
            </button>
          </div>
          <small className="block mt-4 text-center text-gray-600">
            Already registered?{" "}
            <Link className="text-blue-600 hover:underline" to={"/login"}>
              Sign In
            </Link>
          </small>
        </form>
      </div>
    </div>
  );
};

export default Register;
