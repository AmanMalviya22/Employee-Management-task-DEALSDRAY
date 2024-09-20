import React, { useContext, useEffect, useMemo, useState } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axios from "axios";

// Define columns configuration for the table
const columns = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Image",
    accessor: "image",
    Cell: ({ value }) =>
      value ? <img src={value} alt="Employee" className="w-12 h-12" /> : null,
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Mobile",
    accessor: "mobile",
  },
  {
    Header: "Designation",
    accessor: "designation",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Courses",
    accessor: "courses",
    Cell: ({ value }) => (value.length ? value.join(", ") : "-"),
  },
  {
    Header: "Created Date",
    accessor: "createdAt",
    Cell: ({ value }) => new Date(value).toLocaleDateString(),
  },
  {
    Header: "Actions",
    accessor: "actions",
    Cell: ({ row }) => (
      <div className="flex gap-5 font-semibold">
        <Link to={`/edit/${row.original._id}`} style={{color:"green",fontSize:"20px"}}>Edit</Link>
        <Link to={`/delete/${row.original._id}`} style={{color:"red",fontSize:"20px"}}>Delete</Link>
      </div>
    ),
  },
];

const EmployeeList = () => {
  const { currUser } = useContext(UserContext); // Fetch current user from context
  const token = currUser?.token; // Get auth token from user context
  const navigate = useNavigate();

  // If no token is available, redirect the user to the login page
  useEffect(() => {
    if (!token) navigate("/");
  }, [token, navigate]);

  const [data, setData] = useState([]); // State to hold employee data
  const [search, setSearch] = useState(""); // State to hold search input

  // Fetch employees from API
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/employee`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setData(response.data.employees); // Set employee data
      } catch (error) {
        console.error(error);
      }
    };
    fetchdata();
  }, [token]);

  // Filter employees based on the search query
  const filteredData = useMemo(() => {
    return data.filter((employee) =>
      employee.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, data]);

  // Table hooks for sorting and pagination
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    state: { pageIndex },
    pageCount,
  } = useTable(
    { columns, data: filteredData, initialState: { pageSize: 6 } },
    useSortBy,
    usePagination
  );

  return (
    <div className="px-16 py-4 mt-16 text-md">
      <div className="flex justify-between mb-4 items-center">
        {/* Search Form */}
        <form className="w-80 flex">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </form>

        <div className="flex gap-20 ml-20">
          <h1 className="font-semibold">Total Count: {data.length}</h1>
          <Link
            to="/createEmployee"
            className="px-2 py-1 bg-blue-500 font-semibold rounded-md text-white"
          >
            + Create Employee
          </Link>
        </div>
      </div>

      {/* Employee Table */}
      <table
        {...getTableProps()}
        className="min-w-full border-grey-300 rounded-md overflow-hidden text-sm"
      >
        <thead className="bg-blue-500 text-white">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="p-3 text-left font-semibold">
              {headerGroup.headers.map((col) => (
                <th {...col.getHeaderProps(col.getSortByToggleProps())} className="p-3">
                  <div className="flex items-center">
                    {col.render("Header")}
                    {col.isSorted && (
                      <span className="ml-2">
                        {col.isSortedDesc ? (
                          <AiOutlineSortDescending />
                        ) : (
                          <AiOutlineSortAscending />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="even:bg-gray-100 hover:bg-gray-200">
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="p-3">
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center gap-2 mt-3 font-semibold">
        <button
          className="px-2 py-1 bg-blue-500 text-white rounded-md"
          onClick={previousPage}
          disabled={pageIndex === 0}
          
        >
          Prev
        </button>
        <span>
          Page {pageIndex + 1} of {pageCount}
        </span>
        <button
          className="px-2 py-1 bg-blue-500 text-white rounded-md"
          onClick={nextPage}
          disabled={pageIndex + 1 === pageCount}
          
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EmployeeList;
