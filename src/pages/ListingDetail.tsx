import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Mail, Loader2, MessageCircle } from "lucide-react";
import ListingImageCarousel from "@/components/ListingImageCarousel";
import { API_URL } from "@/config/api";


/* ================= TYPES ================= */
interface ListingImage {
  url: string;
}

interface Listing {
  _id: string;
  title: string;
  description?: string;
  price: number;
  condition?: string;
  category?: string;
  createdAt: string;
  sellerEmail?: string;
  sellerPhone?: string;
  sellerCollegeId?: string;
  status?: string;
  images?: ListingImage[];
}

/* ================= HELPERS ================= */
const openWhatsApp = (phone?: string, title?: string) => {
  if (!phone) {
    alert("Seller phone number not available");
    return;
  }

  const message = encodeURIComponent(
    `Hi! I'm interested in your listing "${title}" on SellBee 🐝`
  );

  window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
};

const sendEmail = (email?: string, title?: string) => {
  if (!email) return;

  const subject = encodeURIComponent("Interested in your listing on SellBee");
  const body = encodeURIComponent(
    `Hi,\n\nI'm interested in your listing "${title}".\n\nThanks!`
  );

  window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
};

/* ================= COMPONENT ================= */
const ListingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchListing = async () => {
      try {
        const res = await fetch(`${API_URL}/products/${id}`);
        if (!res.ok) throw new Error("Listing not found");

        const data = await res.json();
        setListing(data);
      } catch (err) {
        console.error(err);
        setListing(null);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen bg-background font-fredoka">
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <Loader2 className="h-8 w-8 animate-spin text-honey" />
        </div>
      </div>
    );
  }

  /* ================= NOT FOUND ================= */
  if (!listing) {
    return (
      <div className="min-h-screen bg-background font-fredoka">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Listing not found</h1>
          <Link to="/marketplace">
            <Button>Back to Marketplace</Button>
          </Link>
        </div>
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-background font-fredoka">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* BACK */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* ✅ IMAGE CAROUSEL */}
          <ListingImageCarousel images={listing.images || []} />

          {/* DETAILS */}
          <div className="space-y-6">
            {/* META */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {listing.category && (
                  <Badge variant="secondary">{listing.category}</Badge>
                )}

                {listing.condition && (
                  <Badge variant="outline" className="capitalize">
                    {listing.condition.replace("-", " ")}
                  </Badge>
                )}

                {listing.status === "sold" && (
                  <Badge variant="destructive">Sold</Badge>
                )}
              </div>

              <h1 className="text-3xl font-bold mb-2">
                {listing.title}
              </h1>

              <p className="text-4xl font-bold text-honey mb-4">
                {formatPrice(listing.price)}
              </p>

              <p className="text-sm text-muted-foreground">
                Posted on {formatDate(listing.createdAt)}
              </p>
            </div>

            {/* DESCRIPTION */}
            <div>
              <h2 className="text-lg font-semibold mb-2">
                Description
              </h2>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {listing.description || "No description provided"}
              </p>
            </div>

            {/* CONTACT SELLER */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">
                  Contact Seller
                </h2>

                <div className="flex gap-3 flex-wrap">
                  {listing.sellerPhone && (
                    <Button
                      variant="outline"
                      onClick={() =>
                        openWhatsApp(
                          listing.sellerPhone,
                          listing.title
                        )
                      }
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      WhatsApp
                    </Button>
                  )}

                  {listing.sellerEmail && (
                    <Button
                      variant="outline"
                      onClick={() =>
                        sendEmail(
                          listing.sellerEmail,
                          listing.title
                        )
                      }
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                  )}
                </div>

                {!listing.sellerPhone && !listing.sellerEmail && (
                  <p className="text-muted-foreground text-sm mt-3">
                    Seller contact not available
                  </p>
                )}

                {listing.sellerCollegeId && (
                  <p className="text-sm text-muted-foreground mt-4">
                    College ID: {listing.sellerCollegeId}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;
