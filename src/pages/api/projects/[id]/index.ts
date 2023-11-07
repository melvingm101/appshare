import { initialCheck } from "@/server/auth/initialCheck";
import deleteProject from "@/server/database/projects/deleteProject";
import getProject from "@/server/database/projects/getProject";
import getUser from "@/server/database/users/getUser";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data: string | null;
  error: string | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { email, error, statusCode } = await initialCheck(req, ["DELETE"], []);
  if (error) {
    return res.status(statusCode).json({
      data: null,
      error: error,
    });
  }

  try {
    const { id } = req.query;
    const user = await getUser(email!);
    if (user && typeof id === "string") {
      const project = await getProject(parseInt(id));
      if (!project) {
        return res.status(400).json({
          data: null,
          error: "Not found!",
        });
      }

      if (project.author.id !== user.id) {
        return res.status(401).json({
          data: null,
          error: "Not authorized!",
        });
      }

      const isProjectDeleted = await deleteProject(project.id);
      if (isProjectDeleted) {
        return res.status(200).json({
          data: "Project deleted!",
          error: null,
        });
      }
    }
  } catch (err) {
    return res.status(500).json({
      data: null,
      error: "Something went wrong. Please try again later!",
    });
  }

  return res.status(500).json({
    data: null,
    error: "Something went wrong. Please try again later!",
  });
}
