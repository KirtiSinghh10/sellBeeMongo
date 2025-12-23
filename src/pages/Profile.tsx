import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Package, Edit } from "lucide-react";
import { useAuth } from "@/context/AuthContent";

const Profile = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [myListings, setMyListings] = useState<any[]>([]);
  const [loadingListings, setLoadingListings] = useState(true);

  // 🔐 Redirect if not logged in
  useEffect(() => {
    if (!user) navigate("/auth");
  }, [user, navigate]);

  // 📦 Fetch listings
  useEffect(() => {
    if (!user) return;

    const fetchMyListings = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/products/mine/${user.collegeId}`
        );
        const data = await res.json();
        setMyListings(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingListings(false);
      }
    };

    fetchMyListings();
  }, [user]);

  // 🗑️ DELETE
  const deleteListing = async (id: string) => {
    if (!token) return;
    if (!confirm("Delete this listing?")) return;

    try {
      const res = await fetch(`http://localhost:5000/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error();

      setMyListings((prev) => prev.filter((l) => l._id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  // ✅ MARK SOLD
  const markAsSold = async (id: string) => {
    if (!token) return;

    try {
      const res = await fetch(
        `http://localhost:5000/products/${id}/sold`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updated = await res.json();
      setMyListings((prev) =>
        prev.map((l) => (l._id === id ? updated : l))
      );
    } catch {
      alert("Failed to mark sold");
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
        <h1 className="text-4xl font-bold">My Profile</h1>

        {/* PROFILE CARD */}
        <Card>
          <CardHeader>
            <CardTitle className="flex gap-2 items-center">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>College ID:</strong> {user.collegeId}</p>
            <p><strong>Phone Number:</strong> {user.phone}</p>

            <Button
              variant="outline"
              onClick={() => navigate("/users/edit")}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        {/* LISTINGS */}
        <Card>
          <CardHeader>
            <CardTitle className="flex gap-2 items-center">
              <Package className="h-5 w-5" />
              My Listings
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {loadingListings ? (
              <p>Loading...</p>
            ) : myListings.length === 0 ? (
              <p>You haven’t posted anything yet</p>
            ) : (
              myListings.map((listing) => (
                <div
                  key={listing._id}
                  className="p-4 rounded-lg bg-secondary space-y-2"
                >
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold">{listing.title}</h3>
                      <p className="font-bold">₹{listing.price}</p>
                    </div>

                    <Badge>{listing.status || "active"}</Badge>
                  </div>

                  <div className="flex gap-2">
                    {listing.status !== "sold" && (
                      <Button
                        size="sm"
                        onClick={() => markAsSold(listing._id)}
                      >
                        Mark Sold
                      </Button>
                    )}

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteListing(listing._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
