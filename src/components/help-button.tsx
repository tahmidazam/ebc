import { HelpCircleIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

export function HelpButton() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="icon" variant="outline">
          <HelpCircleIcon />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Intranet Help</AlertDialogTitle>
          <div className="flex flex-col gap-2 text-muted-foreground text-sm">
            <p>Welcome to the EBC Intranet.</p>
            <p>
              Expand your available collections and pin up to 6 links for quick
              access using the three dot menu.
            </p>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Done</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
