import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MessageCircle, Mail } from "lucide-react";

/* ================= TYPES ================= */
type Product = {
  _id: string;
  title: string;
  price: number;
  description: string;
  sellerPhone?: string;
  sellerEmail: string;
};

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

const sendEmail = (email: string, title?: string) => {
  const subject = encodeURIComponent("Interested in your listing on SellBee");
  const body = encodeURIComponent(
    `Hi,\n\nI'm interested in your listing "${title}".\n\nThanks!`
  );

  window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
};

/* ================= COMPONENT ================= */
const Marketplace = () => {
  const navigate = useNavigate(); // ✅ REQUIRED
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data: Product[]) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not load listings");
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background font-fredoka">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-black">
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

        {/* CONTENT */}
        {loading ? (
          <div className="text-center py-16 text-muted-foreground">
            Loading listings...
          </div>
        ) : error ? (
          <div className="text-center py-16 text-red-500">
            {error}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            No listings found
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card
                key={product._id}
                role="button"
                tabIndex={0}
                onClick={() =>
                  navigate(`/listing/${product._id}`)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    navigate(`/listing/${product._id}`);
                  }
                }}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <h3 className="text-xl font-bold">
                    {product.title}
                  </h3>
                  <Badge className="w-fit mt-2">
                    ₹{product.price}
                  </Badge>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>
                </CardContent>

                {/* ACTIONS */}
                <CardFooter className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation(); // ✅ IMPORTANT
                      openWhatsApp(
                        product.sellerPhone,
                        product.title
                      );
                    }}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Button>

                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation(); // ✅ IMPORTANT
                      sendEmail(
                        product.sellerEmail,
                        product.title
                      );
                    }}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
