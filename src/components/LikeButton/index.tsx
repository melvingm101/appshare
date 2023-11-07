import React from "react";
import LikeProjectButton from "./Like";

const LikeButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      className="flex items-center bg-primary-color px-2 py-1 rounded-lg"
      onClick={onClick}
    >
      <LikeProjectButton />
      <div className="mx-3">Like</div>
    </button>
  );
};

export default LikeButton;
