import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Plus, User, LogOut, Gavel } from "lucide-react";
import { useAuth } from "@/context/AuthContent";

const Navbar = () => {
  const { user, logout } = useAuth();

  const isAuthenticated = !!user;

  return (
    <nav className="border-b border-border bg-card sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="text-4xl">🐝</div>
          <span className="text-4xl font-story font-bold">
    <span className="text- Black">
      Sell
    </span>
    <span className="bg-gradient-to-r from-honey to-honey-light bg-clip-text text-transparent">Bee</span>
  </span>
        </Link>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Button variant="ghost" asChild>
                <Link to="/marketplace">
                  <ShoppingBag className="h-4 w-4 mr-1" />
                  Marketplace
                </Link>
              </Button>

              <Button variant="ghost" asChild>
  <Link to="/auction">
    <Gavel className="h-4 w-4 mr-1" />
    Auction
  </Link>
</Button>


              <Button variant="default" asChild>
                <Link to="/add-listing">
                  <Plus className="h-4 w-4 mr-1" />
                  Post Ad
                </Link>
              </Button>

              <Button variant="ghost" asChild>
                <Link to="/profile">
                  <User className="h-4 w-4" />
                </Link>
              </Button>

              <Button variant="ghost" onClick={logout}>
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
