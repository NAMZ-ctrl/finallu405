"use client";

import { useActionState, useState } from "react";
import { SignUpActionState, signUpUser } from "@/actions/user.action";
import { Eye, EyeOff, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1">
      <div
        className={`border rounded-lg bg-background transition-colors focus-within:border-foreground
          ${error ? "border-destructive" : "border-input"}`}
      >
        <span className="block text-[11px] text-muted-foreground px-3 pt-2 leading-none">
          {label}
        </span>
        <div className="px-3 pb-2 pt-0.5">{children}</div>
      </div>
      {error && <p className="text-xs text-destructive px-1">{error}</p>}
    </div>
  );
}

export default function SignUp() {
  const [state, action, isPending] = useActionState(signUpUser, {} as SignUpActionState);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // ← narrow once at the top, use throughout
  const errors = "errors" in state ? state.errors : undefined;
  const message = "message" in state ? state.message : undefined;
  const success = "success" in state ? state.success : undefined;

  return (
    <form action={action} className="grid gap-3">
      {/* name */}
      <Field label="Full name" error={errors?.name?.[0]}>
        <input
          type="text"
          name="name"
          placeholder="John Doe"
          className="w-full bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground"
        />
      </Field>

      {/* email */}
      <Field label="Email" error={errors?.email?.[0]}>
        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          className="w-full bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground"
        />
      </Field>

      {/* password */}
      <Field label="Password" error={errors?.password?.[0]}>
        <div className="flex items-center gap-2">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="••••••••"
            className="flex-1 bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground"
          />
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </Field>

      {/* confirm password */}
      <Field label="Confirm password" error={errors?.confirmPassword?.[0]}>
        <div className="flex items-center gap-2">
          <input
            type={showConfirm ? "text" : "password"}
            name="confirmPassword"
            placeholder="••••••••"
            className="flex-1 bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground"
          />
          <button
            type="button"
            onClick={() => setShowConfirm((p) => !p)}
            className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
          >
            {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </Field>

      {/* server message — error or success */}
      {message && (
        <p className={`text-xs px-1 ${success ? "text-green-600" : "text-destructive"}`}>
          {message}
        </p>
      )}

      <Button type="submit" className="w-full h-11 mt-1" disabled={isPending}>
        {isPending ? <Loader className="size-4 animate-spin" /> : "Create account"}
      </Button>
    </form>
  );
}