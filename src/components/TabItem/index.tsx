import React from "react";

const TabItem = ({
  text,
  onClick,
  isActive,
}: {
  text: string;
  onClick: () => void;
  isActive: boolean;
}) => {
  return (
    <li className="flex-1">
      <button
        className={`w-full text-xs sm:text-sm relative flex items-center justify-center gap-2 rounded-lg px-3 py-2 shadow hover:text-gray-300 whitespace-nowrap ${
          isActive ? "bg-secondary-color text-gra" : "text-gray-500"
        }`}
        onClick={onClick}
      >
        {text}
      </button>
    </li>
  );
};

export default TabItem;
