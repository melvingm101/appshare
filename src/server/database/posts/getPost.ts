import { prisma } from "..";

const getPost = async (id: number) => {
  try {
    const project = await prisma.project.update({
      where: {
        id,
      },
      data: {
        views: { increment: 1 },
      },
      select: {
        id: true,
        title: true,
        description: true,
        projectUrl: true,
        tags: true,
        banner: true,
        views: true,
        likes: true,
      },
    });
    return project;
  } catch (err) {
    return null;
  }
};

export default getPost;
