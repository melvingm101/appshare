import Link from "next/link";
import React from "react";

const Breadcrumb = ({ title }: { title: string }) => {
  return (
    <nav className="flex mb-3 mx-8" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1">
        <li className="inline-flex items-center">
          <Link
            href="/"
            className="inline-flex items-center text-xs font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
          >
            <svg
              aria-hidden="true"
              className="w-3 h-3 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
            </svg>
            Home
          </Link>
        </li>
        <li aria-current="page">
          <div className="flex items-center">
            <svg
              aria-hidden="true"
              className="w-3 h-3 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="ml-1 text-xs font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap overflow-hidden text-ellipsis w-[200px]">
              {title}
            </span>
          </div>
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;