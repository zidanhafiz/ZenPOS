"use server";
import { sendEmail } from "@/lib/emailUtils";
import { hashPassword } from "@/lib/hashUtils";
import { JWTPayload, signJWT, verifyJWT } from "@/lib/jwt";
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
    const finishUrl = `${process.env.BASE_URL}/signup/verify?t=${finishTokenBase64}`;

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

export const verifyToken = async (token: string): Promise<ServerActionResponse<JWTPayload>> => {
  if (!token) {
    console.error("Token is required, redirecting to home page.");
    return {
      success: false,
      message: "Token is required.",
    };
  }

  try {
    const decodedToken = Buffer.from(token, "base64").toString("utf-8");
    const jwtPayload = await verifyJWT(decodedToken);

    if (!jwtPayload) {
      console.error("Invalid token, redirecting to home page.");
      return {
        success: false,
        message: "Invalid token.",
      };
    }

    const user = await userModels.getUserById(jwtPayload.id);

    if (!user) {
      console.error(`User ${jwtPayload.id} not found, redirecting to home page.`);
      return {
        success: false,
        message: "User not found.",
      };
    }

    if (user.isVerified) {
      console.log(`User ${jwtPayload.id} already verified, redirecting to home page.`);
      return {
        success: false,
        message: "User already verified.",
      };
    }

    return {
      success: true,
      message: "Success verified token.",
      data: jwtPayload,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong.",
    };
  }
};

export const createVerifyToken = async (userId: string) => {
  try {
    const token = await signJWT({ id: userId }, "10 mins");
    const tokenBase64 = Buffer.from(token).toString("base64");
    return tokenBase64;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const resendVerifyEmail = async (userId: string) => {
  try {
    const user = await userModels.getUserById(userId);

    if (!user) {
      console.error(`User ${userId} not found.`);
      return {
        success: false,
        message: "User not found.",
      };
    }

    const token = await createVerifyToken(userId);

    if (!token) {
      console.error(`Failed to create verify token for user ${userId}.`);
      return {
        success: false,
        message: "Failed to create verify token.",
      };
    }

    const verifyUrl = `${process.env.BASE_URL}/api/auth/verify?t=${token}`;
    await sendEmail(
      user.email,
      "Verify your email",
      `
      <p>You are almost done!</p>
      <p>Please verify your email by clicking on the link below: <a href="${verifyUrl}" target="_blank">Verify</a></p>
      `
    );

    return {
      success: true,
      message: "Success resended email.",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong.",
    };
  }
};
