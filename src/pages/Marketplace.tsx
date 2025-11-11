import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MessageCircle } from "lucide-react";

// Mock data
const mockListings = [
  {
    id: 1,
    title: "Engineering Textbooks Set",
    price: 800,
    category: "Books",
    image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400",
    seller: "Rahul K",
    whatsapp: "1234567890"
  },
  {
    id: 2,
    title: "Scientific Calculator",
    price: 500,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=400",
    seller: "Priya M",
    whatsapp: "1234567890"
  },
  {
    id: 3,
    title: "Laptop Stand",
    price: 400,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
    seller: "Amit S",
    whatsapp: "1234567890"
  },
  {
    id: 4,
    title: "Study Desk",
    price: 1500,
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400",
    seller: "Neha P",
    whatsapp: "1234567890"
  }
];

const Marketplace = () => {
  const [search, setSearch] = useState("");

  const filteredListings = mockListings.filter(listing =>
    listing.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredListings.map((listing) => (
            <Card key={listing.id} className="overflow-hidden hover:border-honey transition-colors">
              <CardHeader className="p-0">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-full h-48 object-cover"
                />
              </CardHeader>
              <CardContent className="p-4">
                <Badge className="mb-2">{listing.category}</Badge>
                <h3 className="font-semibold text-lg mb-2">{listing.title}</h3>
                <p className="text-2xl font-bold text-honey">₹{listing.price}</p>
                <p className="text-sm text-muted-foreground mt-2">Seller: {listing.seller}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button 
                  className="w-full" 
                  onClick={() => window.open(`https://wa.me/${listing.whatsapp}`, '_blank')}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contact on WhatsApp
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
