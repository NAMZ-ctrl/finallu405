import SignIn from "@/components/auth/sign-in";
import Image from "next/image";
import logo from "@/assets/405logo.png";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export const metadata: Metadata = { title: "Sign In" };

export default async function SignInPage() {
  const session = await auth();
  console.log(session);
  if (session) redirect("/products");

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-muted/30">
      <div className="w-full max-w-3xl grid md:grid-cols-2 rounded-2xl overflow-hidden border border-border shadow-sm bg-background">

        {/* left panel — branding */}
        <div className="hidden md:flex flex-col items-center justify-center gap-5 bg-muted/50 px-10 py-16 text-center">
          <div className="w-16 h-16 rounded-2xl border border-border bg-background flex items-center justify-center overflow-hidden">
            <Image src={logo} width={48} height={48} alt="Clapped logo" className="object-contain" />
          </div>
          <div>
            <p className="text-xl font-bold tracking-widest uppercase">405</p>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed max-w-45 mx-auto">
              Welcome back to the familia
            </p>
          </div>
        </div>

        {/* right panel — form */}
        <div className="flex flex-col justify-center px-8 py-12">
          {/* mobile logo */}
          <div className="flex items-center gap-3 mb-8 md:hidden">
            <Image src={logo} width={36} height={36} alt="405 logo" />
            <span className="font-bold tracking-widest uppercase">405</span>
          </div>

          <h1 className="text-xl font-semibold mb-1">Sign in</h1>
          <p className="text-sm text-muted-foreground mb-7">
            Enter your details to continue
          </p>

          <SignIn />

          <p className="text-xs text-center text-muted-foreground mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="text-foreground font-medium underline underline-offset-2">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}