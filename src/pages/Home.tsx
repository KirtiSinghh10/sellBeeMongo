import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Users, TrendingUp, Shield } from "lucide-react";
import { useAuth } from "@/context/AuthContent";
import TextCursor from "@/components/TextCursor";
import Testimonials from "@/components/Testimonials";

const Home = () => {
  const { user } = useAuth();
  const isAuthenticated = !!user;

  const [beeActive, setBeeActive] = useState(false);
  const [pauseBee, setPauseBee] = useState(false);

  return (
    <div className="min-h-screen font-fredoka">
      <Navbar />



{/* ================= HERO SECTION ================= */}
<section className="mx-auto px-3 pt-12 pb-10">
  
 <div className="
  relative
  max-w-7xl
  mx-auto
  bg-gradient-to-br from-honey/50 via-honey/5 to-pastel-lavender/10
  rounded-3xl
  p-16
  text-center
  border border-honey/20
  overflow-hidden
">

     {/* ================= EXTRA AMBIENT ANIMATIONS ================= */}
<div className="absolute inset-0 pointer-events-none">

  {/* Tiny floating dots */}
  <div className="absolute top-[12%] left-[18%] w-1 h-1 bg-honey/40 rounded-full animate-pulse" />
  <div className="absolute top-[22%] right-[28%] w-1.5 h-1.5 bg-honey-light/35 rounded-full animate-pulse" style={{ animationDelay: "0.6s" }} />
  <div className="absolute bottom-[18%] left-[32%] w-1 h-1 bg-pastel-lavender/40 rounded-full animate-pulse" style={{ animationDelay: "1.2s" }} />
  <div className="absolute bottom-[28%] right-[18%] w-1.5 h-1.5 bg-honey/35 rounded-full animate-pulse" style={{ animationDelay: "0.9s" }} />

  {/* Extra floating emojis (low opacity) */}
  <div className="absolute top-[8%] left-[42%] text-3xl opacity-25 animate-float" style={{ animationDelay: "2.4s" }}>✨</div>
  <div className="absolute bottom-[12%] right-[38%] text-3xl opacity-10 animate-float" style={{ animationDelay: "3s" }}>🐝</div>
  <div className="absolute top-[48%] right-[6%] text-3xl opacity-10 animate-float" style={{ animationDelay: "1.8s" }}>📦</div>

  {/* Soft drifting glow streaks */}
<div className="absolute top-[30%] left-[0%] w-40 h-40 bg-honey/10 blur-3xl animate-float" style={{ animationDelay: "4s" }} />
<div className="absolute bottom-[10%] right-[0%] w-32 h-32 bg-pastel-lavender/15 blur-3xl animate-float" style={{ animationDelay: "5s" }} />


  {/* Micro rings */}
  <div className="absolute top-[35%] left-[8%] w-6 h-6 border border-honey/15 rounded-full animate-float" style={{ animationDelay: "2.2s" }} />
  <div className="absolute bottom-[40%] right-[12%] w-5 h-5 border border-pastel-pink/20 rounded-full animate-float" style={{ animationDelay: "2.8s" }} />
</div>

    {/* ================= Decorative blurred circles ================= */}
    <div className="absolute top-0 left-0 w-40 h-40 bg-honey/15 rounded-full blur-3xl" />
    <div className="absolute bottom-0 right-0 w-48 h-48 bg-pastel-pink/25 rounded-full blur-3xl" />
    <div className="absolute top-1/2 left-0 w-32 h-32 bg-pastel-lavender/30 rounded-full blur-2xl" />
    <div className="absolute bottom-1/3 right-10 w-36 h-36 bg-pastel-mint/20 rounded-full blur-2xl" />
    <div className="absolute top-10 right-1/3 w-24 h-24 bg-honey-light/20 rounded-full blur-xl" />
    <div className="absolute top-1/4 right-0 w-28 h-28 bg-honey/20 rounded-full blur-2xl" />
    <div className="absolute bottom-10 left-1/3 w-20 h-20 bg-pastel-lavender/25 rounded-full blur-xl" />

    {/* ================= Floating emojis ================= */}
    <div className="absolute top-1/2 left-[10%] text-5xl opacity-30 animate-float">🐝</div>
    <div className="absolute top-[20%] right-[15%] text-4xl opacity-10 animate-float" style={{ animationDelay: "1s" }}>🍯</div>
    <div className="absolute bottom-[25%] left-[20%] text-3xl opacity-10 animate-float" style={{ animationDelay: "0.5s" }}>📦</div>
    <div className="absolute top-[30%] left-[5%] text-4xl opacity-10 animate-float" style={{ animationDelay: "1.5s" }}>📚</div>
    <div className="absolute bottom-[20%] right-[8%] text-5xl opacity-15 animate-float" style={{ animationDelay: "2s" }}>🐝</div>
    <div className="absolute top-[15%] left-[30%] text-3xl opacity-20 animate-float" style={{ animationDelay: "0.8s" }}>💡</div>
    <div className="absolute bottom-[35%] right-[25%] text-3xl opacity-15 animate-float" style={{ animationDelay: "1.2s" }}>🎓</div>
    <div className="absolute top-[70%] left-[40%] text-3xl opacity-30 animate-float" style={{ animationDelay: "1.8s" }}>✨</div>
    <div className="absolute top-[10%] right-[35%] text-4xl opacity-20 animate-float" style={{ animationDelay: "2.2s" }}>🛒</div>

    {/* ================= Hexagon patterns ================= */}
    <div className="absolute top-8 left-[15%] w-16 h-16 border-2 border-honey/10 rotate-12"
      style={{ clipPath: "polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)" }} />
    <div className="absolute bottom-12 right-[20%] w-20 h-20 border-2 border-honey/10 -rotate-6"
      style={{ clipPath: "polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)" }} />
    <div className="absolute top-1/3 right-[5%] w-12 h-12 border-2 border-pastel-lavender/20 rotate-45"
      style={{ clipPath: "polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)" }} />

    {/* ================= Sparkle dots ================= */}
    <div className="absolute top-[25%] left-[25%] w-2 h-2 bg-honey/40 rounded-full animate-pulse" />
    <div className="absolute top-[40%] right-[30%] w-1.5 h-1.5 bg-honey/30 rounded-full animate-pulse" />
    <div className="absolute bottom-[30%] left-[35%] w-2 h-2 bg-honey-light/40 rounded-full animate-pulse" />
    <div className="absolute top-[60%] right-[15%] w-1.5 h-1.5 bg-pastel-pink/40 rounded-full animate-pulse" />

    {/* ================= HERO CONTENT ================= */}
    <div className="relative z-10 max-w-4xl mx-auto">

      <div className="relative inline-block mb-6">
        <div className="text-6xl animate-float drop-shadow-2xl">🐝</div>
        <div className="absolute inset-0 blur-3xl bg-honey opacity-30 animate-pulse-glow" />
      </div>

      <h2 className="text-5xl md:text-6xl font-bold mb-6">
        Your Campus Marketplace
      </h2>

      <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
        From textbooks and gadgets to tutoring, designing, editing, and tech
        support — SellBee lets you buy, sell, and offer services within your
        college community.
      </p>

      <Link to="/marketplace">
        <Button size="lg">Browse Items</Button>
      </Link>
    </div>
  </div>
</section>


      {/* ================= SKILLS SECTION ================= */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 text-black">
            Skills & Services 
             <span className="text-yellow-400 mb-5"> Offered </span>
          </h2>
          <p className="text-center text-muted-foreground mb-6">
              Connect with talented students offering various skills and services
            </p>
          <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
      

            <div className="grid md:grid-cols-3 gap-5">
              <Link to="/marketplace?category=Tutoring">
                <div className="p-4 bg-background rounded-xl border hover:border-honey transition-all hover:scale-105 hover:shadow-md">
                  <h3 className="font-semibold text-honey mb-2">Tutoring</h3>
                  <p className="text-sm text-muted-foreground">
                    Academic support across subjects
                  </p>
                </div>
              </Link>

              <Link to="/marketplace?category=Design">
                <div className="p-4 bg-background rounded-xl border hover:border-honey transition-all hover:scale-105 hover:shadow-md">
                  <h3 className="font-semibold text-honey mb-2">
                    Design & Creative
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Graphics, video editing, photography
                  </p>
                </div>
              </Link>

              <Link to="/marketplace?category=Development">
                <div className="p-4 bg-background rounded-xl border hover:border-honey transition-all hover:scale-105 hover:shadow-md">
                  <h3 className="font-semibold text-honey mb-2">
                    Tech & Development
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Web & app development
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="container mx-auto px-4 py-12">
         <h2 className="text-4xl font-bold text-center mb-2 text-black">
  Why choose{" "}
  <span className="font-story">
    <span className="text-black mb-5">Sell</span>
    <span className="text-yellow-400 mb-5">Bee </span>
  </span>
  ?
</h2>
          <p className="text-base text-center text-muted-foreground mt-1 mb-12">
            Everything you need for campus trading
          </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: ShoppingBag,
              title: "Easy Buying & Selling",
              desc: "List items in minutes and connect with buyers instantly",
            },
            {
              icon: Users,
              title: "College Community",
              desc: "Trade safely within your trusted campus network",
            },
            {
              icon: TrendingUp,
              title: "Great Deals",
              desc:"Find amazing prices on pre-loved items from students",
            },
            {
              icon: Shield,
              title: "Secure Contact",
              desc: "Connect via WhatsApp or Telegram for safe transactions",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="bg-card p-5 rounded-xl border hover:border-honey transition-all hover:scale-105 hover:shadow-lg"
            >
              <f.icon className="h-6 w-6 text-honey mb-4" />
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <Testimonials/>

      {/* ================= CTA ================= */}
      {!isAuthenticated && (
        <section className="container mx-auto px-4 py-16">
          <div className="bg-gradient-to-r from-honey/10 to-honey-dark/10 rounded-2xl p-10 text-center border border-honey/20 shadow-lg">
            <h2 className="text-3xl font-bold mb-4">
              Ready to start trading?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join your campus marketplace today
            </p>
            <Button asChild size="lg">
              <Link to="/auth">Create Account</Link>
            </Button>
          </div>
        </section>
      )}

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 SellBee. Your trusted campus marketplace.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
