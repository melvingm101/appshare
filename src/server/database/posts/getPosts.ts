import { prisma } from "..";

const getPosts = async (sort: string | null | undefined) => {
  const orderBy =
    sort === "latest"
      ? {
          createdAt: "desc",
        }
      : sort === "viewed"
      ? {
          views: "desc",
        }
      : {
          likes: {
            _count: "desc",
          },
        };
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
      orderBy: { ...orderBy },
    });

    return projects;
  } catch (err) {
    return null;
  }
};

export default getPosts;
