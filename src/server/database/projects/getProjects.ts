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

const getProjects = async (sort = "latest") => {
  try {
    const projects = await prisma.project.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        banner: true,
        views: true,
        tags: true,
        likes: true,
        author: true,
        _count: {
          select: { comments: true },
        },
      },
      orderBy: { ...getOrderBy(sort) },
    });

    return projects;
  } catch (err) {
    return null;
  }
};

export default getProjects;
