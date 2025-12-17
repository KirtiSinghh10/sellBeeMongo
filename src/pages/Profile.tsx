import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Package, Edit } from "lucide-react";
import { useAuth } from "@/context/AuthContent";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [myListings, setMyListings] = useState<any[]>([]);
  const [loadingListings, setLoadingListings] = useState(true);

  // 🔐 Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  // 📦 Fetch user's listings (USING collegeId)
  useEffect(() => {
    if (!user) return;

    const fetchMyListings = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/products/mine/${user.collegeId}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch listings");
        }

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

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background font-fredoka">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-honey to-honey-light bg-clip-text text-transparent">
            My Profile
          </h1>

          {/* Profile Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="text-lg font-semibold">{user.name}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-lg font-semibold">{user.email}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">College ID</p>
                <p className="text-lg font-semibold">{user.collegeId}</p>
              </div>

              <Button variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </CardContent>
          </Card>

          {/* Listings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                My Listings
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                {loadingListings ? (
                  <p className="text-muted-foreground">
                    Loading your listings...
                  </p>
                ) : myListings.length === 0 ? (
                  <p className="text-muted-foreground">
                    You haven’t posted anything yet
                  </p>
                ) : (
                  myListings.map((listing) => (
                    <div
                      key={listing._id}
                      className="flex items-center justify-between p-4 bg-secondary rounded-lg"
                    >
                      <div>
                        <h3 className="font-semibold">{listing.title}</h3>
                        <p className="text-honey font-semibold">
                          ₹{listing.price}
                        </p>
                      </div>

                      <Badge
                        variant={
                          listing.status === "active"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {listing.status}
                      </Badge>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
