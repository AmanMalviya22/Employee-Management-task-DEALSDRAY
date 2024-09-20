import React, { useContext } from "react";
import { UserContext } from "../context/userContext";

const Dashboard = () => {
  const { currUser } = useContext(UserContext);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black">
      <div className="bg-gray-100 shadow-lg rounded-lg p-10 text-center max-w-md w-full">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Welcome to the Admin Panel
        </h1>
        {!currUser ? (
          <h2 className="text-lg font-medium text-red-500">
            Please login to access the admin features.
          </h2>
        ) : (
          <h2 className="text-lg font-medium text-green-600">
            You now have full access to the admin panel.
          </h2>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
