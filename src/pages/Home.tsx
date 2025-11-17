import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Users, TrendingUp, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen bg-background font-fredoka">
      <Navbar />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="text-6xl mb-6 animate-float">🐝</div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-honey via-honey-light to-honey bg-clip-text text-transparent">
            Your Campus Marketplace
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Buy and sell used items within your college community. From textbooks to gadgets, find everything you need or give your unused items a new home.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild className="text-lg px-8">
              <Link to="/marketplace">Browse Items</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8">
              <Link to="/auth">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="group bg-card p-6 rounded-2xl border border-border hover:border-honey transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-honey/20 cursor-pointer">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-honey/20 group-hover:scale-110 transition-all duration-300">
              <ShoppingBag className="h-6 w-6 text-honey group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-honey transition-colors">Easy Buying & Selling</h3>
            <p className="text-muted-foreground group-hover:text-foreground transition-colors">List items in minutes and connect with buyers instantly</p>
          </div>

          <div className="group bg-card p-6 rounded-2xl border border-border hover:border-honey transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-honey/20 cursor-pointer">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-honey/20 group-hover:scale-110 transition-all duration-300">
              <Users className="h-6 w-6 text-honey group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-honey transition-colors">College Community</h3>
            <p className="text-muted-foreground group-hover:text-foreground transition-colors">Trade safely within your trusted campus network</p>
          </div>

          <div className="group bg-card p-6 rounded-2xl border border-border hover:border-honey transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-honey/20 cursor-pointer">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-honey/20 group-hover:scale-110 transition-all duration-300">
              <TrendingUp className="h-6 w-6 text-honey group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-honey transition-colors">Great Deals</h3>
            <p className="text-muted-foreground group-hover:text-foreground transition-colors">Find amazing prices on pre-loved items from students</p>
          </div>

          <div className="group bg-card p-6 rounded-2xl border border-border hover:border-honey transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-honey/20 cursor-pointer">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-honey/20 group-hover:scale-110 transition-all duration-300">
              <Shield className="h-6 w-6 text-honey group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-honey transition-colors">Secure Contact</h3>
            <p className="text-muted-foreground group-hover:text-foreground transition-colors">Connect via WhatsApp or Telegram for safe transactions</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-honey/10 to-honey-dark/10 rounded-3xl p-12 text-center border border-honey/20">
          <h2 className="text-4xl font-bold mb-4">Ready to start trading?</h2>
          <p className="text-xl text-muted-foreground mb-8">Join your campus marketplace today</p>
          <Button size="lg" asChild className="text-lg px-8">
            <Link to="/auth">Create Account</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 SellBee. Your trusted campus marketplace.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
