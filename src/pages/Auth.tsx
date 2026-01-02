import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { useAuth } from "@/context/AuthContent";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [collegeId, setCollegeId] = useState("");
  const [phone, setphone]=useState("");

  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // 🔥 REQUIRED
    setLoading(true);

    try {
      const res = await fetch(
        isLogin
          ?"https://sellbee-backend-7gny.onrender.com/auth/login"
    : "https://sellbee-backend-7gny.onrender.com/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            isLogin
              ? { email, password }
              : { name, email, password, collegeId, phone }
          ),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Authentication failed");
      }

      login(data.user, data.token);

      navigate("/");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">
            {isLogin ? "Login" : "Create Account"}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <Input
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                <Input
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setphone(e.target.value)}
              required
            />

                <Input
                  placeholder="USN"
                  value={collegeId}
                  onChange={(e) => setCollegeId(e.target.value)}
                  required
                />
              </>
            )}

            <Input
              placeholder="College Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading
                ? "Please wait..."
                : isLogin
                ? "Login"
                : "Create Account"}
            </Button>

            <p
              className="text-sm text-center text-muted-foreground cursor-pointer"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin
                ? "Don’t have an account? Create one"
                : "Already have an account? Login"}
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
