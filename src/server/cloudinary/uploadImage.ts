import cloudinary from ".";

const uploadImage = async (image: string) => {
  console.log("THIS");
  console.log(image);
  try {
    const uploadedImage = await cloudinary.v2.uploader.upload(image);
    return uploadedImage.url;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default uploadImage;
