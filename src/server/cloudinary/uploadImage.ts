import cloudinary from ".";

const uploadImage = async (image: string) => {
  try {
    const uploadedImage = await cloudinary.uploader.upload(image);
    return uploadedImage.url;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default uploadImage;
