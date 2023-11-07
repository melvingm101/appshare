import React from "react";
import Emoji from "./Emoji";

const EmojiPicker = ({
  id,
  isSinglePage = false,
  url,
  button,
  isOpen,
  setIsOpen,
}: {
  id: number;
  isSinglePage: boolean;
  url: string;
  button: JSX.Element;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex mr-2 relative">
      {button}
      {isOpen && (
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
              setIsOpen(value);
            }}
            id={id}
            isSinglePage={isSinglePage}
            url={url}
          />
          <Emoji
            symbol="❤️"
            label="love"
            setOpenPicker={(value) => {
              setIsOpen(value);
            }}
            id={id}
            isSinglePage={isSinglePage}
            url={url}
          />
          <Emoji
            symbol="🤣"
            label="laugh"
            setOpenPicker={setIsOpen}
            id={id}
            isSinglePage={isSinglePage}
            url={url}
          />
          <Emoji
            symbol="😮"
            label="wow"
            setOpenPicker={setIsOpen}
            id={id}
            isSinglePage={isSinglePage}
            url={url}
          />
          <Emoji
            symbol="👎🏻"
            label="dislike"
            setOpenPicker={setIsOpen}
            id={id}
            isSinglePage={isSinglePage}
            url={url}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPicker;
