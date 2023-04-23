// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import checkAuth from "@/server/auth/checkAuth";
import { prisma } from "@/server/database";
import addLike from "@/server/database/likes/addLike";
import findLike from "@/server/database/likes/findLike";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data: any;
  error: string | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ data: null, error: "Method not allowed!" });
  }

  const { email, authorized } = await checkAuth(req);
  if (!authorized) {
    return res.status(401).json({ data: null, error: "Unauthorized!" });
  }

  if (!req.body["like"]) {
    return res.status(400).json({
      data: null,
      error: "Please provide the required fields",
    });
  }

  try {
    const { id } = req.query;
    if (typeof id === "string") {
      const like = await findLike(parseInt(id), email!);

      const newLike = await addLike(
        parseInt(id),
        email!,
        !!like,
        req.body["like"],
        like?.id
      );
      if (newLike) {
        const project = await prisma.project.findFirst({
          where: {
            id: parseInt(id),
          },
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
        });

        return res.status(200).json({
          data: project,
          error: null,
        });
      }
    }

    return res.status(500).json({
      data: null,
      error: "Something went wrong. Please try again later!",
    });
  } catch (err) {
    return res.status(500).json({
      data: null,
      error: "Something went wrong. Please try again later",
    });
  }
}
