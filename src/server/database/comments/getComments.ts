import { prisma } from "..";

const getComments = async (projectId: string) => {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        projectId: parseInt(projectId),
      },
      orderBy: {
        CommentLike: {
          _count: "desc",
        },
      },
      include: {
        author: true,
        CommentLike: true,
      },
    });

    return comments;
  } catch (err) {
    return null;
  }
};

export default getComments;
