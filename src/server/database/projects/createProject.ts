import { Tags } from "@prisma/client";
import { prisma } from "..";

const createProject = async (
  title: string,
  description: string,
  projectUrl: string,
  tags: Tags[],
  videoUrl: string,
  banner: string,
  email: string
) => {
  try {
    const project = await prisma.project.create({
      data: {
        title,
        description,
        projectUrl,
        tags,
        videoUrl,
        banner,
        author: {
          connect: {
            email,
          },
        },
      },
    });

    return project;
  } catch (err) {
    return null;
  }
};

export default createProject;
