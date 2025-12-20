import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Clock, Gavel } from "lucide-react";
import { useAuth } from "@/context/AuthContent";

/* ================= TYPES ================= */
type Auction = {
  _id: string;
  title: string;
  basePrice: number;
  currentBid: number;
  originalPrice: number;
  category: string;
  images?: { url: string }[];
  sellerCollegeId: string;
  endsAt: string;
  totalBids: number;
};

/* ================= COMPONENT ================= */
const Auction = () => {
  const { token, user } = useAuth();

  const [search, setSearch] = useState("");
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [timeLeft, setTimeLeft] = useState<{ [key: string]: string }>({});

  /* ================= FETCH AUCTIONS ================= */
  useEffect(() => {
    fetch("http://localhost:5000/products/auction/all")

      .then((res) => res.json())
      .then(setAuctions)
      .catch(console.error);
  }, []);

  /* ================= SEARCH FILTER ================= */
  const filteredAuctions = auctions.filter((auction) =>
    auction.title.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= TIMER (UNCHANGED LOGIC) ================= */
  useEffect(() => {
    const timer = setInterval(() => {
      const updated: { [key: string]: string } = {};

      auctions.forEach((auction) => {
        const now = Date.now();
        const end = new Date(auction.endsAt).getTime();
        const diff = end - now;

        if (diff > 0) {
          const d = Math.floor(diff / (1000 * 60 * 60 * 24));
          const h = Math.floor(
            (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

          updated[auction._id] = `${d}d ${h}h ${m}m`;
        } else {
          updated[auction._id] = "Ended";
        }
      });

      setTimeLeft(updated);
    }, 1000);

    return () => clearInterval(timer);
  }, [auctions]);

  /* ================= PLACE BID ================= */
  const handlePlaceBid = async (auctionId: string) => {
    if (!token) {
      alert("Please login to place a bid");
      return;
    }

    const input = prompt("Enter your bid amount");
    if (!input) return;

    const amount = Number(input);
    if (isNaN(amount)) {
      alert("Invalid amount");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/auction/${auctionId}/bid`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ amount }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Bid failed");
        return;
      }

      // 🔄 Update UI instantly
      setAuctions((prev) =>
        prev.map((a) => (a._id === auctionId ? data : a))
      );
    } catch {
      alert("Could not place bid");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-background font-fredoka">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-black">Auction</h1>
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

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAuctions.map((auction) => {
            const isEnded =
              new Date(auction.endsAt).getTime() < Date.now();
            const isSeller =
              user?.collegeId === auction.sellerCollegeId;

            return (
              <Card
                key={auction._id}
                className="overflow-hidden hover:border-honey transition-colors"
              >
                <CardHeader className="p-0 relative">
                  <img
                    src={auction.images?.[0]?.url || "/placeholder.png"}
                    alt={auction.title}
                    className="w-full h-48 object-cover"
                  />

                  <Badge className="absolute top-2 right-2 bg-honey text-honey-foreground">
                    <Gavel className="h-3 w-3 mr-1" />
                    Auction
                  </Badge>
                </CardHeader>

                <CardContent className="p-4">
                  <Badge variant="outline" className="mb-2">
                    {auction.category}
                  </Badge>

                  <h3 className="font-semibold text-lg mb-2">
                    {auction.title}
                  </h3>

                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Base Price:
                      </span>
                      <span>₹{auction.basePrice}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Current Bid:
                      </span>
                      <span className="text-xl font-bold text-honey">
                        ₹{auction.currentBid}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Total Bids:
                      </span>
                      <span>{auction.totalBids}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Clock className="h-4 w-4" />
                    <span>
                      Ends in: {timeLeft[auction._id] || "Calculating..."}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Seller: {auction.sellerCollegeId}
                  </p>
                </CardContent>

                <CardFooter className="p-4 pt-0">
                  <Button
                    className="w-full"
                    disabled={isEnded || isSeller}
                    onClick={() => handlePlaceBid(auction._id)}
                  >
                    {isEnded
                      ? "Auction Ended"
                      : isSeller
                      ? "Your Listing"
                      : "Place Bid"}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Auction;
