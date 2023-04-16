import prisma from "..";

const getPost = async (id: number) => {
  try {
    const project = await prisma.project.update({
      where: {
        id,
      },
      data: {
        views: { increment: 1 },
      },
    });
    return project;
  } catch (err) {
    return null;
  }
};

export default getPost;
