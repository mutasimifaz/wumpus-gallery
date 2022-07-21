import React from "react";
import { Link } from "react-router-dom";

const AllAnimations = ({ wumpus, index }) => {
  return (
    <tr className="dark:bg-gray-700 dark:text-white">
      <th className="dark:bg-gray-700 dark:text-white">{index + 1}</th>
      <td className="dark:bg-gray-700 dark:text-white">{wumpus?.name}</td>
      <td className="dark:bg-gray-700 dark:text-white">{wumpus?.u_name}</td>
      <td className="dark:bg-gray-700 dark:text-white">
        <Link to={`/wumpus/${wumpus?._id}`}>
          <button className="btn btn-success text-white">Detail</button>
        </Link>
      </td>
      <td className="dark:bg-gray-700 dark:text-white">
        <div className="flex center-left items-center gap-2">
          <button className="btn btn-circle text-white  bg-red-500">
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
