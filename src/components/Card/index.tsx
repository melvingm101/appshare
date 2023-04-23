import React from "react";
import Link from "next/link";
import { CurrentProject } from "@/client/models";
import Image from "next/image";
import Pill from "../Pill";
import EmojiPicker from "../EmojiPicker";
import { useStore } from "@/zustand";
import ReactionList from "../ReactionList";

const Card = ({ project }: { project: CurrentProject }) => {
  const user = useStore((state) => state.user);
  return (
    <div className="flex flex-col bg-primary-color rounded-lg shadow mt-3 h-[310px]">
      <div className="px-4 flex flex-col justify-between h-full">
        <Link href={`/projects/${project.id}`}>
          <div>
            <div className="flex flex-col justify-between pt-4 pb-2 leading-normal hover:underline">
              <h5
                className="text-lg font-bold text-gray-900 dark:text-white text-left whitespace-nowrap overflow-hidden text-ellipsis"
                data-testid="card-title"
              >
                {project.title}
              </h5>
              <div className="text-xs">{`${project.views} ${
                project.views === 1 ? "view" : "views"
              } | ${project.likes.length} ${
                project.likes.length === 1 ? "reaction" : "reactions"
              }`}</div>
            </div>
            {project.banner ? (
              <div
                className="w-full h-[130px] rounded-sm mb-3"
                data-testid="card-banner"
              >
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
              <div className="h-[130px] mb-3 overflow-hidden text-ellipsis text-sm">
                {project.description}
              </div>
            )}
          </div>
          <div className="flex flex-wrap">
            {project.tags.map((tag) => (
              <Pill tag={tag} key={tag} />
            ))}
          </div>
        </Link>
        <div className="flex">
          {user && <EmojiPicker id={project.id} isSinglePage={false} />}
          <ReactionList likes={project.likes} isSinglePage={false} />
        </div>
      </div>
    </div>
  );
};

export default Card;
