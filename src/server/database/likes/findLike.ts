import { prisma } from "..";

const findLike = async (id: number, email: string) => {
  const like = await prisma.like.findFirst({
    where: {
      project: {
        id: id,
      },
      author: {
        email: email,
      },
    },
  });

  return like;
};

export default findLike;
