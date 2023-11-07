import { Comment } from "@prisma/client";
import React from "react";
import Avatar from "../Avatar";
import EmojiPicker from "../EmojiPicker";
import ReactionList from "../ReactionList";
import { useStore } from "@/zustand";

const CommentCard = ({
  comment,
  projectId,
}: {
  comment: Comment;
  projectId: number;
}) => {
  const user = useStore((state) => state.user);

  return (
    <div className="mx-8 bg-primary-color rounded-lg shadow mt-3 p-4">
      <div className="flex space-x-4">
        <div className="flex-shrink-0">
          <Avatar src={comment.author.photoUrl} name={comment.author.name} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            {comment.author.name}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            {comment.body}
          </p>
          {user && (
            <EmojiPicker
              id={comment.id}
              isSinglePage={false}
              url={`/api/projects/${projectId}/comments/${comment.id}/like`}
            />
          )}
          {/* <ReactionList likes={comment.CommentLikes} isSinglePage={false} /> */}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
