import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";

const userModels = {
  async getUserById(id: string) {
    try {
      const user = await prisma.user.findUnique({ where: { id } });
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

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

  async createUser(data: Partial<User>) {
    try {
      const user = await prisma.user.create({
        data: {
          firstName: data.firstName!,
          lastName: data.lastName!,
          phone: data.phone!,
          email: data.email!,
          password: data.password!,
          isVerified: false,
        },
      });
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async updateUser(id: string, data: Partial<User>) {
    try {
      const user = await prisma.user.update({ where: { id }, data });
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

export default userModels;
