"use client";

import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { DropdownMenuItem } from "./ui/dropdown-menu";

export function LogoutDropdownMenuItem() {
  const router = useRouter();

  const logoutAction = () => {
    document.cookie = "code=; path=/;";
    router.push("/auth");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Logout <LogOutIcon className="ml-auto size-4" />
        </DropdownMenuItem>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Log Out</AlertDialogTitle>
          <AlertDialogDescription>
            You&apos;ll need an access code to log back in.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={logoutAction}>Log out</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
