import { prisma } from "../../util/db.js";

const createUser = async (user: {
  name: string;
  email: string;
  password: string;
}) => {
  const result = await prisma.user.create({
    data: user,
  });
  return result;
};

const findUser = async (userEmail: string) => {
  const result = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });
  return result;
};


export default { createUser, findUser };
