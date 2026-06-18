"use server";

import { signInFormSchema, SignInInput, SignInError } from "@/libs/validators";
import { z } from "zod";
import { signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

interface ActionState {
  errors?: SignInError;
  success?: boolean;
  message?: string;
}

// sign in with user credentials
export async function signInWithCredentials(
  prevState: ActionState,    
  formData: FormData,
): Promise<ActionState> {
  try {
    const signInData = Object.fromEntries(formData);
    const user = signInFormSchema.safeParse(signInData);
    if (!user.success) {
      const errors = z.flattenError(user.error).fieldErrors;
      return { errors };
    }
    console.log(user.data.email)
    await signIn("credentials", {
      email: user.data.email,
      password: user.data.password,
      redirectTo: "/products"
    });
    return { success: true, message: "Signed in Successfully" };
  } catch (error) {
    console.log(error);
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: "Invalid email or password" };
  }
}

export async function signOutUser() {
  await signOut();
}
