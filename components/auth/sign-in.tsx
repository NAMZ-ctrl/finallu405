"use client";
import { useActionState } from "react";
import { signInWithCredentials } from "@/actions/user.action";

export default function SignIn() {
  const [state, action, isPending] = useActionState(signInWithCredentials, {});
  return (
    <>
      <form className="flex flex-col gap-4" action={action}>
        <div className="flex flex-col">
          <label htmlFor="email">email</label>
          <input
            type="email"
            name="email"
            className="border-2 border-black rounded-md"
          />
          <div>{state?.errors?.email && <span>{state.errors.email}</span>}</div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">password</label>
          <input
            type="text"
            name="password"
            className="border-2 border-black rounded-md"
          />
          <div>
            {state?.errors?.password && <span>{state.errors.password}</span>}
          </div>
        </div>
        <input
          type="submit"
          className={`${isPending ? 'text-green-400' : 'text-white bg-black hover:cursor-pointer rounded-md uppercase'}`}
        />
        <div>
            {state?.message && <span>{state.message}</span>}
        </div>
      </form>
    </>
  );
}
