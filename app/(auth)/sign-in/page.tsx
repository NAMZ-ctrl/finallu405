import SignIn from "@/components/auth/sign-in";
import Image from "next/image";
import logo from "@/assets/405logo.png";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export const MetaData: Metadata = {
  title: "Sign In",
};

export default async function SignInPage() {
  const session = await auth();

  if (session) {
    redirect("/products");
  }

  return (
    <>
      <div className="h-fit">
        <div>
          <Image src={logo} width={200} height={50} alt="405" />
        </div>
        <div>Welcome again, to the familia</div>
        <SignIn />
        <div className="flex">
          <span>Don't have an account?</span>
          <Link className="text-red" href="/sign-up">
            Sign Up
          </Link>
        </div>
      </div>
    </>
  );
}
