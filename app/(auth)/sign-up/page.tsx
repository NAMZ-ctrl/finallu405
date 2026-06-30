// app/sign-up/page.tsx
import SignUp from "@/components/auth/sign-up";
import Image from "next/image";
import logo from "@/assets/405logo.png";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export const metadata: Metadata = { title: "Sign Up" };

export default async function SignUpPage() {
  const session = await auth();
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
            <p className="text-xl font-bold tracking-widest uppercase">Clapped</p>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed max-w-45 mx-auto">
              Join the familia. Create your account today.
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

          <h1 className="text-xl font-semibold mb-1">Create account</h1>
          <p className="text-sm text-muted-foreground mb-7">
            Fill in your details to get started
          </p>

          <SignUp />

          <p className="text-xs text-center text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-foreground font-medium underline underline-offset-2">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}