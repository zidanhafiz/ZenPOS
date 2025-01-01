import { prisma } from "@/lib/prisma";

const userModels = {
  async getUserByEmail(email: string) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

export default userModels;
