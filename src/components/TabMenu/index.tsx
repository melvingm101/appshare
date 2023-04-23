import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const TabMenu = () => {
  const router = useRouter();

  return (
    <div className="overflow-scroll rounded-md bg-primary-color p-1 mx-3">
      <ul className="flex items-center gap-2 text-sm font-medium">
        <li className="flex-1">
          <Link
            href={{ pathname: "" }}
            className={`text-xs sm:text-sm relative flex items-center justify-center gap-2 rounded-lg px-3 py-2 shadow hover:text-gray-300 whitespace-nowrap"
             ${
               router.asPath === "/"
                 ? "bg-secondary-color text-gra"
                 : "text-gray-500"
             }`}
            data-testid="latest-tab"
          >
            Latest
          </Link>
        </li>
        <li className="flex-1">
          <Link
            href={{ query: { sort: "reacted" } }}
            className={`text-xs sm:text-sm flex items-center justify-center gap-2 rounded-lg px-3 py-2 hover:text-gray-300 hover:shadow whitespace-nowrap ${
              router.asPath === "/?sort=reacted"
                ? "bg-secondary-color text-gra"
                : "text-gray-500"
            }`}
          >
            Most reacted
          </Link>
        </li>
        <li className="flex-1">
          <Link
            href={{ query: { sort: "viewed" } }}
            className={`text-xs sm:text-sm flex items-center justify-center gap-2 rounded-lg px-3 py-2 hover:text-gray-300 hover:shadow whitespace-nowrap ${
              router.asPath === "/?sort=viewed"
                ? "bg-secondary-color text-gra"
                : "text-gray-500"
            }`}
          >
            Most viewed
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default TabMenu;
