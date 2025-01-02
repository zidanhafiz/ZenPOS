"use server";
import { sendEmail } from "@/lib/emailUtils";
import { hashPassword } from "@/lib/hashUtils";
import { signJWT } from "@/lib/jwt";
import { signupSchema, SignupSchema } from "@/lib/schemas/auth";
import userModels from "@/models/user";
import { ServerActionResponse } from "@/types/server";

export const signup = async (data: SignupSchema): Promise<ServerActionResponse<{ finishUrl: string }>> => {
  try {
    const validation = signupSchema.safeParse(data);

    if (!validation.success) {
      return {
        success: false,
        message: validation.error.message,
      };
    }

    const { firstName, lastName, phone, email, password } = validation.data;

    const isEmailExist = await userModels.getUserByEmail(email);

    if (isEmailExist) {
      return {
        success: false,
        message: "Email is already exist.",
      };
    }

    const hashedPassword = await hashPassword(password);

    const user = await userModels.createUser({
      firstName,
      lastName,
      phone,
      email,
      password: hashedPassword,
    });

    const verifyToken = await signJWT({ id: user.id }, "10 mins");
    const finishToken = await signJWT({ id: user.id }, "10 mins");

    // Encode the tokens to base64
    const verifyTokenBase64 = Buffer.from(verifyToken).toString("base64");
    const finishTokenBase64 = Buffer.from(finishToken).toString("base64");

    // Get the base url
    const verifyUrl = `${process.env.BASE_URL}/api/auth/verify?t=${verifyTokenBase64}`;
    const finishUrl = `${process.env.BASE_URL}/signup/finish?t=${finishTokenBase64}`;

    await sendEmail(
      email,
      "Verify your email",
      `
      <p>You are almost done!</p>
      <p>Please verify your email by clicking on the link below: <a href="${verifyUrl}" target="_blank">Verify</a></p>
      `
    );

    return {
      success: true,
      message: "Success created user.",
      data: { finishUrl },
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong.",
    };
  }
};
