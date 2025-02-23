"use server";
import {
  editAccountSchema,
  loginSchema,
  registerSchema,
  updateUserPasswordSchema,
} from "@/lib/schemas";
import { createClient } from "@/lib/supabase/server";
import { User } from "@/types/user";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

type ActionResponse = {
  success: boolean;
  data?: any;
};

export const signup = async (formData: FormData): Promise<ActionResponse> => {
  try {
    const {
      success,
      error: schemaError,
      data,
    } = await registerSchema.safeParseAsync(Object.fromEntries(formData));

    if (!success) {
      throw Error(schemaError.message);
    }

    const supabase = await createClient();

    const { data: signupData, error: signupError } = await supabase.auth.signUp(
      {
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
          },
        },
      }
    );

    if (signupError) {
      throw signupError;
    }

    revalidatePath("/", "layout");

    return {
      success: true,
      data: signupData.user?.id,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      data: (error as Error).message,
    };
  }
};

export const login = async (formData: FormData): Promise<ActionResponse> => {
  try {
    const {
      success,
      error: schemaError,
      data,
    } = await loginSchema.safeParseAsync(Object.fromEntries(formData));

    if (!success) {
      throw Error(schemaError.message);
    }

    const supabase = await createClient();

    const { data: loginData, error: loginError } =
      await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

    if (loginError) {
      throw loginError;
    }

    const { data: userData, error: userError } = await supabase
      .from("users")
      .select()
      .eq("id", loginData.user.id)
      .single();

    if (userError) {
      throw userError;
    }

    revalidatePath("/", "layout");

    return {
      success: true,
      data: userData,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      data: (error as Error).message,
    };
  }
};

export const resendVerificationEmail = async (
  email: string
): Promise<string> => {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
    });

    if (error) {
      throw Error(error.message);
    }

    return "Verification email sent successfully";
  } catch (error) {
    console.error(error);
    return (error as Error).message;
  }
};

export const logout = async (): Promise<ActionResponse> => {
  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      throw Error(error.message);
    }

    revalidatePath("/", "layout");

    return {
      success: true,
      data: "User logged out successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      data: (error as Error).message,
    };
  }
};

export const getUserData = async (): Promise<User> => {
  try {
    const supabase = await createClient();
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      throw error;
    }

    if (!session) {
      throw Error("User not found");
    }

    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", session.user.id)
      .single();

    if (userError) {
      throw userError;
    }

    return userData;
  } catch (error) {
    console.error(error);
    redirect("/login");
  }
};

export const updateUser = async (
  formData: FormData,
  userId: string
): Promise<ActionResponse> => {
  try {
    const {
      success,
      error: schemaError,
      data,
    } = await editAccountSchema.safeParseAsync(Object.fromEntries(formData));

    if (!success) {
      throw Error(schemaError.message);
    }

    const supabase = await createClient();

    const { error: updateError } = await supabase.auth.updateUser({
      email: data.email,
      data: {
        first_name: data.firstName,
        last_name: data.lastName,
      },
    });

    if (updateError) {
      throw updateError;
    }

    const { data: userData, error: userError } = await supabase
      .from("users")
      .update({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
      })
      .eq("id", userId);

    if (userError) {
      throw userError;
    }

    revalidatePath("/", "layout");
    revalidatePath("/settings", "page");
    revalidateTag("user");

    return {
      success: true,
      data: userData,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      data: (error as Error).message,
    };
  }
};

export const updateUserPassword = async (
  formData: FormData
): Promise<ActionResponse> => {
  try {
    const {
      success,
      error: schemaError,
      data,
    } = await updateUserPasswordSchema.safeParseAsync(
      Object.fromEntries(formData)
    );

    if (!success) {
      throw Error(schemaError.message);
    }

    const supabase = await createClient();

    const { error: updateError } = await supabase.auth.updateUser({
      password: data.newPassword,
    });

    if (updateError) {
      throw updateError;
    }

    return {
      success: true,
      data: "Password updated successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      data: (error as Error).message,
    };
  }
};
