import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getUser = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  return user;
};

export default getUser;
