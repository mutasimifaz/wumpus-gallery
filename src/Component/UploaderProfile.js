import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const UploaderProfile = () => {
  const [user, setUser] = useState();
  const [wumpus, setWumpus] = useState([]);
  const { email } = useParams();
  const [loading, setLoading] = useState(true);
  const [wloading, setwLoading] = useState(true);

  useEffect(() => {
    fetch(`https://wumpus-gallery-server.onrender.com/profile/${email}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      });
  }, [email]);
  useEffect(() => {
    fetch(
      `https://wumpus-gallery-server.onrender.com/wumpus?u_email=${email}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setWumpus(data);
        setwLoading(false);
      });
  }, [email]);

  if (loading || wloading) {
    return (
      <div
        className="mx-auto my-auto flex justify-center items-center h-screen dark:bg-gray-700 text-white
"
      >
        <svg
          role="status"
          className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${
            user?.cover ||
            "https://i.ibb.co/whb4CF7/istockphoto-1226478932-170667a.jpg"
          })`,
          // backgroundSize: "cover",
        }}
        className="shadow-lg p-3"
      >
        <div className="flex justify-center items-center ">
          <div className="border border-red-500 rounded-full">
            <div
              style={{
                backgroundImage: `url(${user?.photo})`,
                backgroundSize: "cover",
              }}
              className="w-36 h-36 rounded-full border border-indigo-500 p-0.5 select-none"
            />
          </div>
        </div>
        <h1 className="text-3xl font-semibold text-center text-black drop-shadow-xl select-none">
          {user?.user_name}
        </h1>
        <h1 className="text-xl text-center text-black select-none">
          {user?.description}
        </h1>
        {/* <div className="flex justify-center items-center">
          <button className="text-white px-3 py-1 rounded-md bg-blue-300">
            Follow <i className="fa-thin fa-user-check"></i>
          </button>
        </div> */}
      </div>

      {wumpus.length === 0 && (
        <h1 className="text-center font-semibold text-xl dark:bg-gray-700 dark:text-white">
          Looks like user don't have any animation
        </h1>
      )}
      {wumpus.length > 0 && (
        <h1 className="text-center font-semibold text-2xl pt-2 dark:bg-gray-700 dark:text-white">
          Animation from {user?.user_name}
        </h1>
      )}
      <div className="flex items-center justify-center lg:px-10 dark:bg-gray-700 dark:text-white pt-10">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 md:px-8 px-5 gap-4 justify-center items-center">
          {wumpus.map((d) => (
            <div key={d?._id}>
              <div style={{ height: "490px" }} className="">
                <div className="flex justify-center items-center">
                  <lottie-player
                    src={d?.lottie}
                    background="transparent"
                    speed="1"
                    style={{ width: "300px", height: "300px" }}
                    loop
                    autoplay
                  ></lottie-player>
                </div>
                <div className="mb-3">
                  <h1 className="text-center text-2xl font-semibold">
                    {d?.name}
                  </h1>
                  <h1 className="text-center text-sm font-medium">
                    {d?.description}
                  </h1>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Link to={`/wumpus/${d?._id}`}>
                    <button className="px-3 py-3 rounded-sm  bg-cyan-500">
                      <span className="mr-2 select-none text-white">
                        Download
                      </span>
                      <i className="fal fa-arrow-down-to-bracket  text-white"></i>
                    </button>
                  </Link>
                  {/* <button className="rounded-full border-cyan-500 border">
                    <i className="fas text-cyan-500 fa-thumbs-up p-3"></i>
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploaderProfile;
