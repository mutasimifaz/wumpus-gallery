import React, { useState, useEffect } from "react";
import { useAuthState, useUpdateProfile } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import auth from "../firebase.init";
import UploadImage from "../Hooks/UploadImage";
import useToken from "./../Hooks/useToken";
import Axios from "axios";

const Profile = () => {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState();

  const [updateProfile, updating] = useUpdateProfile(auth);
  const [image, setImage] = useState(null);
  const [bg, setBg] = useState("");
  console.log(bg);
  const [uploading, SetUploading] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const { uploadImage } = UploadImage();
  const [token] = useToken(user);
  useEffect(() => {
    fetch(`http://localhost:5000/profile/${user?.email}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        setLoading(false);
      });
  }, [user?.email]);
  const uploadBackground = (files) => {
    const formData = new FormData();
    formData.append("file", files);
    formData.append("upload_preset", "eciehwmy");
    Axios.post(
      "https://api.cloudinary.com/v1_1/ifazinary/image/upload",
      formData
    ).then((res) => {
      setBg(res?.data?.url);
    });
  };
  const onSubmit = async (data) => {
    const currentUser = {
      user_name: data.name || user?.displayName,
      photo: image || user?.photoURL,
      cover:
        bg ||
        userData?.cover ||
        "https://i.ibb.co/r7LM1xX/photo-1478428036186-d435e23988ea.jpg",
      url: data.url || userData?.url,
      job: data.job || userData?.job,

      description: data.description || userData?.description,
    };
    await updateProfile({
      displayName: data.name || user?.displayName,
      photoURL: image || user?.photoURL,
    });
    reset();
    setImage("");
    fetch(`http://localhost:5000/user/${user?.email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(currentUser),
    })
      .then((res) => res.json())
      .then((data) => {
        // const accessToken = data.token;
        // localStorage.setItem("accessToken", accessToken);
        // setToken(accessToken);
      })
      .finally(() => {
        // navigate("/");
        fetch(`http://localhost:5000/profile/${user?.email}`, {
          method: "GET",
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setUserData(data);
            setLoading(false);
            if (data) {
              toast.success(`Profile updated`, {
                toastId: 1,
              });
            } else if (data.modifiedCount === 0) {
              toast.error(`Profile not updated`, {
                toastId: 2,
              });
            }
          });
      });
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
  if (token) {
  }
  if (userData) {
  }

  if (updating) {
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
    <div className="h-screen">
      <>
        <div className="dark:text-white dark:bg-gray-700 h-screen">
          <h1 className="text-center text-red-500">
            If you are uploading image, please wait some time to load the image
            when it loads properly it will show under the input field.
          </h1>
          <div className="justify-center flex object-center items-center">
            <div className="grid lg:grid-cols-2">
              <div className="md:items-center md:justify-center md:flex">
                <div className="mt-8 mr-2">
                  <div
                    style={{
                      backgroundImage: `url(${userData?.cover})`,
                      backgroundSize: "cover",
                    }}
                    className="h-60 w-60 items-center justify-center flex"
                  >
                    <div
                      className="mb-3 rounded-full h-48 w-48 mt-5 select-none mx-auto border-2"
                      style={{
                        backgroundImage: `url(${user?.photoURL})`,
                        backgroundSize: "cover",
                      }}
                    ></div>
                  </div>
                  <h1 className="mb-3 text-md">Name: {user?.displayName}</h1>
                  <h1 className="mb-3 text-md">
                    Email:{" "}
                    {user?.email.replace(
                      /(\w{3})[\w.-]+@([\w.]+\w)/,
                      "$1...@$2"
                    )}
                  </h1>
                  <h1 className="mb-3 text-md">
                    Description:{" "}
                    {userData?.description ? userData?.description : "N/A"}
                  </h1>
                  <h1 className="mb-3 text-md">
                    Custom Url: {userData?.url ? userData?.url : "N/A"}
                  </h1>
                  <h1 className="mb-3 text-md">
                    Job: {userData?.job ? userData?.job : "N/A"}
                  </h1>
                </div>
              </div>

              <div className="items-center justify-center my-auto">
                <form
                  className="mt-8 space-y-6"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <input type="hidden" name="remember" defaultValue="true" />
                  <div className="rounded-md -space-y-px">
                    <div className="mb-2">
                      <label htmlFor="name" className="sr-only">
                        Name
                      </label>
                      <input
                        style={{ width: "300px" }}
                        name="name"
                        type="name"
                        {...register("name")}
                        className="appearance-none rounded-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Name"
                      />
                    </div>
                    <div className="pb-2">
                      <label htmlFor="name" className="sr-only">
                        Custom Url
                      </label>
                      <input
                        style={{ width: "300px" }}
                        name="url"
                        type="text"
                        {...register("url")}
                        className="appearance-none rounded-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Custom Url"
                      />
                    </div>
                    <div className="pb-2">
                      <label htmlFor="name" className="sr-only">
                        About you
                      </label>
                      <textarea
                        style={{ width: "300px" }}
                        name="description"
                        type="text"
                        {...register("description")}
                        className="appearance-none rounded-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Description"
                      />
                    </div>
                    <div className="pb-2">
                      <label htmlFor="name" className="sr-only">
                        Job
                      </label>
                      <input
                        style={{ width: "300px" }}
                        name="job"
                        type="text"
                        {...register("job")}
                        className="appearance-none rounded-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Job"
                      />
                    </div>

                    <div className="flex justify-center items-center w-full mt-4 pb-4">
                      <label
                        htmlFor="dropzone-file"
                        className="flex flex-col justify-center items-center w-full h-12 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div className="flex flex-col justify-center items-center pt-7 pb-6">
                          <i className="fal fa-cloud-arrow-up dark:text-gray-400"></i>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Click to upload
                            </span>
                          </p>
                        </div>
                        <input
                          accept="image/png, image/gif, image/jpeg, image/jpg"
                          {...register("user_photo")}
                          onChange={(e) => {
                            uploadImage(e.target.files[0], setImage);
                          }}
                          // onClick={() => SetUploading(!uploading)}
                          onChangeCapture={() => SetUploading(!uploading)}
                          id="dropzone-file"
                          type="file"
                          className="hidden"
                        />
                      </label>
                    </div>
                    {uploading && image !== "" && (
                      <div className="flex items-center justify-center pb-2">
                        <img className="w-20 h-20" src={image} alt="" />
                        <button
                          onClick={() => setImage("")}
                          className="fal fa-circle-xmark"
                        ></button>
                      </div>
                    )}
                    {uploading && image !== "" && <h1>Uploading</h1>}
                    <label className="block">
                      <span className="sr-only">Choose .gif File</span>
                      <input
                        {...register("cover")}
                        id="dropzone-file"
                        onChange={(e) => {
                          uploadBackground(e.target.files[0]);
                        }}
                        type="file"
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mb-2"
                      />
                    </label>

                    <button
                      type="submit"
                      style={{ width: "300px" }}
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Update Profile
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Profile;
