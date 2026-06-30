"use server";

import {
  signInFormSchema,
  SignInInput,
  SignInError,
  ShippingAddress,
  ShippingAddressSchema,
  SignUpError,
  SignUpSchema,
} from "@/libs/validators";
import { success, z } from "zod";
import { auth, signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { prisma } from "@/db/db";
import { hash, hashSync } from "bcrypt-ts-edge";

interface ActionState {
  errors?: SignInError;
  success?: boolean;
  message?: string;
}

// types/index.ts or validators.ts
type SignUpFieldErrors = {
  name?: string[] | undefined;
  email?: string[] | undefined;
  password?: string[] | undefined;
  confirmPassword?: string[] | undefined;
};

export type SignUpActionState =
  | {}                                                          // ← initial empty state
  | { errors: SignUpFieldErrors; success?: undefined; message?: undefined }
  | { success: boolean; message: string; errors?: undefined };

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
    console.log(user.data.email);
    await signIn("credentials", {
      email: user.data.email,
      password: user.data.password,
      redirectTo: "/products",
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

// sign up user
export async function signUpUser(
  prevState: SignUpActionState,
  formData: FormData,
) {
  try {
    const SignUpData = Object.fromEntries(formData);
    const newUser = SignUpSchema.safeParse(SignUpData);

    if (!newUser.success) {
      const errors = z.flattenError(newUser.error).fieldErrors;
      return { errors };
    }

    // ✅ check if email already exists
    const existingUser = await prisma.user.findFirst({
      where: { email: newUser.data.email },
    });
    if (existingUser) {
      return {
        success: false,
        message: "email aready exists",
      };
    }

    // keep plain password before hashing for auto sign-in
    const plainPassword = newUser.data.password;
    const hashedPassword = hashSync(plainPassword, 10);

    await prisma.user.create({
      data: {
        name: newUser.data.name,
        email: newUser.data.email,
        password: hashedPassword,  // ✅ don't mutate newUser.data directly
      },
    });

    // ✅ sign in after successful registration
    await signIn("credentials", {
      email: newUser.data.email,
      password: plainPassword,
    });

    return { success: true, message: "Account created successfully" };
  } catch (error) {
    // ✅ always rethrow redirect errors — next-auth needs them
    if (isRedirectError(error)) throw error;

    console.error("signUpUser error:", error);
    return { success: false, message: "Something went wrong. Please try again." };
  }
}

// Get user by ID
export async function GetUserById(userId: string) {
  const user = await prisma.user.findFirst({
    where: { id: userId },
  });
  if (!user) throw new Error("user not found");
  return user;
}

// update the user address
export async function updateUserAddress(data: ShippingAddress) {
  try {
    const session = await auth();

    const currentUser = await prisma.user.findFirst({
      where: { id: session?.user?.id },
    });

    if (!currentUser) {
      throw new Error("user not found");
    }

    const address = ShippingAddressSchema.safeParse(data);
    if (!address.success) {
      const errors = z.flattenError(address.error).fieldErrors;
      return { errors };
    }
    await prisma.user.update({
      where: { id: currentUser.id },
      data: { address: address.data },
    });

    return {
      success: true,
      error: "user updated successfully",
    };
  } catch (error) {
    return { success: false, message: error };
  }
}
