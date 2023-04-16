import checkAuth from "@/server/auth/checkAuth";
import uploadImage from "@/server/cloudinary/uploadImage";
import createPost from "@/server/database/posts/createPost";
import getPosts from "@/server/database/posts/getPosts";
import { convertListTags } from "@/server/utils/tagsConversion";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data: any;
  error: string | null;
};

const getProjects = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const projects = await getPosts();
  if (projects) {
    return res.status(200).json({ data: projects, error: null });
  } else {
    return res
      .status(500)
      .json({ data: null, error: "Unexpected error, try again later!" });
  }
};

const addProject = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { email, authorized } = await checkAuth(req);
  if (!authorized) {
    return res.status(401).json({ data: null, error: "Unauthorized!" });
  }

  if (!req.body["title"] || !req.body["description"] || !req.body["tags"]) {
    return res
      .status(400)
      .json({ data: null, error: "Please provide the required fields" });
  }

  let banner = "";
  if (req.body["banner"] && typeof req.body["banner"] === "string") {
    const tempImage = await uploadImage(req.body["banner"]);
    if (tempImage) {
      banner = tempImage;
    } else {
      return res.status(500).json({
        data: null,
        error:
          "Something went wrong when uploading the image. Please try again.",
      });
    }
  }

  try {
    const project = await createPost(
      req.body["title"],
      req.body["description"],
      req.body["projectUrl"],
      convertListTags(req.body["tags"]),
      req.body["videoUrl"],
      banner,
      email!
    );

    if (project) {
      return res.status(200).json({ data: project, error: null });
    }

    return res.status(200).json({
      data: null,
      error: "Something went wrong. Please try again later.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      data: null,
      error: "Something went wrong. Please try again later!",
    });
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    addProject(req, res);
  } else if (req.method === "GET") {
    getProjects(req, res);
  } else {
    return res.status(405).json({ data: null, error: "Method not allowed!" });
  }
}
