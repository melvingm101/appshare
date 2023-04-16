import checkAuth from "@/server/auth/checkAuth";
import createUser from "@/server/database/users/createUser";
import getUser from "@/server/database/users/getUser";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data: any;
  error: string | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ data: null, error: "Method not allowed!" });
  }

  const { email, authorized } = await checkAuth(req);
  if (!authorized) {
    return res.status(401).json({ data: null, error: "Unauthorized!" });
  }

  if (!req.body["name"]) {
    return res
      .status(400)
      .json({ data: null, error: "Invalid parameters passed!" });
  }

  try {
    const user = await getUser(email!);
    if (!user) {
      const user = await createUser(
        email!,
        req.body["name"].replace(/[^a-zA-Z0-9]/g, "")
      );

      return res.status(200).json({ data: user, error: null });
    }

    return res.status(200).json({
      data: user,
      error: null,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      data: null,
      error: "Something went wrong. Please try again later!",
    });
  }
}
