import { MessageCircleWarningIcon } from "lucide-react";
import Link from "next/link";
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

export function FeedbackDropdownMenuItem() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Submit Feedback
          <MessageCircleWarningIcon className="ml-auto size-4" />
        </DropdownMenuItem>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Submit Feedback</AlertDialogTitle>
          <AlertDialogDescription>
            Submit feature suggestions or report issues on GitHub. A GitHub
            account is required to open or comment on issues. Your feedback
            helps us build a smoother experience for every crew member.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Link href="x-safari-https://github.com/tahmidazam/ebc/issues/new">
              Continue to GitHub
            </Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
