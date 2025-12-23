import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { User, LogOut } from "lucide-react";

const LoginIndicator = () => {
  const { isLoggedIn, logout } = useAuth();

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <Button
        variant="outline"
        size="sm"
        onClick={logout}
        className="bg-card/80 backdrop-blur-sm border-border/50 hover:bg-card/90 gap-2"
      >
        <User className="w-4 h-4" />
        <span className="text-sm">Logged In</span>
        <LogOut className="w-3 h-3 opacity-60" />
      </Button>
    </div>
  );
};

export default LoginIndicator;