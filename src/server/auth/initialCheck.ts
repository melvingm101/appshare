import { NextApiRequest } from "next/types";
import checkAuth from "./checkAuth";

export type RequiredFieldError = {
  error: string;
  fieldName: string;
};

/**
 * This function checks if correct method is used, if the user is authenticated and if required fields are present.
 *
 * @param {NextApiRequest} req - The request object
 * @param {string[]} methods - List of methods which are allowed ("GET", "POST", "PUT", "PATCH", "DELETE")
 * @param {RequiredFieldError[]} - List of required fields with names and errors if the field is empty
 * @return {string} A good string
 *
 * @example
 *  initialCheck(req, ["GET", "POST"], [{ fieldName: "body", error: "Body is missing!" }])
 */
export const initialCheck = async (
  req: NextApiRequest,
  methods: string[],
  requiredFields: RequiredFieldError[]
) => {
  // Check if correct method is used
  for (let i = 0; i < methods.length; i++) {
    if (req.method !== methods[i]) {
      return { email: null, error: "Method not allowed!", statusCode: 405 };
    }
  }

  // Check if user is authenticated
  const { email, authorized } = await checkAuth(req);
  if (!authorized) {
    return { email: null, error: "Unauthorized!", statusCode: 401 };
  }

  // Check if the required fields are present
  for (let i = 0; i < requiredFields.length; i++) {
    if (!req.body[requiredFields[i].fieldName]) {
      return {
        email: null,
        error: requiredFields[i].error,
        statusCode: 400,
      };
    }
  }

  return { email, error: null, statusCode: null };
};
