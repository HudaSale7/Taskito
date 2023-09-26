import jwt from "jsonwebtoken";
import "dotenv/config";

export const getUser = async ({ req }: { req: any }) => {
  const token = req.headers.authorization || "";
  if (token) {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY as string);
    return { user: decodedToken };
  }
  return { user: null };
};
