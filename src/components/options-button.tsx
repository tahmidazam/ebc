import { EllipsisIcon } from "lucide-react";
import { CycleThemeDropdownMenuItem } from "./cycle-theme-dropdown-menu-item";
import { FeedbackDropdownMenuItem } from "./feedback-dropdown-menu-item";
import { HelpDropdownMenuItem } from "./help-dropdown-menu-item";
import { LogoutDropdownMenuItem } from "./logout-dropdown-menu-item";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function OptionsButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline">
          <EllipsisIcon />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuGroup>
          <CycleThemeDropdownMenuItem />
          <FeedbackDropdownMenuItem />
          <HelpDropdownMenuItem />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <LogoutDropdownMenuItem />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
