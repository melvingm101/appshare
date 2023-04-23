import { prisma } from "..";

const createUser = async (email: string, name: string) => {
  const user = await prisma.user.create({
    data: {
      email,
      name,
    },
    select: {
      id: true,
      name: true,
      photoUrl: true,
      points: true,
      tagline: true,
    },
  });

  return user;
};

export default createUser;
