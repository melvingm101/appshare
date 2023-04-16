import prisma from "..";

const getPosts = async () => {
  try {
    const projects = await prisma.project.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        banner: true,
        projectUrl: true,
        views: true,
        author: true,
        likes: true,
        tags: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return projects;
  } catch (err) {
    return null;
  }
};

export default getPosts;
