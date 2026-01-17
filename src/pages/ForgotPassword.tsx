import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= SEND OTP ================= */
  const sendOtp = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://sellbee-backend-7gny.onrender.com/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setStep(2);
      alert("OTP sent to your email");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= VERIFY OTP ================= */
  const verifyOtp = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://sellbee-backend-7gny.onrender.com/auth/verify-reset-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setStep(3);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= RESET PASSWORD ================= */
  const resetPassword = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://sellbee-backend-7gny.onrender.com/auth/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, newPassword }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert("Password reset successful");
      navigate("/auth");
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
            Forgot Password
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {step === 1 && (
            <>
              <Input
                placeholder="Registered Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button onClick={sendOtp} disabled={loading} className="w-full">
                {loading ? "Sending OTP..." : "Send OTP"}
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <Input
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, ""))
                }
                maxLength={6}
              />
              <Button onClick={verifyOtp} disabled={loading} className="w-full">
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>
            </>
          )}

          {step === 3 && (
            <>
              <Input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Button
                onClick={resetPassword}
                disabled={loading}
                className="w-full"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
