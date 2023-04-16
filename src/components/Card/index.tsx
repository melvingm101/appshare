import React from "react";
import Link from "next/link";
import { CurrentProject } from "@/client/models";
import Image from "next/image";
import {
  EyeIcon,
  HandThumbUpIcon,
  HeartIcon,
  HandThumbDownIcon,
  FaceSmileIcon,
  FireIcon,
} from "@heroicons/react/24/outline";
import Pill from "../Pill";

const Card = ({ project }: { project: CurrentProject }) => {
  return (
    <div className="flex flex-col bg-primary-color rounded-lg shadow mt-3">
      <div className="px-4">
        <Link href={`/projects/${project.id}`}>
          <div className="hover:underline">
            <div className="flex flex-col justify-between pt-4 pb-2 leading-normal">
              <h5 className="mb-2 text-lg font-bold text-gray-900 dark:text-white text-left whitespace-nowrap overflow-hidden text-ellipsis">
                {project.title}
              </h5>
            </div>
            {project.banner ? (
              <div className="w-full h-[160px] rounded-sm pb-3">
                <Image
                  alt={project.title}
                  src={project.banner}
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            ) : (
              <div className="h-[160px] mb-3 overflow-hidden text-ellipsis text-sm">
                {project.description}
              </div>
            )}
          </div>
          <div>
            {project.tags.map((tag, index) => (
              <Pill tag={tag} key={index} />
            ))}
          </div>
        </Link>
        <div className="flex text-sm text-gray-500 mr-2">
          <div className="mt-2 py-0.5 px-2 bg-secondary-color rounded-md flex items-center">
            <EyeIcon className="h-4 w-4 mr-1" />
            {project.views}
          </div>
        </div>
        <div className="flex mb-3">
          <div className="flex text-sm text-gray-500 mr-2">
            <div className="mt-2 py-0.5 px-2 bg-secondary-color rounded-md flex items-center hover:text-white cursor-pointer">
              <HandThumbUpIcon className="h-4 w-4 mr-1" />
              {project.likes.length}
            </div>
          </div>
          <div className="flex text-sm text-gray-500 mr-2">
            <div className="mt-2 py-0.5 px-2 bg-secondary-color rounded-md flex items-center hover:text-white cursor-pointer">
              <HandThumbDownIcon className="h-4 w-4 mr-1" />
              {project.likes.length}
            </div>
          </div>
          <div className="flex text-sm text-gray-500 mr-2">
            <div className="mt-2 py-0.5 px-2 bg-secondary-color rounded-md flex items-center hover:text-white cursor-pointer">
              <HeartIcon className="h-4 w-4 mr-1" />
              {project.likes.length}
            </div>
          </div>
          <div className="flex text-sm text-gray-500 mr-2">
            <div className="mt-2 py-0.5 px-2 bg-secondary-color rounded-md flex items-center hover:text-white cursor-pointer">
              <FaceSmileIcon className="h-4 w-4 mr-1" />
              {project.likes.length}
            </div>
          </div>
          <div className="flex text-sm text-gray-500 mr-2">
            <div className="mt-2 py-0.5 px-2 bg-secondary-color rounded-md flex items-center hover:text-white cursor-pointer">
              <FireIcon className="h-4 w-4 mr-1" />
              {project.likes.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
