import React, { useEffect } from "react";
import getPost from "@/server/database/posts/getPost";
import { CurrentProject } from "@/client/models";
import { GetServerSideProps } from "next/types";
import PageHead from "@/components/PageHead";
import Image from "next/image";
import CreateComment from "@/components/CreateComment";
import Breadcrumb from "@/components/Breadcrumb";
import { initializeStore } from "@/zustand";
import { useStore } from "@/zustand";
import EmojiPicker from "@/components/EmojiPicker";
import ReactionList from "@/components/ReactionList";

const ViewProject = ({ project }: { project: CurrentProject }) => {
  const currentProject = useStore((state) => state.showPost);
  const setShowPost = useStore((state) => state.setShowPost);
  const user = useStore((state) => state.user);

  useEffect(() => {
    if (project && project !== currentProject) {
      setShowPost(project);
    }
  }, []);

  return (
    <div className="my-5 mx-auto max-w-screen-md">
      <PageHead
        title={currentProject.title}
        description={project.description}
      />
      <Breadcrumb title={currentProject.title} />
      {currentProject.banner ? (
        <div className="w-full h-[300px] pb-3 relative">
          <Image
            alt={currentProject.title}
            src={currentProject.banner}
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-full object-cover rounded-none sm:rounded-3xl"
          />
          <div className="w-full h-[300px] z-2 bg-gradient-to-t from-[#0f0f13] absolute bottom-0 left-0 rounded-none sm:rounded-3xl"></div>
          <div className="absolute bottom-8 left-8">
            <h5 className="text-3xl font-bold text-gray-900 dark:text-white text-left">
              {currentProject.title}
            </h5>
            <div className="text-sm">
              {currentProject.views} views | {currentProject.likes.length}{" "}
              reactions
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-[300px] rounded-none sm:rounded-3xl pb-3 relative bg-gradient-to-b from-cyan-500 to-blue-700">
          <div className="absolute bottom-8 left-8 w-3/4">
            <h5 className="text-2xl font-bold text-gray-900 dark:text-white text-left whitespace-nowrap text-ellipsis overflow-hidden">
              {currentProject.title}
            </h5>
            <div className="text-sm">
              {currentProject.views} views | {currentProject.likes.length}{" "}
              reactions
            </div>
          </div>
        </div>
      )}
      <div className="mt-8 mx-auto max-w-screen-md">
        <div className="mx-8">
          <div>{currentProject.description}</div>
        </div>
      </div>
      <div className="flex mx-8 mt-5 h-8 mb-2">
        {user && <EmojiPicker id={currentProject.id} isSinglePage />}
        <ReactionList likes={currentProject.likes} isSinglePage />
      </div>
      <CreateComment />
      <div className="flex flex-col justify-center items-center mt-8">
        <Image
          alt="No comments"
          src={"/no-comment.svg"}
          width="150"
          height="150"
        />
        <h3 className="text-gray-500">No comments</h3>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (params && params.id && typeof params.id === "string") {
    const project = await getPost(parseInt(params.id));
    const zustandStore = initializeStore();
    if (project) {
      zustandStore.getState().setShowPost(project);
      return {
        props: {
          initialZustandState: JSON.parse(
            JSON.stringify(zustandStore.getState())
          ),
          project: project,
        },
      };
    }
  }

  return {
    props: {
      notFound: true,
    },
  };
};

export default ViewProject;
