"use server";
import { loginSchema, registerSchema } from "@/lib/schemas";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

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
    } = await registerSchema.safeParseAsync(formData);

    if (!success) {
      throw schemaError.message;
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
      throw signupError.message;
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
      data: error,
    };
  }
};

export const login = async (formData: FormData): Promise<ActionResponse> => {
  try {
    const {
      success,
      error: schemaError,
      data,
    } = await loginSchema.safeParseAsync(formData);

    if (!success) {
      throw schemaError.message;
    }

    const supabase = await createClient();

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (loginError) {
      throw loginError.message;
    }

    revalidatePath("/", "layout");

    return {
      success: true,
      data: "User logged in successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      data: error,
    };
  }
};
