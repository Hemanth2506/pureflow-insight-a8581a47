import { Moon, Sun, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  onThemeToggle: () => void;
  isDark: boolean;
  onProfileClick: () => void;
}

export function DashboardHeader({ onThemeToggle, isDark, onProfileClick }: DashboardHeaderProps) {
  return (
    <header className="bg-secondary text-secondary-foreground shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="text-lg font-bold">MINDMELD MAVERICKS</div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onThemeToggle}
              className="text-secondary-foreground hover:bg-secondary-foreground/10"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onProfileClick}
              className="text-secondary-foreground hover:bg-secondary-foreground/10"
            >
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center mb-4">
          Microplastics Detection & Tracking
        </h1>
        <nav className="bg-nav rounded-lg">
          <ul className="flex justify-center gap-6 py-3">
            <li>
              <a href="#" className="font-semibold text-primary hover:text-secondary transition-colors px-4 py-2 rounded-md hover:bg-primary/10">
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="font-semibold text-primary hover:text-secondary transition-colors px-4 py-2 rounded-md hover:bg-primary/10">
                Data
              </a>
            </li>
            <li>
              <a href="#" className="font-semibold text-primary hover:text-secondary transition-colors px-4 py-2 rounded-md hover:bg-primary/10">
                Reports
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
