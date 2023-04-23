import React from "react";
import { useStore } from "@/zustand";

const Emoji = ({
  label,
  symbol,
  setOpenPicker,
  id,
  isSinglePage,
}: {
  label: string;
  symbol: string;
  setOpenPicker: (setOpen: boolean) => void;
  id: number;
  isSinglePage: boolean;
}) => {
  const addLike = useStore((state) => state.addLike);
  const user = useStore((state) => state.firebaseUser);

  return (
    <div
      className="cursor-pointer transition duration-125 hover:scale-150"
      onClick={async () => {
        const token = await user?.getIdToken();
        if (token) {
          addLike(id, { like: label }, token, isSinglePage);
          setOpenPicker(false);
        }
      }}
    >
      <span
        className="text-lg mx-2"
        role="img"
        aria-label={label ? label : ""}
        aria-hidden={label ? "false" : "true"}
        style={{
          fontFamily: "'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'",
        }}
      >
        {symbol}
      </span>
    </div>
  );
};

export default Emoji;
