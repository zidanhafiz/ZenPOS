import { compareSync, hashSync } from "bcrypt";

export const hashPassword = (password: string) => {
  return hashSync(password, 10);
};

export const verifyPassword = (password: string, hashedPassword: string) => {
  return compareSync(password, hashedPassword);
};
