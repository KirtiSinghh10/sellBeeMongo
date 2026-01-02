import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContent";
import { toast } from "sonner";

/* ================= TYPES ================= */
type Auction = {
  _id: string;
  title: string;
  originalPrice: number;
  currentBid: number;
  category?: string;
  images?: { url: string }[];
  endsAt: string;
  sellerCollegeId: string;
  totalBids?: number;
};

/* ================= FILTER TYPES ================= */
type SortOption =
  | "endingSoon"
  | "newest"
  | "priceLow"
  | "priceHigh"
  | "mostBids";

type StatusFilter = "all" | "live" | "ended";
type SellerFilter = "all" | "sameCollege" | "otherCollege";

const AuctionPage = () => {
  const { user, token } = useAuth();

  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [bidAmounts, setBidAmounts] = useState<Record<string, string>>({});
  const [search, setSearch] = useState("");

  const [sortBy, setSortBy] = useState<SortOption>("endingSoon");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("live");
  const [sellerFilter, setSellerFilter] = useState<SellerFilter>("all");

  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  const [now, setNow] = useState(Date.now());

  /* ================= FETCH AUCTIONS ================= */
  useEffect(() => {
    fetch("https://sellbee-backend-7gny.onrender.com/products/auction/all")
      .then((res) => res.json())
      .then(setAuctions)
      .catch(() => toast.error("Failed to load auctions"));
  }, []);

  /* ================= TIMER TICK ================= */
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  /* ================= TIME LEFT ================= */
  const getTimeLeft = (endsAt: string) => {
    const diff = new Date(endsAt).getTime() - now;
    if (diff <= 0) return "Ended";

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);

    return `${d}d ${h}h ${m}m`;
  };

  /* ================= FILTER + SORT ================= */
  const filteredAuctions = auctions
    // 🔍 Search
    .filter((a) =>
      a.title.toLowerCase().includes(search.toLowerCase())
    )

    // ⏱ Status
    .filter((a) => {
      if (statusFilter === "all") return true;
      const ended = new Date(a.endsAt).getTime() <= now;
      return statusFilter === "live" ? !ended : ended;
    })

    // 🏫 Seller
    .filter((a) => {
      if (sellerFilter === "all" || !user) return true;
      return sellerFilter === "sameCollege"
        ? a.sellerCollegeId === user.collegeId
        : a.sellerCollegeId !== user.collegeId;
    })

    // 💰 Price range
    .filter((a) => {
      if (minPrice !== "" && a.currentBid < minPrice) return false;
      if (maxPrice !== "" && a.currentBid > maxPrice) return false;
      return true;
    })

    // ↕ Sorting
    .sort((a, b) => {
      switch (sortBy) {
        case "endingSoon":
          return (
            new Date(a.endsAt).getTime() -
            new Date(b.endsAt).getTime()
          );
        case "newest":
          return (
            new Date(b.endsAt).getTime() -
            new Date(a.endsAt).getTime()
          );
        case "priceLow":
          return a.currentBid - b.currentBid;
        case "priceHigh":
          return b.currentBid - a.currentBid;
        case "mostBids":
          return (b.totalBids ?? 0) - (a.totalBids ?? 0);
        default:
          return 0;
      }
    });

  /* ================= PLACE BID ================= */
  const placeBid = async (id: string, currentBid: number) => {
    if (!token) return toast.error("Login required");

    const amount = Number(bidAmounts[id]);
    if (!amount || amount < currentBid + 10) {
      return toast.error(`Minimum bid is ₹${currentBid + 10}`);
    }

    try {
      const res = await fetch(
        `https://sellbee-backend-7gny.onrender.com/auction/${id}/bid`,
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

      toast.success("Bid placed");

      setAuctions((prev) =>
        prev.map((a) =>
          a._id === id ? { ...a, currentBid: amount } : a
        )
      );

      setBidAmounts((p) => ({ ...p, [id]: "" }));
    } catch (err: any) {
      toast.error(err.message || "Bid failed");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-background font-fredoka">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Auctions</h1>

        {/* SEARCH */}
        <Input
          placeholder="Search auctions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md mb-4"
        />

        {/* FILTERS */}
        <div className="flex flex-wrap gap-3 mb-6">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortOption)}>
            <option value="endingSoon">Ending Soon</option>
            <option value="newest">Newest</option>
            <option value="priceLow">Price Low</option>
            <option value="priceHigh">Price High</option>
            <option value="mostBids">Most Bids</option>
          </select>

          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}>
            <option value="all">All</option>
            <option value="live">Live</option>
            <option value="ended">Ended</option>
          </select>

          <select value={sellerFilter} onChange={(e) => setSellerFilter(e.target.value as SellerFilter)}>
            <option value="all">All Sellers</option>
            <option value="sameCollege">Same College</option>
            <option value="otherCollege">Other Colleges</option>
          </select>

          <Input
            type="number"
            placeholder="Min ₹"
            value={minPrice}
            onChange={(e) =>
              setMinPrice(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="w-24"
          />

          <Input
            type="number"
            placeholder="Max ₹"
            value={maxPrice}
            onChange={(e) =>
              setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="w-24"
          />
        </div>

        {/* AUCTIONS */}
        {filteredAuctions.length === 0 ? (
          <p className="text-muted-foreground">No auctions found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAuctions.map((a) => {
              const ended = new Date(a.endsAt).getTime() <= now;
              const isSeller = user?.collegeId === a.sellerCollegeId;

              return (
                <Card key={a._id}>
                  {a.images?.[0]?.url ? (
                    <img
                      src={a.images[0].url}
                      className="h-40 w-full object-cover rounded-t"
                    />
                  ) : (
                    <div className="h-40 bg-muted flex items-center justify-center text-3xl">
                      🐝
                    </div>
                  )}

                  <CardHeader>
                    <h3 className="text-xl font-bold">{a.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Ends in: {getTimeLeft(a.endsAt)}
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <p>Base Price: ₹{a.originalPrice}</p>
                    <p className="font-semibold">
                      Current Bid: ₹{a.currentBid}
                    </p>

                    {!ended && !isSeller && (
                      <>
                        <Input
                          type="number"
                          placeholder={`Min ₹${a.currentBid + 10}`}
                          value={bidAmounts[a._id] || ""}
                          onChange={(e) =>
                            setBidAmounts({
                              ...bidAmounts,
                              [a._id]: e.target.value,
                            })
                          }
                        />
                        <Button
                          className="w-full"
                          onClick={() =>
                            placeBid(a._id, a.currentBid)
                          }
                        >
                          Place Bid
                        </Button>
                      </>
                    )}

                    {ended && (
                      <p className="text-sm text-red-500">
                        Auction Ended
                      </p>
                    )}

                    {isSeller && !ended && (
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

export default AuctionPage;
