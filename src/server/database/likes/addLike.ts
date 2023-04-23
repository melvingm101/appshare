import { convertListLike } from "@/server/utils/likeConversion";
import { prisma } from "..";

const addLike = async (
  projectId: number,
  email: string,
  isLikePresent: boolean,
  likeType: "like" | "love" | "laugh" | "wow" | "dislike",
  likeId: number | undefined
) => {
  let newLike;
  try {
    if (isLikePresent && likeId) {
      newLike = await prisma.like.update({
        where: {
          id: likeId,
        },
        data: {
          likeType: convertListLike(likeType),
        },
      });
    } else {
      newLike = await prisma.like.create({
        data: {
          likeType: convertListLike(likeType),
          author: {
            connect: {
              email: email,
            },
          },
          project: {
            connect: {
              id: projectId,
            },
          },
        },
      });
    }
  } catch (err) {
    return null;
  }

  return newLike;
};

export default addLike;
