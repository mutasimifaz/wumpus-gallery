const UploadImage = () => {
  const uploadImage = async (imageToUpload, setImage) => {
    //Hosting the image
    const imageData = new FormData();
    imageData.set("key", "3a51b76afc07aa9158348f0fd94f0c8f");
    imageData.append("image", imageToUpload);

    const response = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: imageData,
    });
    const data = await response.json();
    if (data?.data?.url) {
      setImage(data.data.url);
    }
  };

  return { uploadImage };
};

export default UploadImage;
