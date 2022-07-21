import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import Axios from "axios";

const AddWumpus = () => {
  const [apng, setApng] = useState("");
  const [gif, setGif] = useState("");
  const [user] = useAuthState(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  // for apng
  const uploadApng = async (imageToUpload, setApng) => {
    const imageData = new FormData();
    imageData.set("key", "3a51b76afc07aa9158348f0fd94f0c8f");
    imageData.append("image", imageToUpload);

    const response = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: imageData,
    });
    const data = await response.json();
    if (data?.data?.url) {
      setApng(data.data.url);
    }
  };
  //for gif
  const uploadImage = (files) => {
    const formData = new FormData();
    formData.append("file", files);
    formData.append("upload_preset", "eciehwmy");
    Axios.post(
      "https://api.cloudinary.com/v1_1/ifazinary/image/upload",
      formData
    ).then((res) => {
      setGif(res?.data?.url);
    });
  };

  const onSubmit = async (data) => {
    const newWumpus = {
      name: data.name,
      description: data.description,
      lottie: data.lottie,
      apng: apng,
      gif: gif,
      u_email: user?.email,
      u_name: user?.displayName,
      // url: user?.url || null,
    };

    if (newWumpus) {
      fetch(`https://wumpusgallery.herokuapp.com/wumpuses`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(newWumpus),
      })
        .then((res) => res.json())
        .then((data) => {});
    }
    reset();
  };

  return (
    <div className="justify-center flex object-center items-center dark:bg-gray-700 dark:text-white h-screen">
      <div className="lg:w-1/3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
              Animation name*
            </label>
            <input
              {...register("name", {
                pattern: {
                  value: /^[a-zA-Z.0-9_ ]*$/,
                  message: "Provide a valid name",
                },
                required: {
                  value: true,
                  message: "Name is required",
                },
                minLength: {
                  value: 3,
                  message: "Name should be at least 5 characters",
                },
              })}
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              type="text"
            />
            <div>
              {errors.name?.type === "required" && (
                <span className="text-sm text-red-500">
                  {errors.name.message}
                </span>
              )}
              {errors.name?.type === "pattern" && (
                <span className="text-sm text-red-500">
                  {errors.name.message}
                </span>
              )}
              {errors.name?.type === "minLength" && (
                <span className="text-sm text-red-500">
                  {errors.name.message}
                </span>
              )}
            </div>
          </div>
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
              Animation description*
            </label>
            <textarea
              {...register("description", {
                required: {
                  value: true,
                  message: "Description is required",
                },
                minLength: {
                  value: 10,
                  message: "Description should be at least 10 characters",
                },
              })}
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              type="text"
            />
            <div>
              {errors.description?.type === "required" && (
                <span className="text-sm text-red-500">
                  {errors.description.message}
                </span>
              )}
              {errors.description?.type === "minLength" && (
                <span className="text-sm text-red-500">
                  {errors.description.message}
                </span>
              )}
            </div>
          </div>
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
              Lottie link*
            </label>
            <input
              {...register("lottie", {
                required: {
                  value: true,
                  message: "Enter lottie json link",
                },
              })}
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              type="url"
            />
            <div>
              {errors.lottie?.type === "required" && (
                <span className="text-sm text-red-500">
                  {errors.lottie.message}
                </span>
              )}
            </div>
          </div>
          <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200 mt-2">
            Upload .png file*
          </label>
          <div>
            <div className="flex justify-center items-center w-full mt-2 mb-2">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col justify-center items-center w-full h-12 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col justify-center items-center pt-7 pb-6">
                  <i className="fal fa-cloud-arrow-up dark:text-gray-400"></i>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span>
                  </p>
                </div>

                <input
                  {...register("png", {
                    required: {
                      value: true,
                      message: ".png file is required",
                    },
                  })}
                  id="dropzone-file"
                  onChange={(e) => {
                    uploadApng(e.target.files[0], setApng);
                  }}
                  type="file"
                  className="hidden"
                />
              </label>
            </div>
            {errors.png?.type === "required" && (
              <span className="text-sm text-red-500">{errors.png.message}</span>
            )}
          </div>

          <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
            Upload .gif file*
          </label>
          <label className="block">
            <span className="sr-only">Choose .gif File</span>
            <input
              {...register("gif", {
                required: {
                  value: true,
                  message: ".gif file is required",
                },
              })}
              id="dropzone-file"
              onChange={(e) => {
                uploadImage(e.target.files[0]);
              }}
              type="file"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mb-2"
            />
          </label>
          <div>
            {errors.gif?.type === "required" && (
              <span className="text-sm text-red-500">{errors.gif.message}</span>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-outline w-full no-animation dark:border-white dark:text-white"
          >
            submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddWumpus;
