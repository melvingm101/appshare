// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { initialCheck } from "@/server/auth/initialCheck";
import createComment from "@/server/database/comments/createComment";
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
    ["POST"],
    [{ fieldName: "body", error: "The comment cannot be empty!" }]
  );

  if (error) {
    return res.status(statusCode).json({
      data: null,
      error: error,
    });
  }

  try {
    const { id } = req.query;
    if (typeof id === "string") {
      const comment = await createComment(req.body["body"], email!, id);
      if (comment) {
        return res.status(200).json({ data: comment, error: null });
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
