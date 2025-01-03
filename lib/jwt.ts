"use server";
import * as jose from "jose";

const secret = new TextEncoder().encode(process.env.AUTH_SECRET!);
const alg = "HS256";

export type JWTPayload = jose.JWTPayload & { id: string };

export const signJWT = async (payload: JWTPayload, expiresIn: string | number | Date = "10 mins") => {
  try {
    const jwt = await new jose.SignJWT(payload).setExpirationTime(expiresIn).setProtectedHeader({ alg }).sign(secret);
    return jwt;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const verifyJWT = async (token: string): Promise<JWTPayload | null> => {
  try {
    const { payload } = await jose.jwtVerify<JWTPayload>(token, secret);
    return payload;
  } catch (error) {
    console.error(error);
    return null;
  }
};
