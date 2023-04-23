import { LikeType } from "@prisma/client";

const likeConvert = {
  like: LikeType.LIKE,
  love: LikeType.LOVE,
  laugh: LikeType.LAUGH,
  wow: LikeType.WOW,
  dislike: LikeType.DISLIKE,
};

export const convertListLike = (
  tag: "like" | "love" | "laugh" | "wow" | "dislike"
) => {
  return likeConvert[tag];
};
