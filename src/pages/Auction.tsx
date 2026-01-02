import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContent";
import { toast } from "sonner";

type Auction = {
  _id: string;
  title: string;
  originalPrice: number;
  currentBid: number;
  images?: { url: string }[];
  endsAt: string; // 🔑 MUST come from backend
  sellerCollegeId: string;
};

const Auction = () => {
  const { user, token } = useAuth();
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [bidAmounts, setBidAmounts] = useState<Record<string, string>>({});
  const [now, setNow] = useState(Date.now());

  /* ================= FETCH LIVE AUCTIONS ================= */
  useEffect(() => {
    fetch("https://sellbee-backend-7gny.onrender.com/products/auction/all")
      .then((res) => res.json())
      .then((data) => setAuctions(data))
      .catch(() => toast.error("Failed to load auctions"));
  }, []);

  /* ================= TICK EVERY MINUTE ================= */
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  /* ================= TIMER ================= */
  const getTimeLeft = (endsAt: string) => {
    const diff = new Date(endsAt).getTime() - now;

    if (diff <= 0) return "Ended";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);

    return `${days}d ${hours}h ${minutes}m`;
  };

  /* ================= PLACE BID ================= */
  const placeBid = async (auctionId: string, currentBid: number) => {
    if (!token) {
      toast.error("Login required");
      return;
    }

    const amount = Number(bidAmounts[auctionId]);

    if (!amount || amount < currentBid + 10) {
      toast.error(`Minimum bid is ₹${currentBid + 10}`);
      return;
    }

    try {
      const res = await fetch(
        `https://sellbee-backend-7gny.onrender.com/auction/${auctionId}/bid`,
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
      if (!res.ok) throw new Error(data.message);

      toast.success("Bid placed!");

      setAuctions((prev) =>
        prev.map((a) =>
          a._id === auctionId ? { ...a, currentBid: amount } : a
        )
      );

      setBidAmounts((prev) => ({ ...prev, [auctionId]: "" }));
    } catch (err: any) {
      toast.error(err.message || "Bid failed");
    }
  };

  return (
    <div className="min-h-screen bg-background font-fredoka">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Live Auctions</h1>

        {auctions.length === 0 ? (
          <p className="text-muted-foreground text-center">
            No live auctions right now
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {auctions.map((auction) => {
              const isEnded =
                new Date(auction.endsAt).getTime() <= now;

              if (isEnded) return null; // 🔥 DO NOT RENDER ENDED

              const isSeller =
                user?.collegeId === auction.sellerCollegeId;

              return (
                <Card key={auction._id}>
                  {auction.images?.[0]?.url ? (
                    <img
                      src={auction.images[0].url}
                      className="h-40 w-full object-cover rounded-t"
                    />
                  ) : (
                    <div className="h-40 bg-muted flex items-center justify-center text-3xl">
                      🐝
                    </div>
                  )}

                  <CardHeader>
                    <h3 className="text-xl font-bold">{auction.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Ends in: {getTimeLeft(auction.endsAt)}
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <p>
                      Base Price: ₹{auction.originalPrice}
                    </p>
                    <p className="font-semibold">
                      Current Bid: ₹{auction.currentBid}
                    </p>

                    {!isSeller && (
                      <>
                        <Input
                          type="number"
                          placeholder={`Min ₹${auction.currentBid + 10}`}
                          value={bidAmounts[auction._id] || ""}
                          onChange={(e) =>
                            setBidAmounts({
                              ...bidAmounts,
                              [auction._id]: e.target.value,
                            })
                          }
                        />
                        <Button
                          className="w-full"
                          onClick={() =>
                            placeBid(
                              auction._id,
                              auction.currentBid
                            )
                          }
                        >
                          Place Bid
                        </Button>
                      </>
                    )}

                    {isSeller && (
                      <p className="text-sm text-muted-foreground">
                        You are the seller
                      </p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Auction;
