import React from "react";
import { tagConvert } from "@/client/utils/tagConversion";

const colorConvert = {
  WEB: "bg-purple-900 text-purple-300",
  MOBILE: "bg-red-900 text-red-300",
  DESIGN: "bg-green-900 text-green-300",
  TOOLS: "bg-yellow-900 text-yellow-300",
  PROMOTION: "bg-indigo-900 text-indigo-300",
  VIDEO: "bg-pink-900 text-pink-300",
  GAMES: "bg-blue-900 text-blue-300",
  OTHER: "bg-blue-900 text-blue-300",
};

const Pill = ({ tag }: { tag: string }) => {
  return (
    <span
      className={`text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full mb-2 ${colorConvert[tag]}`}
    >
      {tagConvert(tag)}
    </span>
  );
};

export default Pill;
