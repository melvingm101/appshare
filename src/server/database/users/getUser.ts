import { prisma } from "..";

const getUser = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
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

export default getUser;
