import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import getPost from "@/server/database/posts/getPost";
import { CurrentProject } from "@/client/models";
import { GetServerSideProps } from "next/types";
import PageHead from "@/components/PageHead";
import CreateComment from "@/components/CreateComment";
import { initializeStore } from "@/zustand";
import { useStore } from "@/zustand";
import EmojiPicker from "@/components/EmojiPicker";
import ReactionList from "@/components/ReactionList";
import Banner from "@/components/Banner";
import getComments from "@/server/database/comments/getComments";
import CommentCard from "@/components/CommentCard";
import { Comment } from "@prisma/client";
import LikeButton from "@/components/LikeButton";

const ViewProject = ({
  project,
  comments,
}: {
  project: CurrentProject;
  comments: Comment[];
}) => {
  const [openPicker, setOpenPicker] = useState(false);
  const currentProject = useStore((state) => state.showPost);
  const setShowPost = useStore((state) => state.setShowPost);
  const user = useStore((state) => state.user);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (project && project !== currentProject) {
      setShowPost(project);
    }
  }, []);

  return (
    <div className="my-5 mx-auto max-w-screen-md w-full">
      <PageHead
        title={currentProject.title}
        description={project.description}
      />
      <Banner
        title={currentProject.title}
        banner={currentProject.banner}
        views={currentProject.views}
        numLikes={currentProject.likes.length}
      />
      <div className="mt-8 mx-auto max-w-screen-md">
        <div className="mx-8">
          <div>{currentProject.description}</div>
        </div>
      </div>
      <div className="mx-8 mt-4">
        <div>
          <div className="text-sm flex items-stretch space-between mb-3">
            <EmojiPicker
              id={project.id}
              isSinglePage={true}
              isOpen={openPicker}
              setIsOpen={setOpenPicker}
              url={`/api/posts/${project.id}/like`}
              button={
                <LikeButton onClick={() => setOpenPicker((prev) => !prev)} />
              }
            />

            <ReactionList likes={currentProject.likes} isSinglePage={true} />
          </div>
        </div>
      </div>

      {typeof id === "string" && !isNaN(parseInt(id))
        ? user && <CreateComment id={parseInt(id)} />
        : null}
      {comments.map((comment) => (
        <CommentCard comment={comment} projectId={currentProject.id} />
      ))}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (params && params.id && typeof params.id === "string") {
    const project = await getPost(parseInt(params.id));
    const comments = await getComments(params.id);
    const zustandStore = initializeStore();
    if (project) {
      zustandStore.getState().setShowPost(project);
      return {
        props: {
          initialZustandState: JSON.parse(
            JSON.stringify(zustandStore.getState())
          ),
          project: project,
          comments: comments?.map((comment) => ({
            ...comment,
            createdAt: comment.createdAt.toISOString(),
          })),
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
