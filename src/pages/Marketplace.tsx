import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MessageCircle } from "lucide-react";

const Marketplace = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-background font-fredoka">
      <Navbar isAuthenticated />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-honey to-honey-light bg-clip-text text-transparent">
            Marketplace
          </h1>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-xl text-muted-foreground mb-4">No listings yet</p>
          <p className="text-muted-foreground">Check back soon for new items!</p>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
