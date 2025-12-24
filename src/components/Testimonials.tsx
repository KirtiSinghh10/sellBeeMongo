import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

type TestimonialUser = {
  name: string;
  collegeId: string;
  testimonial: string;
};

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<TestimonialUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("http://localhost:5000/users/testimonials");
        const data = await res.json();
        setTestimonials(data);
      } catch (err) {
        console.error("Failed to fetch testimonials", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading || testimonials.length === 0) return null;

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-3">
        What Students 
        <span className="text-yellow-400 mb-5"> Say </span>
      </h2>

       <p className="text-base text-center text-muted-foreground mb-12">
            Join thousands of students who trust SellBee
          </p>

      <div className="grid gap-6  md:grid-cols-3 max-w-6xl mx-auto px-4">
        {testimonials.map((u, i) => (
          <Card key={i}>
            <CardContent className="p-6 space-y-4">
              <p className="italic">“{u.testimonial}”</p>

              <div>
                <p className="font-semibold">{u.name}</p>
                <p className="text-sm text-muted-foreground">
                  {u.collegeId}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
