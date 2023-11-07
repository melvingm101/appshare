// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { initialCheck } from "@/server/auth/initialCheck";
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
  const { email, error, statusCode } = await initialCheck(
    req,
    ["PATCH"],
    [{ fieldName: "like", error: "An issue occurred when liking the project." }]
  );

  if (error) {
    return res.status(statusCode).json({
      data: null,
      error,
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
            _count: {
              select: { comments: true },
            },
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
