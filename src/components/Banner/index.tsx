import React from "react";
import Image from "next/image";

const Banner = ({
  title,
  banner,
  views,
  numLikes,
}: {
  title: string;
  banner: string | null;
  views: number;
  numLikes: number;
}) => {
  if (banner) {
    return (
      <div className="w-full h-[300px] pb-3 relative">
        <Image
          alt={title}
          src={banner}
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-full object-cover rounded-none sm:rounded-3xl"
        />
        <div className="w-full h-[300px] z-2 bg-gradient-to-t from-[#0f0f13] absolute bottom-0 left-0 rounded-none sm:rounded-3xl"></div>
        <div className="absolute bottom-8 left-8">
          <h5 className="text-3xl font-bold text-gray-900 dark:text-white text-left">
            {title}
          </h5>
          <div className="text-sm">
            {views} views | {numLikes} reactions
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[300px] rounded-none sm:rounded-3xl pb-3 relative bg-gradient-to-b from-cyan-500 to-blue-700">
      <div className="absolute bottom-8 left-8 w-3/4">
        <h5 className="text-2xl font-bold text-gray-900 dark:text-white text-left whitespace-nowrap text-ellipsis overflow-hidden">
          {title}
        </h5>
        <div className="text-sm">
          {views} views | {numLikes} reactions
        </div>
      </div>
    </div>
  );
};

export default Banner;
