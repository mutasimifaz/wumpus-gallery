import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const AllAnimations = ({ wumpus, index, refetch }) => {
  const { name, u_name, _id } = wumpus;
  const handleDelete = (_id) => {
    fetch(
      `https://wumpus-gallery-server-production.up.railway.app/wumpus/${_id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("Wumpus deleted successfully");
          refetch();
        }
      });
  };
  return (
    <tr className="dark:bg-gray-700 dark:text-white">
      <th className="dark:bg-gray-700 dark:text-white">{index + 1}</th>
      <td className="dark:bg-gray-700 dark:text-white">{name}</td>
      <td className="dark:bg-gray-700 dark:text-white">{u_name}</td>
      <td className="dark:bg-gray-700 dark:text-white">
        <Link to={`/wumpus/${_id}`}>
          <button className="btn btn-success text-white">Detail</button>
        </Link>
      </td>
      <td className="dark:bg-gray-700 dark:text-white">
        <div className="flex center-left items-center gap-2">
          <button
            onClick={() => handleDelete(_id)}
            className="btn btn-circle text-white  bg-red-500"
          >
            <i className="fal fa-trash"></i>
          </button>
          <Link to={`/editWumpus/${wumpus?._id}`}>
            <button className="btn btn-circle text-white  bg-green-500">
              <i className="fal fa-pen"></i>
            </button>
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default AllAnimations;
