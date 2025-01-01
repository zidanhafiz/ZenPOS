import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./lib/schemas/auth";
import userModels from "./models/user";
import { verifyPassword } from "./lib/hashUtils";

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = loginSchema.safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await userModels.getUserByEmail(email);

          if (!user) {
            console.error("User not found");
            return null;
          }

          const isPasswordValid = verifyPassword(password, user.password);

          if (isPasswordValid) return { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName };
        }
        console.error("Invalid credentials", parsedCredentials.error);
        return null;
      },
    }),
  ],
});
