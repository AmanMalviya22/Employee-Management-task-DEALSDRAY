import React, { useContext, useEffect, useState } from "react"; 
import { UserContext } from "../context/userContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const DeleteEmployee = () => {
  const { currUser } = useContext(UserContext);
  const token = currUser?.token;

  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  useEffect(() => {
    const deleteEmployee = async () => {
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_BASE_URL}/employee/delete/${id}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 203) {
          navigate("/employee-list");
        }
      } catch (error) {
        setError(error.response.data.message || "Failed to delete employee.");
      } finally {
        setLoading(false);
      }
    };
    deleteEmployee();
  }, [id, navigate, token]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-red-400 via-red-500 to-red-700">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md text-center">
        {loading ? (
          <div>
            <svg
              className="animate-spin h-8 w-8 text-red-600 mx-auto mb-4"
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
            <p className="text-lg font-medium text-gray-700">
              Deleting employee...
            </p>
          </div>
        ) : error ? (
          <div>
            <h2 className="text-2xl font-semibold text-red-600 mb-4">Error</h2>
            <p className="text-lg font-medium text-gray-700">{error}</p>
            <button
              onClick={() => navigate("/employee-list")}
              className="mt-6 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
            >
              Go Back
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold text-green-600 mb-4">
              Employee Deleted
            </h2>
            <p className="text-lg font-medium text-gray-700">
              The employee has been successfully deleted.
            </p>
            <button
              onClick={() => navigate("/employee-list")}
              className="mt-6 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
            >
              Return to Employee List
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteEmployee;
