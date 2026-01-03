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

  // 🔐 OTP states
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [collegeId, setCollegeId] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  /* ================= LOGIN ================= */
  const handleLogin = async () => {
    const res = await fetch(
      "https://sellbee-backend-7gny.onrender.com/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed");

    login(data.user, data.token);
    navigate("/");
  };

  /* ================= SEND OTP ================= */
  const handleSendOtp = async () => {
    const res = await fetch(
      "https://sellbee-backend-7gny.onrender.com/auth/send-otp",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          collegeId,
          phone,
        }),
      }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to send OTP");

    setOtpSent(true);
  };

  /* ================= VERIFY OTP ================= */
  const handleVerifyOtp = async () => {
    setLoading(true); // ✅ REQUIRED

    try {
      const res = await fetch(
        "https://sellbee-backend-7gny.onrender.com/auth/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Invalid OTP");

      login(data.user, data.token);
      navigate("/");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false); // ✅ STOPS INFINITE LOADER
    }
  };

  /* ================= FORM SUBMIT ================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ⛔ CRITICAL: block submit when OTP screen is active
    if (!isLogin && otpSent) return;

    setLoading(true);

    try {
      if (isLogin) {
        await handleLogin();
      } else {
        await handleSendOtp();
      }
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
                  onChange={(e) => setPhone(e.target.value)}
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

            {!otpSent && (
              <Button type="submit" className="w-full" disabled={loading}>
                {loading
                  ? "Please wait..."
                  : isLogin
                  ? "Login"
                  : "Create Account"}
              </Button>
            )}

            {/* 🔐 OTP STEP */}
            {otpSent && !isLogin && (
              <>
                <Input
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  required
                />
                <Button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </Button>
              </>
            )}

            <p
              className="text-sm text-center text-muted-foreground cursor-pointer"
              onClick={() => {
                setIsLogin(!isLogin);
                setOtpSent(false);
                setOtp("");
                setLoading(false);
              }}
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
