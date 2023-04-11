import React from "react";

const Avatar = ({ src }: { src: string }) => {
  return <img className="h-8 w-8 rounded-full" src={src} alt="" />;
};

export default Avatar;
