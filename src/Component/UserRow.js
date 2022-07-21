import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const UserRow = ({ user, refetch }) => {
  const { email, role } = user;
  const makeAdmin = () => {
    fetch(`https://wumpusgallery.herokuapp.com/user/admin/${email}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        if (res.status === 403) {
          toast.error("You are not authorized to make this user an admin");
        } else {
          res.json();
        }
      })
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success(`Made admin successfully`);
          refetch();
        }
      });
  };
  return (
    <tr className="dark:bg-gray-700 dark:text-white">
      {/* <th className="dark:bg-gray-700 dark:text-white">{index + 1}</th> */}
      <td className="dark:bg-gray-700 dark:text-white">{user?.user_name}</td>
      <td className="dark:bg-gray-700 dark:text-white">{user?.email}</td>
      <td className="dark:bg-gray-700 dark:text-white">
        <Link to={`/profile/${user?.email}`}>
          <button className="btn btn-success text-white">Profile</button>
        </Link>
      </td>
      <td className="dark:bg-gray-700 dark:text-white">
        <div className="flex center-left items-center gap-2">
          <button className="btn btn-circle text-white  bg-red-500">
            <i className="fal fa-trash"></i>
          </button>

          {role !== "admin" ? (
            <button
              onClick={makeAdmin}
              className="btn btn-circle text-white  bg-green-500"
            >
              <i className="fal fa-user-shield"></i>
            </button>
          ) : null}
        </div>
      </td>
    </tr>
  );
};

export default UserRow;
