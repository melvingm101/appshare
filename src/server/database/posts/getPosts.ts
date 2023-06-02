import { prisma } from "..";

const getOrderBy = (sort: string) => {
  switch (sort) {
    case "reacted":
      return {
        likes: {
          _count: "desc",
        },
      };
    case "viewed":
      return {
        views: "desc",
      };
    default:
      return {
        createdAt: "desc",
      };
  }
};

const getPosts = async (sort = "latest") => {
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
        tags: true,
        likes: true,
      },
      orderBy: { ...getOrderBy(sort) },
    });

    return projects;
  } catch (err) {
    return null;
  }
};

export default getPosts;
