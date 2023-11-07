import React, { useState } from "react";
import Link from "next/link";
import { FaceSmileIcon } from "@heroicons/react/24/outline";
import { CurrentProject } from "@/client/models";
import Image from "next/image";
import Pill from "../Pill";
import EmojiPicker from "../EmojiPicker";
import { useStore } from "@/zustand";
import ReactionList from "../ReactionList";
import deleteRequest from "@/client/http/deleteRequest";
import alertMessage from "@/client/toastMessage";
import { User } from "firebase/auth";

const meta = (views: number, likes: any[], comments: any) => {
  const currentViews = `${views} ${views === 1 ? "view" : "views"}`;
  const currentLikes = `${likes.length} ${
    likes.length === 1 ? "reaction" : "reactions"
  }`;
  const currentComments = comments
    ? `| ${comments} ${comments === 1 ? "comment" : "comments"}`
    : "| 0 comments";
  return `${currentViews} | ${currentLikes} ${currentComments}`;
};

const EmojiButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      className="px-2 py-0.5 bg-secondary-color rounded-md flex items-center hover:text-white cursor-pointer text-sm select-none"
      onClick={onClick}
    >
      <FaceSmileIcon className="h-4 w-4" />
    </div>
  );
};

const Card = ({ project }: { project: CurrentProject }) => {
  const [openPicker, setOpenPicker] = useState(false);
  const firebaseUser: User = useStore((state: any) => state.firebaseUser);

  const user = useStore((state) => state.user);
  return (
    <div className="flex flex-col bg-primary-color rounded-lg shadow mt-3">
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
              <div className="text-xs">
                {meta(project.views, project.likes, project._count.comments)}
              </div>
            </div>
            <div className="flex flex-wrap">
              {project.tags.map((tag) => (
                <Pill tag={tag} key={tag} />
              ))}
            </div>
            {project.banner ? (
              <div
                className="w-full h-[150px] rounded-sm mb-3"
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
              <div className="max-h-[150px] mb-3 overflow-hidden text-sm">
                {project.description}
              </div>
            )}
          </div>
        </Link>
        <div className="flex mb-3 h-[30px] items-stretch mt-3">
          {user && project.author.id === user.id && (
            <button
              type="button"
              className="bg-red-800 text-white border border-red-700 font-medium rounded-md text-xs px-5 h-full text-center mr-2 mb-2"
              onClick={async () => {
                const token = await firebaseUser.getIdToken();
                const response = await deleteRequest(
                  `/api/projects/${project.id}`,
                  token
                );
                if (response?.data) {
                  alertMessage("Post deleted!", "success");
                } else {
                  alertMessage("Something went wrong!");
                }
              }}
            >
              Delete
            </button>
          )}
          {user && (
            <EmojiPicker
              id={project.id}
              isSinglePage={false}
              isOpen={openPicker}
              setIsOpen={setOpenPicker}
              url={`/api/projects/${project.id}/like`}
              button={
                <EmojiButton onClick={() => setOpenPicker((prev) => !prev)} />
              }
            />
          )}
          <ReactionList likes={project.likes} isSinglePage={false} />
        </div>
      </div>
    </div>
  );
};

export default Card;
