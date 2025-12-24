import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContent";
import { toast } from "sonner";

const EditProfile = () => {
  const { user, token, setUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
  if (!token) {
    toast.error("Not authenticated");
    return;
  }

  try {
    setLoading(true);

    const res = await fetch("http://localhost:5000/users/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: formData.name,
        phone: formData.phone,

      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    setUser(data.user); // 🔥 FIXED
    toast.success("Profile updated successfully");
    navigate("/profile");
  } catch (err: any) {
    toast.error(err.message || "Update failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-4 p-6 bg-card rounded-xl shadow">
        <h1 className="text-2xl font-bold text-center">Edit Profile</h1>

        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
        />

        <Input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
        />


        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>

        <Button variant="outline" onClick={() => navigate("/profile")}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default EditProfile;
