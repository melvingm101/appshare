// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import checkAuth from "@/server/auth/checkAuth";
import uploadImage from "@/server/cloudinary/uploadImage";
import createUser from "@/server/database/users/createUser";
import getUser from "@/server/database/users/getUser";
import { botttsNeutral } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data: any;
  error: string | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
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
      const avatar = createAvatar(botttsNeutral, {
        size: 128,
        backgroundType: ["solid"],
        eyes: [
          "bulging",
          "dizzy",
          "eva",
          "frame1",
          "frame2",
          "happy",
          "robocop",
          "roundFrame01",
          "roundFrame02",
          "shade01",
        ],
      }).toDataUriSync();

      const uploadedAvatar = await uploadImage(avatar);

      if (uploadedAvatar) {
        const user = await createUser(
          email!,
          req.body["name"].replace(/[^a-zA-Z0-9]/g, ""),
          uploadedAvatar
        );

        return res.status(200).json({ data: user, error: null });
      }

      return res.status(500).json({
        data: null,
        error: "Something went wrong. Please try again later!",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      data: null,
      error: "Something went wrong. Please try again later!",
    });
  }
}
