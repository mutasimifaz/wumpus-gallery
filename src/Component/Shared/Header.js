import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../../firebase.init";
import useDarkMode from "../../Hooks/UseDarkMode";
import Logo from "./../../Assets/Wumpus Gallery.svg";
import { signOut } from "firebase/auth";
const Header = () => {
  const [colorTheme, setTheme] = useDarkMode();
  const [user] = useAuthState(auth);
  const logout = () => {
    signOut(auth);
    localStorage.removeItem("accessToken");
  };

  return (
    <div className="bg-white dark:bg-gray-700">
      {/* Mobile navbar start */}
      <div className="navbar lg:hidden block pt-5">
        <div className="navbar-start">
          <div className="dropdown">
            <label
              tabIndex="0"
              className="btn btn-ghost btn-circle dark:text-white"
            >
              <i className="fal fa-bars text-xl font-medium text-gray-400"></i>
            </label>
            <ul
              tabIndex="0"
              className="menu menu-compact dropdown-content dark:bg-gray-700 dark:text-slate-200 mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>

              {user && (
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
              )}
              {user && (
                <li className="flex justify-start items-start">
                  <button onClick={logout} className="">
                    Sign Out
                  </button>
                </li>
              )}

              <li>
                <button
                  onClick={() => setTheme(colorTheme)}
                  className="h-8 w-8 border dark:border-white border-gray-700 dark:bg-gray-700 bg-white dark:text-white text-gray-700 flex items-center justify-center rounded-full m-2 cursor-pointer"
                >
                  {colorTheme === "light" ? (
                    <i className="fal fa-lightbulb-on"></i>
                  ) : (
                    <i className="fal fa-moon"></i>
                  )}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="navbar-end">
          <div className="dark:text-white mr-3">
            {!user && (
              <div className="flex w-full">
                <Link to="/signIn" className="text-center my-auto">
                  Sign In
                </Link>
                <div className="divider divider-horizontal  h-10 flex justify-center items-center my-auto"></div>
                <Link to="/signUp" className="text-center my-auto">
                  Sign Up
                </Link>
              </div>
            )}
            {user && (
              <div className="flex justify-start items-center w-full">
                <h1 className="text-center w-full">
                  {user?.displayName || user?.email}
                </h1>
                {/* <div className="divider divider-horizontal h-10 flex justify-center items-center my-auto"></div> */}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* mobile navbar end */}
      {/* pc navbar start */}
      <div className=" lg:block hidden">
        <div className="navbar bg-base-100 dark:bg-gray-700 dark:text-slate-100">
          <div className="navbar-start">
            <Link to="/">
              <img className="w-16 h-16 select-none" src={Logo} alt="" />
            </Link>
          </div>
          <div className="navbar-center">
            <ul className="menu menu-horizontal p-0">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              {user && (
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
              )}
            </ul>
          </div>
          <div className="navbar-end">
            <div className="mr-10">
              {!user && (
                <div className="flex w-full">
                  <Link to="/signIn" className="text-center my-auto">
                    Sign In
                  </Link>
                  <div className="divider divider-horizontal  h-10 flex justify-center items-center my-auto"></div>
                  <Link to="/signUp" className="text-center my-auto">
                    Sign Up
                  </Link>
                </div>
              )}
              {user && (
                <div className="flex justify-start items-center gap-3">
                  <h1 className="text-center">
                    {user?.displayName || user?.email}
                  </h1>
                  <div className="divider divider-horizontal h-10 flex justify-center items-center my-auto"></div>
                  <button onClick={logout} className="btn btn-ghost">
                    SignOut
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={() => setTheme(colorTheme)}
              className="h-8 w-8 border dark:border-white border-gray-700 dark:bg-gray-700 bg-white dark:text-white text-gray-700 flex items-center justify-center rounded-full m-2 cursor-pointer"
            >
              {colorTheme === "light" ? (
                <i className="fal fa-lightbulb-on"></i>
              ) : (
                <i className="fal fa-moon"></i>
              )}
            </button>
          </div>
        </div>
      </div>
      {/* pc navbar end */}
    </div>
  );
};

export default Header;
