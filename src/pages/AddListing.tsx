import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContent";
import { API_URL } from "@/config/api";

const MAX_IMAGES = 5;

/* ================= CATEGORIES ================= */
const CATEGORIES = {
  Products: [
    "Clothing",
    "Electronics",
    "Furniture",
    "Sports Equipment",
    "Textbooks",
    "Other",
  ],
  Services: [
    "Tutoring",
    "Design & Creative",
    "Tech & Development",
    "Services",
  ],
};

/* ================= CONDITIONS ================= */
const CONDITIONS = ["new", "like-new", "good", "fair"];

const AddListing = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);

  // 🔹 NEW: negotiable state
  const [isNegotiable, setIsNegotiable] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    condition: "",
  });

  /* ================= AUTH GUARD ================= */
  useEffect(() => {
    if (!user) navigate("/auth");
  }, [user, navigate]);

  /* ================= IMAGE HANDLER ================= */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selected = Array.from(e.target.files);
    if (selected.length > MAX_IMAGES) {
      toast.error(`Max ${MAX_IMAGES} images allowed`);
      return;
    }

    setImages(selected);
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !token) return;

    setLoading(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("condition", formData.condition);

      // 🔹 NEW: send negotiable flag
      data.append("isNegotiable", String(isNegotiable));

      data.append("sellerCollegeId", user.collegeId);
      data.append("sellerEmail", user.email);
      data.append("sellerPhone", user.phone);

      images.forEach((img) => data.append("images", img));

      const res = await fetch(`${API_URL}/products/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      toast.success("Listing posted!");
      navigate("/marketplace");
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-background font-fredoka">
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Post an Ad</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label>Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div>
                <Label>Price</Label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  required
                />
              </div>

              {/* 🔹 NEW: NEGOTIABLE TOGGLE */}
              <div>
                <Label>Price Type</Label>
                <div className="flex gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => setIsNegotiable(true)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                      isNegotiable
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    Negotiable
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsNegotiable(false)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                      !isNegotiable
                        ? "bg-red-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    Non-Negotiable
                  </button>
                </div>
              </div>

              {/* CATEGORY */}
              <div>
                <Label>Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">
                      Products
                    </div>
                    {CATEGORIES.Products.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}

                    <div className="px-2 py-1 mt-2 text-xs font-semibold text-muted-foreground">
                      Services
                    </div>
                    {CATEGORIES.Services.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* CONDITION */}
              <div>
                <Label>Condition</Label>
                <Select
                  value={formData.condition}
                  onValueChange={(value) =>
                    setFormData({ ...formData, condition: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    {CONDITIONS.map((cond) => (
                      <SelectItem key={cond} value={cond}>
                        {cond.replace("-", " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Images (max 5)</Label>
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>

              {images.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {images.map((img, i) => (
                    <img
                      key={i}
                      src={URL.createObjectURL(img)}
                      className="h-24 w-full object-cover rounded-md"
                    />
                  ))}
                </div>
              )}

              <Button className="w-full" disabled={loading}>
                {loading ? "Posting..." : "Post Listing"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddListing;
