import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Outlet } from "react-router-dom";
import auth from "../../firebase.init";
import useAdmin from "./../../Hooks/useAdmin";
const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user);
  return (
    <div
      style={{ fontFamily: "Poppins,sans-serif" }}
      className="drawer drawer-mobile bg-transparent"
    >
      <input
        id="dashboard-sidebar"
        type="checkbox"
        className="drawer-toggle bg-transparent"
      />
      <div
        style={{ fontFamily: "Poppins,sans-serif" }}
        className="drawer-content bg-transparent"
      >
        <label
          htmlFor="dashboard-sidebar"
          className="btn btn-ghost btn-circle dark:text-white top-0 mx-2 lg:hidden flex justify-center items-center"
        >
          <i className="fal fa-arrow-right-to-arc text-xl font-medium text-gray-400"></i>
          {/* <i className="fal fa-bars text-xl "></i> */}
        </label>
        <Outlet></Outlet>
      </div>
      <div
        style={{ fontFamily: "Poppins,sans-serif" }}
        className="drawer-side bg-transparent dark:bg-gray-700 dark:text-white"
      >
        <label
          htmlFor="dashboard-sidebar"
          className="drawer-overlay bg-transparent"
        ></label>
        <ul className="menu p-4 dark:text-white overflow-y-auto w-80 text-base-content dark:bg-gray-700 lg:bg-transparent bg-white">
          <li>
            <Link to="/dashboard">
              <i className="fal fa-chart-line"></i> Dashboard
            </Link>
          </li>
          {admin && (
            <>
              <li>
                <Link to="/dashboard/addNew">
                  <i className="fal fa-plus"></i>Add animation
                </Link>
              </li>
              <li>
                <Link to="/dashboard/manage">
                  <i className="fal fa-list-check"></i>Manage animation
                </Link>
              </li>
              <li>
                <Link to="/dashboard/users">
                  <i className="fal fa-users"></i>All users
                </Link>
              </li>
            </>
          )}
          <li>
            <Link to="/dashboard/profile">
              <i className="fa-light fa-square-user"></i> My profile
            </Link>
          </li>
          <li>
            <Link to="/dashboard/own">
              <i className="fa-light fa-block"></i> My animation
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
