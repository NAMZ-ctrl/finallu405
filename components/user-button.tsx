import Link from "next/link";
import { auth } from "@/auth";
import { signOutUser } from "@/actions/user.action";
import { Button } from "@/components/ui/button";
import { UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default async function UserButton() {
  const session = await auth();
  if (!session) {
    return (
      <Button asChild>
        <Link href={"/sign-in"}>
          <UserIcon />
          Sign In
        </Link>
      </Button>
    );
  }
  const firstInitial = session?.user?.name?.charAt(0).toUpperCase() ?? "U";
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center hover:cursor-pointer">
            <Button variant="ghost">{firstInitial}</Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent forceMount>
          <DropdownMenuLabel>
            <div className="flex flex-col">
              <div>{session?.user?.email}</div>
              <div>{session?.user?.name}</div>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
