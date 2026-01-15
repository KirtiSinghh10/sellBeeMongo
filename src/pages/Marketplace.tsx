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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Search, MessageCircle, Mail } from "lucide-react";

/* ================= TYPES ================= */
type Product = {
  _id: string;
  title: string;
  price: number;
  description: string;
  sellerPhone?: string;
  sellerEmail: string;
  category?: string;
  condition?: "new" | "like-new" | "good" | "fair";
  images?: { url: string }[];
  isNegotiable?: boolean;
};

/* ================= SERVICE CATEGORIES ================= */
const SERVICE_CATEGORIES = [
  "services",
  "tutoring",
  "design & creative",
  "tech & development",
];

/* ================= HELPERS ================= */
const openWhatsApp = (phone?: string, title?: string) => {
  if (!phone) {
    alert("Seller phone number not available");
    return;
  }

  const cleanPhone = phone.replace(/\D/g, "");
  const finalPhone = cleanPhone.startsWith("91")
    ? cleanPhone
    : `91${cleanPhone}`;

  const message = encodeURIComponent(
    `Hi! I'm interested in your listing "${title}" on SellBee 🐝`
  );

  window.open(
    `https://wa.me/${finalPhone}?text=${message}`,
    "_blank"
  );
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
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [category, setCategory] = useState("all");
  const [condition, setCondition] = useState("all");
  const [priceRange, setPriceRange] = useState("all");

  /* ================= FETCH ================= */
  useEffect(() => {
    fetch("https://sellbee-backend-7gny.onrender.com/products")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data: Product[]) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load listings");
        setLoading(false);
      });
  }, []);

  /* ================= FILTER ================= */
  const filteredProducts = products.filter((product) => {
    const matchText = `${product.title} ${product.description}`
      .toLowerCase()
      .includes(search.toLowerCase());

    if (!matchText) return false;

    if (
      category !== "all" &&
      product.category?.toLowerCase() !== category
    ) {
      return false;
    }

    if (condition !== "all" && product.condition !== condition)
      return false;

    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-").map(Number);
      if (product.price < min || product.price > max) return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-background font-fredoka">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4 text-black">
          Marketplace
        </h1>

        {/* SEARCH + FILTERS */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2 flex-wrap ml-auto">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="books">Books</SelectItem>
                <SelectItem value="furniture">Furniture</SelectItem>
                <SelectItem value="other">Other</SelectItem>
                <SelectItem value="services">Services</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Price</SelectItem>
                <SelectItem value="0-500">Under ₹500</SelectItem>
                <SelectItem value="500-2000">₹500 – ₹2000</SelectItem>
                <SelectItem value="2000-999999">₹2000+</SelectItem>
              </SelectContent>
            </Select>

            <Select value={condition} onValueChange={setCondition}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Condition</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="like-new">Like New</SelectItem>
                <SelectItem value="good">Good</SelectItem>
                <SelectItem value="fair">Fair</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const isService = SERVICE_CATEGORIES.includes(
              product.category?.toLowerCase() || ""
            );

            return (
              <Card
                key={product._id}
                role="button"
                onClick={() => navigate(`/listing/${product._id}`)}
                className={`cursor-pointer transition hover:shadow-lg border ${
                  isService
                    ? "bg-blue-50 border-blue-200"
                    : "bg-yellow-50 border-yellow-200"
                }`}
              >
                <div
                  className={`h-1 w-full ${
                    isService ? "bg-blue-400" : "bg-yellow-400"
                  }`}
                />

                <CardHeader>
                  <h3 className="text-xl font-bold">{product.title}</h3>

                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary">₹{product.price}</Badge>
                    <Badge
                      className={
                        isService
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {isService ? "Service" : "Product"}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="line-clamp-2 text-muted-foreground">
                    {product.description}
                  </p>
                </CardContent>

                <CardFooter className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      openWhatsApp(product.sellerPhone, product.title);
                    }}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Button>

                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      sendEmail(product.sellerEmail, product.title);
                    }}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email
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

export default Marketplace;
