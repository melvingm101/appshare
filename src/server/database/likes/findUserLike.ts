import { prisma } from "..";

const findUserLike = async (email: string, projectId: number) => {
  const userLike = await prisma.like.findFirst({
    where: {
      author: {
        email: email,
      },
      project: {
        id: projectId,
      },
    },
  });

  return userLike;
};

export default findUserLike;
