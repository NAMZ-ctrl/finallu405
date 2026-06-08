import SignIn from "@/components/auth/sign-in";
import Image from "next/image";
import logo from "@/assets/405logo.png"
import { Metadata } from "next";

export const MetaData: Metadata = {
  title: "Sign In",
};

export default function SignInPage() {
  return (
    <>
      <div className="">
        <div>
            <Image src={logo} width={200} height={50} alt="405"/>
        </div>
        <div>Welcome again, to the familia</div>
        <SignIn/>
      </div>
    </>
  );
}
