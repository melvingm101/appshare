import { prisma } from "..";

const deleteProject = async (projectId: number | undefined) => {
  try {
    const deletedProject = await prisma.project.delete({
      where: {
        id: projectId,
      },
    });

    if (deletedProject) {
      return true;
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
};

export default deleteProject;
