import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Editdetails = ({ onCreateEmployee }) => {
  const { currUser } = useContext(UserContext);
  const token = currUser?.token;

  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true); // Loading state for data fetch
  const [error, setError] = useState("");
  const [image, setImage] = useState("");
  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    courses: [],
  });

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  useEffect(() => {
    const getEmployee = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/employee/${id}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const employee = response.data.employee;
        setEmployeeData({
          name: employee.name,
          email: employee.email,
          mobile: employee.mobile,
          designation: employee.designation,
          gender: employee.gender,
          courses: employee.courses,
        });
        setLoading(false);
      } catch (error) {
        setError(error.response.data.message);
        setLoading(false);
      }
    };
    getEmployee();
  }, [id, token]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setEmployeeData((prevData) => {
      if (type === "checkbox") {
        const updatedCourses = checked
          ? [...prevData.courses, value]
          : prevData.courses.filter((course) => course !== value);

        return {
          ...prevData,
          [name]: updatedCourses,
        };
      }

      return {
        ...prevData,
        [name]: value,
      };
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
        `${process.env.REACT_APP_BASE_URL}/employee/edit/${id}`,
        formdata,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/employee-list");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <div className="bg-white shadow-md rounded-lg p-10 w-full max-w-4xl">
        {loading ? (
          <div className="text-center">
            <svg
              className="animate-spin h-8 w-8 text-blue-500 mx-auto mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
            <p className="text-lg font-medium text-gray-700">Loading employee details...</p>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Edit Employee</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
              {error && (
                <p className="col-span-2 bg-red-500 text-white px-4 py-2 rounded-md mb-4 text-center">
                  {error}
                </p>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={employeeData.name}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={employeeData.email}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Mobile:
                  <input
                    type="text"
                    name="mobile"
                    value={employeeData.mobile}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Designation:
                  <select
                    id="designation"
                    name="designation"
                    value={employeeData.designation}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                  >
                    <option value="">Select a designation</option>
                    <option value="HR">HR</option>
                    <option value="Manager">Manager</option>
                    <option value="Sales">Sales</option>
                  </select>
                </label>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-600">
                  Courses:
                  <div className="flex mt-3 space-x-6">
                    <label>
                      <input
                        type="checkbox"
                        name="courses"
                        value="MCA"
                        checked={employeeData.courses.includes("MCA")}
                        onChange={handleInputChange}
                        className="mr-1"
                      />
                      MCA
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="courses"
                        value="BCA"
                        checked={employeeData.courses.includes("BCA")}
                        onChange={handleInputChange}
                        className="mr-1"
                      />
                      BCA
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="courses"
                        value="BSc"
                        checked={employeeData.courses.includes("BSc")}
                        onChange={handleInputChange}
                        className="mr-1"
                      />
                      BSc
                    </label>
                  </div>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Gender:
                  <div className="flex mt-3 space-x-6">
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={employeeData.gender === "Male"}
                        onChange={handleInputChange}
                        className="mr-1"
                      />
                      Male
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={employeeData.gender === "Female"}
                        onChange={handleInputChange}
                        className="mr-1"
                      />
                      Female
                    </label>
                  </div>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Image
                  <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    accept="png,jpg,jpeg"
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </label>
              </div>

              <div className="col-span-2">
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                >
                  Update Employee
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Editdetails;
