import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Plus, User, LogOut } from "lucide-react";

interface NavbarProps {
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

const Navbar = ({ isAuthenticated = false, onLogout }: NavbarProps) => {
  return (
    <nav className="border-b border-border bg-card sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="text-3xl group-hover:scale-110 transition-transform">🐝</div>
          <span className="text-2xl font-bold bg-gradient-to-r from-honey to-honey-light bg-clip-text text-transparent">
            SellBee
          </span>
        </Link>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Button variant="ghost" asChild>
                <Link to="/marketplace" className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  Marketplace
                </Link>
              </Button>
              <Button variant="default" asChild>
                <Link to="/add-listing" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Post Ad
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/profile">
                  <User className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" onClick={onLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/auth">Login</Link>
              </Button>
              <Button variant="default" asChild>
                <Link to="/auth">Get Started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
