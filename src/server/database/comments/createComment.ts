import { prisma } from "..";

const createComment = async (
  body: string,
  email: string,
  projectId: string
) => {
  try {
    const comment = await prisma.comment.create({
      data: {
        body,
        author: {
          connect: {
            email,
          },
        },
        project: {
          connect: {
            id: parseInt(projectId),
          },
        },
      },
    });

    return comment;
  } catch (err) {
    return null;
  }
};

export default createComment;
