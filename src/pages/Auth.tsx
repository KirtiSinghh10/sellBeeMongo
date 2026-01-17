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

  // OTP
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  // Fields
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
    setLoading(true);
    try {
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
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= SEND OTP ================= */
  const handleSendOtp = async () => {
    if (!email.endsWith(".edu") && !email.endsWith(".ac.in")) {
      alert("Please use your college email");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
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
      alert("OTP sent to your email");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= VERIFY OTP ================= */
  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      alert("Enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
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
      setLoading(false);
    }
  };

  /* ================= FORM SUBMIT ================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    isLogin ? handleLogin() : handleSendOtp();
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
            {!isLogin && !otpSent && (
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

            {!otpSent && (
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            )}
            {/* FORGOT PASSWORD */}
{isLogin && !otpSent && (
  <p
    className="text-sm text-right text-muted-foreground cursor-pointer hover:underline"
    onClick={() => navigate("/forgot-password")}
  >
    Forgot password?
  </p>
)}

            {!otpSent && (
              <Button type="submit" className="w-full" disabled={loading}>
                {loading
                  ? "Please wait..."
                  : isLogin
                  ? "Login"
                  : "Send OTP"}
              </Button>
            )}

            {otpSent && !isLogin && (
              <>
                <Input
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, ""))
                  }
                  maxLength={6}
                  required
                />
                <Button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "Please wait..." : "Verify OTP"}
                </Button>

                <p
                  className="text-xs text-center text-muted-foreground cursor-pointer"
                  onClick={handleSendOtp}
                >
                  Resend OTP
                </p>
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
