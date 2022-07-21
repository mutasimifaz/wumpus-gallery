import React, { useEffect, useState } from "react";
import AllAnimations from "./AllAnimations";

const ManageAnimation = () => {
  const [wumpuses, setWumpuses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://wumpusgallery.herokuapp.com/wumpuses`)
      .then((res) => res.json())
      .then((data) => {
        setWumpuses(data);
        setLoading(false);
      });
  }, []);
  return (
    <div className="dark:bg-gray-700 dark:text-white">
      <h2 className="text-2xl font-semibold text-center mb-2">
        Animations: {wumpuses.length}
      </h2>
      <div className="overflow-x-auto dark:bg-gray-700 dark:text-white">
        <table className="table w-full dark:bg-gray-700 dark:text-white">
          <thead className="dark:bg-gray-700 dark:text-white">
            <tr>
              <th className="dark:bg-gray-700 dark:text-white"></th>
              <th className="dark:bg-gray-700 dark:text-white">Name</th>
              <th className="dark:bg-gray-700 dark:text-white">Uploader</th>
              <th className="dark:bg-gray-700 dark:text-white">Details</th>
              <th className="dark:bg-gray-700 dark:text-white ">Action</th>
            </tr>
          </thead>
          <tbody>
            {wumpuses.map((wumpus, index) => (
              <AllAnimations
                key={wumpus?._id}
                index={index}
                wumpus={wumpus}
                loading={loading}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageAnimation;
