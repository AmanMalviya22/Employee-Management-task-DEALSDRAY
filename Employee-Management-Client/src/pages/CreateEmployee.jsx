import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateEmployee = ({ onCreateEmployee }) => {
  const { currUser } = useContext(UserContext);
  const token = currUser?.token;

  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    courses: [],
  });
  const [image, setImage] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEmployeeData((prevData) => {
      if (type === "checkbox") {
        const updatedCourses = checked
          ? [...prevData.courses, value]
          : prevData.courses.filter((course) => course !== value);
        return { ...prevData, [name]: updatedCourses };
      }
      return { ...prevData, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      formdata.set("name", employeeData.name);
      formdata.set("email", employeeData.email);
      formdata.set("mobile", employeeData.mobile);
      formdata.set("designation", employeeData.designation);
      formdata.set("gender", employeeData.gender);
      formdata.set("courses", employeeData.courses);
      formdata.set("image", image);

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/employee/create`,
        formdata,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      navigate("/employee-list");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Create Employee</h1>
        {error && (
          <p className="px-3 py-2 rounded-md text-white bg-red-500 mb-4">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={employeeData.name}
              onChange={handleInputChange}
              className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="text"
              name="email"
              value={employeeData.email}
              onChange={handleInputChange}
              className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">Mobile</label>
            <input
              type="text"
              name="mobile"
              value={employeeData.mobile}
              onChange={handleInputChange}
              maxLength={10}
              className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">Designation</label>
            <select
              id="designation"
              name="designation"
              value={employeeData.designation}
              onChange={handleInputChange}
              className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:ring focus:ring-blue-200"
            >
              <option value="">Select a designation</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">Courses</label>
            <div className="flex space-x-4 mt-2">
              {["MCA", "BCA", "BSc"].map((course) => (
                <label key={course} className="flex items-center">
                  <input
                    type="checkbox"
                    name="courses"
                    value={course}
                    checked={employeeData.courses.includes(course)}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  {course}
                </label>
              ))}
            </div>
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <div className="flex space-x-4 mt-2">
              {["Male", "Female"].map((gender) => (
                <label key={gender} className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value={gender}
                    checked={employeeData.gender === gender}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  {gender}
                </label>
              ))}
            </div>
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              accept="png,jpg,jpeg"
              className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-all duration-200"
            >
              Create Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEmployee;
