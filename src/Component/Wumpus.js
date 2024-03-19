import React, { useEffect, useState } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useParams } from "react-router-dom";
// import auth from "../firebase.init";

const Wumpus = () => {
  const [wumpus, setWumpus] = useState();
  const [loading, setLoading] = useState(true);
  // const [user] = useAuthState(auth);
  const { id } = useParams();
  useEffect(() => {
    fetch(`https://wumpus-gallery-server.onrender.com/wumpus/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setWumpus(data);
        setLoading(false);
      });
  }, [id]);

  const gif = wumpus?.gif;
  const apng = wumpus?.apng;
  const lottie = wumpus?.lottie;

  const apngDownload = async () => {
    const originalImage = apng;
    const image = await fetch(originalImage);
    //Split image name
    const nameSplit = originalImage.split("/");
    const duplicateName = nameSplit.pop();

    const imageBlog = await image.blob();
    const imageURL = URL.createObjectURL(imageBlog);
    const link = document.createElement("a");
    link.href = imageURL;
    link.download = "" + duplicateName + "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const jsonDownload = async () => {
    const originalImage = lottie;
    const image = await fetch(originalImage);
    //Split image name
    const nameSplit = originalImage.split("/");
    const duplicateName = nameSplit.pop();

    const imageBlog = await image.blob();
    const imageURL = URL.createObjectURL(imageBlog);
    const link = document.createElement("a");
    link.href = imageURL;
    link.download = "" + duplicateName + "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const gifDownload = async () => {
    const originalImage = gif;
    const image = await fetch(originalImage);
    //Split image name
    const nameSplit = originalImage.split("/");
    const duplicateName = nameSplit.pop();

    const imageBlog = await image.blob();
    const imageURL = URL.createObjectURL(imageBlog);
    const link = document.createElement("a");
    link.href = imageURL;
    link.download = "" + duplicateName + "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  if (loading) {
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
    <div className="hero min-h-screen bg-base-200 dark:bg-gray-700 dark:text-white">
      <div
        className="hero-content flex-col lg:flex-row h-screen
"
      >
        <div className="flex justify-center items-center">
          <img
            src={wumpus?.gif}
            style={{ width: "300px", height: "300px" }}
            alt=""
          />
        </div>
        <div>
          <h1 className="text-5xl font-bold">Name: {wumpus?.name}</h1>
          <p className="py-6">Description: {wumpus?.description}</p>
          <h1 className="text-xl text-center mb-2">View in format :</h1>
          <div className="flex justify-center items-center gap-3 mb-3">
            <a
              href={wumpus?.gif}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline btn-info"
            >
              GIF <i className="fal fa-eye ml-2"></i>
            </a>
            <a
              href={wumpus?.apng}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline btn-success"
            >
              Apng <i className="fal fa-eye ml-2"></i>
            </a>
            <a
              href={wumpus?.lottie}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline btn-warning"
            >
              Lottie <i className="fal fa-eye ml-2"></i>
            </a>
          </div>
          <h1 className="text-xl text-center mb-2">Download in format :</h1>
          <div className="flex justify-center items-center gap-3">
            <button
              onClick={() => gifDownload()}
              className="btn btn-outline btn-accent"
            >
              GIF <i className="fal fa-arrow-down-to-bracket ml-2"></i>
            </button>
            <button
              onClick={() => apngDownload()}
              className="btn btn-outline btn-primary"
            >
              Apng <i className="fal fa-arrow-down-to-bracket ml-2"></i>
            </button>
            <button
              onClick={() => jsonDownload()}
              className="btn btn-outline btn-secondary"
            >
              Lottie <i className="fal fa-arrow-down-to-bracket ml-2"></i>
            </button>
          </div>
          <h1 className="mt-2 text-center">
            Animation by{" "}
            <Link className="underline" to={`/profile/${wumpus?.u_email}`}>
              {wumpus?.u_name}
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Wumpus;
