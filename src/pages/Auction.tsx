import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Clock, Gavel } from "lucide-react";

// Mock auction data
const mockAuctions = [
  {
    id: 1,
    title: "Engineering Textbooks Set",
    basePrice: 400,
    currentBid: 450,
    originalPrice: 800,
    category: "Books",
    image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400",
    seller: "Rahul K",
    endsAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    totalBids: 3
  },
  {
    id: 2,
    title: "Scientific Calculator",
    basePrice: 250,
    currentBid: 280,
    originalPrice: 500,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=400",
    seller: "Priya M",
    endsAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    totalBids: 5
  },
  {
    id: 3,
    title: "Laptop Stand",
    basePrice: 200,
    currentBid: 200,
    originalPrice: 400,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
    seller: "Amit S",
    endsAt: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000), // 6 days from now
    totalBids: 0
  },
  {
    id: 4,
    title: "Study Desk",
    basePrice: 750,
    currentBid: 820,
    originalPrice: 1500,
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400",
    seller: "Neha P",
    endsAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    totalBids: 7
  }
];

const Auction = () => {
  const [search, setSearch] = useState("");
  const [timeLeft, setTimeLeft] = useState<{ [key: number]: string }>({});

  const filteredAuctions = mockAuctions.filter(auction =>
    auction.title.toLowerCase().includes(search.toLowerCase())
  );

  // Calculate time remaining for each auction
  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft: { [key: number]: string } = {};
      
      mockAuctions.forEach(auction => {
        const now = new Date().getTime();
        const end = new Date(auction.endsAt).getTime();
        const distance = end - now;

        if (distance > 0) {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          
          newTimeLeft[auction.id] = `${days}d ${hours}h ${minutes}m`;
        } else {
          newTimeLeft[auction.id] = "Ended";
        }
      });

      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handlePlaceBid = (auctionId: number) => {
    // This will be implemented with backend
    console.log("Place bid for auction:", auctionId);
  };

  return (
    <div className="min-h-screen bg-background font-fredoka">
      <Navbar isAuthenticated />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-honey to-honey-light bg-clip-text text-transparent">
            Live Auctions
          </h1>
          <p className="text-muted-foreground mb-6">
            Unsold items automatically enter auction at 50% base price after 30 days
          </p>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search auctions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAuctions.map((auction) => (
            <Card key={auction.id} className="overflow-hidden hover:border-honey transition-colors">
              <CardHeader className="p-0 relative">
                <img
                  src={auction.image}
                  alt={auction.title}
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-honey text-honey-foreground">
                  <Gavel className="h-3 w-3 mr-1" />
                  Auction
                </Badge>
              </CardHeader>
              <CardContent className="p-4">
                <Badge variant="outline" className="mb-2">{auction.category}</Badge>
                <h3 className="font-semibold text-lg mb-2">{auction.title}</h3>
                
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Base Price:</span>
                    <span className="text-sm font-medium">₹{auction.basePrice}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Current Bid:</span>
                    <span className="text-xl font-bold text-honey">₹{auction.currentBid}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Bids:</span>
                    <span className="text-sm font-medium">{auction.totalBids}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Clock className="h-4 w-4" />
                  <span>Ends in: {timeLeft[auction.id] || "Calculating..."}</span>
                </div>
                
                <p className="text-sm text-muted-foreground">Seller: {auction.seller}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button 
                  className="w-full" 
                  onClick={() => handlePlaceBid(auction.id)}
                >
                  Place Bid
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Auction;
