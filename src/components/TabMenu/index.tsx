import React from "react";

const TabMenu = () => {
  return (
    <div className="overflow-scroll rounded-md bg-primary-color p-1 mx-3">
      <ul className="flex items-center gap-2 text-sm font-medium">
        <li className="flex-1">
          <a
            href="#"
            className="text-xs sm:text-sm text-gra relative flex items-center justify-center gap-2 rounded-lg bg-secondary-color px-3 py-2 shadow hover:text-gray-700 whitespace-nowrap"
          >
            Latest
          </a>
        </li>
        <li className="flex-1">
          <a
            href="#"
            className="text-xs sm:text-sm flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-gray-500 hover:text-gray-300 hover:shadow whitespace-nowrap"
          >
            Popular
          </a>
        </li>
        <li className="flex-1">
          <a
            href="#"
            className="text-xs sm:text-sm flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-gray-500 hover:text-gray-300 hover:shadow whitespace-nowrap"
          >
            Most viewed
          </a>
        </li>
      </ul>
    </div>
  );
};

export default TabMenu;
