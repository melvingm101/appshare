import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createUser = async (email: string, name: string, photoUrl: string) => {
  const user = await prisma.user.create({
    data: {
      email,
      name,
      photoUrl,
    },
    select: {
      name: true,
      photoUrl: true,
      points: true,
      tagline: true,
    },
  });

  return user;
};

export default createUser;
