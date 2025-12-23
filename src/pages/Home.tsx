import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Users, TrendingUp, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContent";
import { useState } from "react";
import TextCursor from "@/components/TextCursor";


const Home = () => {
  const { user } = useAuth();
  const isAuthenticated = !!user;
  const [beeActive, setBeeActive] = useState(false);
  const [pauseBee, setPauseBee] = useState(false);


  return (
   <div className="min-h-screen bg-background font-fredoka">

      <Navbar />
      
      {/* Hero Section */}
      {/* ================= HERO SECTION ================= */}
<section className="relative pt-12 pb-10 text-center overflow-hidden">
  {/* background gradients (UNCHANGED) */}
  <div className="absolute inset-0 bg-gradient-to-br from-honey/5 via-pastel-lavender/10 to-pastel-pink/5 -z-10"></div>
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(250,200,80,0.08),transparent_50%)] -z-10"></div>

  <div className="container mx-auto px-4">
    {/* ⬇️ THIS WRAPPER ALREADY EXISTS — just added relative + min-h */}
    <div
      className="max-w-6xl mx-auto relative min-h-[420px]"
      onMouseEnter={() => setBeeActive(true)}
      onMouseLeave={() => setBeeActive(false)}
    >
      {beeActive && !pauseBee && (
  <TextCursor
    text="🐝"
    active={true}
    spacing={80}
    followMouseDirection
    randomFloat
    exitDuration={0.3}
    removalInterval={20}
    maxPoints={10}
  />
)}

      {/* ⬇️ YOUR HERO CARD (UNCHANGED STYLES) */}
      <div className="bg-card border border-border rounded-2xl p-16 shadow-lg hover:shadow-xl transition-shadow">
        <div className="relative inline-block mb-6">
          <div className="text-6xl animate-float drop-shadow-2xl">🐝</div>
          <div className="absolute inset-0 blur-3xl bg-honey opacity-30 animate-pulse-glow"></div>
        </div>

        <h2 className="text-6xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-black to-gray-900 bg-clip-text text-transparent">
          Your Campus Marketplace
        </h2>

        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          From textbooks and gadgets to tutoring, designing, editing, and tech support —
          SellBee lets you buy, sell, and offer services within your college community.
        </p>

        {/* ⬇️ BUTTON — ONLY WRAPPED, NOT REMOVED */}
        <div
          onMouseEnter={() => setPauseBee(true)}   // ✅ ADDED
          onMouseLeave={() => setPauseBee(false)} // ✅ ADDED
           data-cursor-safe
          className="inline-block"
        >
          <Link to="/marketplace">
            <Button size="lg">Browse Items</Button>
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Skills Offered Section */}
       <section className="container mx-auto px-4 py-16"> 
        <div className="max-w-4xl mx-auto"> 
          <h2 className="text-3xl font-bold text-center mb-4 text-black"> 
            Skills & Services Offered </h2> 
            <div className="bg-card border border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"> 
              <p className="text-center text-base text-muted-foreground mb-6"> Connect with talented students offering various skills and services </p> 
              <div className="grid md:grid-cols-3 gap-5">
                 <Link to="/marketplace?category=Tutoring" className="group"> 
                 <div className="p-4 bg-background rounded-xl border border-border hover:border-honey transition-all hover:scale-105 hover:shadow-md cursor-pointer"> 
                  <h3 className="text-base font-semibold mb-2 text-honey group-hover:text-honey-dark transition-colors">
                    Tutoring</h3> 
                    <p className="text-sm text-muted-foreground">
                      Academic support across subjects</p> </div> </Link> 
                      <Link to="/marketplace?category=Design" className="group"> 
                      <div className="p-4 bg-background rounded-xl border border-border hover:border-honey transition-all hover:scale-105 hover:shadow-md cursor-pointer"> 
                        <h3 className="text-base font-semibold mb-2 text-honey group-hover:text-honey-dark transition-colors">Design & Creative</h3> <p className="text-sm text-muted-foreground">Graphics, video editing, photography</p> </div> </Link> <Link to="/marketplace?category=Development" className="group"> <div className="p-4 bg-background rounded-xl border border-border hover:border-honey transition-all hover:scale-105 hover:shadow-md cursor-pointer"> <h3 className="text-base font-semibold mb-2 text-honey group-hover:text-honey-dark transition-colors">Tech & Development</h3> <p className="text-sm text-muted-foreground">Web development, app creation</p> </div> </Link> </div> </div> </div> </section> {/* Features */} <section className="container mx-auto px-4 py-16"> <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"> <div className="group bg-card p-5 rounded-xl border border-border hover:border-honey transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-honey/20 cursor-pointer"> <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-honey/20 group-hover:scale-110 transition-all duration-300"> <ShoppingBag className="h-6 w-6 text-honey group-hover:rotate-12 transition-transform duration-300" /> </div> <h3 className="text-lg font-semibold mb-2 group-hover:text-honey transition-colors">Easy Buying & Selling</h3> <p className="text-base text-muted-foreground group-hover:text-foreground transition-colors">List items in minutes and connect with buyers instantly</p> </div> <div className="group bg-card p-5 rounded-xl border border-border hover:border-honey transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-honey/20 cursor-pointer"> <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-honey/20 group-hover:scale-110 transition-all duration-300"> <Users className="h-6 w-6 text-honey group-hover:rotate-12 transition-transform duration-300" /> </div> <h3 className="text-lg font-semibold mb-2 group-hover:text-honey transition-colors">College Community</h3> <p className="text-base text-muted-foreground group-hover:text-foreground transition-colors">Trade safely within your trusted campus network</p> </div> <div className="group bg-card p-5 rounded-xl border border-border hover:border-honey transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-honey/20 cursor-pointer"> <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-honey/20 group-hover:scale-110 transition-all duration-300"> <TrendingUp className="h-6 w-6 text-honey group-hover:rotate-12 transition-transform duration-300" /> </div> <h3 className="text-lg font-semibold mb-2 group-hover:text-honey transition-colors">Great Deals</h3> <p className="text-base text-muted-foreground group-hover:text-foreground transition-colors">Find amazing prices on pre-loved items from students</p> </div> <div className="group bg-card p-5 rounded-xl border border-border hover:border-honey transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-honey/20 cursor-pointer"> <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-honey/20 group-hover:scale-110 transition-all duration-300"> <Shield className="h-6 w-6 text-honey group-hover:rotate-12 transition-transform duration-300" /> </div> <h3 className="text-lg font-semibold mb-2 group-hover:text-honey transition-colors">Secure Contact</h3> <p className="text-base text-muted-foreground group-hover:text-foreground transition-colors">Connect via WhatsApp or Telegram for safe transactions</p> </div> </div> </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 text-black">
  What Students Say
</h2>

          <p className="text-base text-center text-muted-foreground mb-12">
            Join thousands of students who trust SellBee
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-xl p-6 hover:border-honey transition-all hover:shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-honey/10 flex items-center justify-center text-xl">👨‍🎓</div>
                <div>
                  <h4 className="font-semibold text-base">Rahul K.</h4>
                  <p className="text-sm text-muted-foreground">Engineering Student</p>
                </div>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">
                "Sold my old textbooks in just 2 days! The campus-only marketplace makes it so much safer and convenient."
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 hover:border-honey transition-all hover:shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-honey/10 flex items-center justify-center text-xl">👩‍💻</div>
                <div>
                  <h4 className="font-semibold text-base">Priya S.</h4>
                  <p className="text-sm text-muted-foreground">Design Student</p>
                </div>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">
                "Found amazing deals on electronics from seniors. Love how easy it is to connect with other students!"
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 hover:border-honey transition-all hover:shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-honey/10 flex items-center justify-center text-xl">👨‍🔬</div>
                <div>
                  <h4 className="font-semibold text-base">Arjun M.</h4>
                  <p className="text-sm text-muted-foreground">MBA Student</p>
                </div>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">
                "The skills marketplace helped me find a tutor for my course. Great platform for students helping students!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="container mx-auto px-4 py-16">
          <div className="bg-gradient-to-r from-honey/10 to-honey-dark/10 rounded-2xl p-10 text-center border border-honey/20 shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Ready to start trading?</h2>
            <p className="text-lg text-muted-foreground mb-8">Join your campus marketplace today</p>
            <Button asChild size="lg">
              <Link to="/auth">Create Account</Link>
            </Button>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 SellBee. Your trusted campus marketplace.</p>
        </div>
      </footer>

    </div>
  );
};

export default Home;
