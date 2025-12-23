import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { User, LogOut } from "lucide-react";

const LoginIndicator = () => {
  const { user, signOut } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground hidden sm:block">
          {user.user_metadata?.full_name || user.email}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={signOut}
          className="bg-card/80 backdrop-blur-sm border-border/50 hover:bg-card/90 gap-2"
        >
          <User className="w-4 h-4" />
          <span className="hidden sm:inline">Sign Out</span>
          <LogOut className="w-3 h-3 opacity-60 sm:hidden" />
        </Button>
      </div>
    </div>
  );
};

export default LoginIndicator;