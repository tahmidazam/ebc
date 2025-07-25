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
import { useIntranetStore } from "@/lib/store";
import { useShallow } from "zustand/react/shallow";

export function LogoutDropdownMenuItem() {
  const router = useRouter();
  const resetPinnedHrefs = useIntranetStore(
    useShallow((state) => state.resetPinnedHrefs)
  );

  const logoutAction = () => {
    document.cookie = "code=; path=/;";
    resetPinnedHrefs();
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
