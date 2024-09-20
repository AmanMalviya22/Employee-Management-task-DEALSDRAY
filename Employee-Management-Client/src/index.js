import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Layout from "./components/Layout";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import CreateEmployee from "./pages/CreateEmployee.jsx";
import EditDetails from "./pages/Editdetails.jsx";
import DeleteEmployee from "./pages/DeleteEmployee.jsx";
import EmployeeList from "./pages/EmployeeList.jsx";
import Logout from "./pages/Logout.jsx";
import UserProvider from "./context/userContext.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserProvider>
        <Layout />
      </UserProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/createEmployee", element: <CreateEmployee /> },
      { path: "/edit/:id", element: <EditDetails /> },
      { path: "/delete/:id", element: <DeleteEmployee /> },
      { path: "/employee-list", element: <EmployeeList /> },
      { path: "/logout", element: <Logout /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
