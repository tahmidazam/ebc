import { MessageCircleWarningIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import Link from "next/link";

export function FeedbackButton() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button size="icon" variant="outline">
          <MessageCircleWarningIcon />
        </Button>
      </DrawerTrigger>

      <DrawerContent
        className="h-full"
        style={{
          maxHeight: "calc(100vh - env(safe-area-inset-top))",
        }}
      >
        <div className="flex flex-col pt-16 px-4 gap-4">
          <DrawerTitle className="text-center text-3xl font-semibold tracking-tight">
            Submit Feedback
          </DrawerTitle>

          <DrawerDescription className="text-center">
            Submit feature suggestions or report issues on GitHub. A GitHub
            account is required to open or comment on issues. Your feedback
            helps us build a smoother experience for every crew member.
          </DrawerDescription>
        </div>

        <DrawerFooter className="pb-[env(safe-area-inset-bottom)]">
          <Button asChild>
            <Link href="x-safari-https://github.com/tahmidazam/ebc/issues/new">
              Continue to GitHub
            </Link>
          </Button>

          <DrawerClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
