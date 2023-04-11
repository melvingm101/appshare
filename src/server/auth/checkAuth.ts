import type { NextApiRequest, NextApiResponse } from "next";
import auth from "./firebaseAdmin";

const checkAuth = async (req: NextApiRequest) => {
  if (!req.headers.authorization) {
    return { email: null, authorized: false };
  }

  let currentEmail = "";

  try {
    const { email } = await auth.verifyIdToken(req.headers.authorization);
    if (!email) {
      return { email: null, authorized: false };
    }

    currentEmail = email;
  } catch (error) {
    return { email: null, authorized: false };
  }

  return { email: currentEmail, authorized: true };
};

export default checkAuth;
