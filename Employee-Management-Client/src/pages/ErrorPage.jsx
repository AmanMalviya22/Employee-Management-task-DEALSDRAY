import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Oops! Page not found.
      </h2>
      <p className="text-lg text-gray-600 mb-6">
        Sorry, the page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 transition-all duration-200"
      >
        Go Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
