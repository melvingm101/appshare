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

const getProjects = async () => {
  const projects = await getPosts();
  if (projects) {
    return { data: projects, error: null, statusCode: 200 };
  } else {
    return {
      data: null,
      error: "Unexpected error, try again later!",
      statusCode: 500,
    };
  }
};

const addProject = async (req: NextApiRequest) => {
  const { email, authorized } = await checkAuth(req);
  if (!authorized) {
    return { data: null, error: "Unauthorized!", statusCode: 401 };
  }

  if (!req.body["title"] || !req.body["description"] || !req.body["tags"]) {
    return {
      data: null,
      error: "Please provide the required fields",
      statusCode: 400,
    };
  }

  let banner = "";
  if (req.body["banner"] && typeof req.body["banner"] === "string") {
    const tempImage = await uploadImage(req.body["banner"]);
    if (tempImage) {
      banner = tempImage;
    } else {
      return {
        data: null,
        error:
          "Something went wrong when uploading the image. Please try again.",
        statusCode: 500,
      };
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
      return { data: project, error: null, statusCode: 200 };
    }

    return {
      data: null,
      error: "Something went wrong. Please try again later",
      statusCode: 500,
    };
  } catch (err) {
    console.log(err);
    return {
      data: null,
      error: "Something went wrong. Please try again later",
      statusCode: 500,
    };
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const response = await addProject(req);
    return res
      .status(response.statusCode)
      .json({ data: response.data, error: response.error });
  } else if (req.method === "GET") {
    const response = await getProjects();
    return res
      .status(response.statusCode)
      .json({ data: response.data, error: response.error });
  } else {
    return res.status(405).json({ data: null, error: "Method not allowed!" });
  }
}
