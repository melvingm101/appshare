import { FaceSmileIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import Emoji from "./Emoji";

const EmojiPicker = ({
  id,
  isSinglePage = false,
}: {
  id: number;
  isSinglePage: boolean;
}) => {
  const [openPicker, setOpenPicker] = useState(false);

  return (
    <div
      className={`flex text-gray-500 mr-2 ${
        isSinglePage ? "" : "mb-3"
      } relative`}
    >
      <div
        className={`px-2 ${
          isSinglePage ? "bg-primary-color" : "mt-2 py-0.5 bg-secondary-color"
        } rounded-md flex items-center hover:text-white cursor-pointer text-sm select-none`}
        onClick={() => {
          setOpenPicker((prevValue) => !prevValue);
        }}
      >
        <FaceSmileIcon className="h-4 w-4" />
      </div>
      {openPicker && (
        <div
          className={`absolute ${
            isSinglePage
              ? "-top-12 bg-primary-color"
              : "-top-10 bg-secondary-color"
          } p-2 rounded-md select-none flex`}
        >
          <Emoji
            symbol="👍🏻"
            label="like"
            setOpenPicker={(value) => {
              setOpenPicker(value);
            }}
            id={id}
            isSinglePage={isSinglePage}
          />
          <Emoji
            symbol="❤️"
            label="love"
            setOpenPicker={(value) => {
              setOpenPicker(value);
            }}
            id={id}
            isSinglePage={isSinglePage}
          />
          <Emoji
            symbol="🤣"
            label="laugh"
            setOpenPicker={setOpenPicker}
            id={id}
            isSinglePage={isSinglePage}
          />
          <Emoji
            symbol="😮"
            label="wow"
            setOpenPicker={setOpenPicker}
            id={id}
            isSinglePage={isSinglePage}
          />
          <Emoji
            symbol="👎🏻"
            label="dislike"
            setOpenPicker={setOpenPicker}
            id={id}
            isSinglePage={isSinglePage}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPicker;
