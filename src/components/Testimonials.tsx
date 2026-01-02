import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

type TestimonialUser = {
  name: string;
  collegeId: string;
  testimonial: string | null;
};

const VISIBLE_COUNT = 3;
const AUTO_SCROLL_MS = 3500;

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<TestimonialUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(VISIBLE_COUNT); // start after clones
  const [isHovered, setIsHovered] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  // 📥 Fetch testimonials
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(
          "https://sellbee-backend-7gny.onrender.com/users/testimonials"
        );
        const data = await res.json();
        setTestimonials(data.filter((t: TestimonialUser) => t.testimonial));
      } catch (err) {
        console.error("Failed to fetch testimonials", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // 🧬 Create infinite loop clones
  const extended =
    testimonials.length >= VISIBLE_COUNT
      ? [
          ...testimonials.slice(-VISIBLE_COUNT),
          ...testimonials,
          ...testimonials.slice(0, VISIBLE_COUNT),
        ]
      : testimonials;

  // 🔄 Auto slide (pause on hover)
  useEffect(() => {
    if (isHovered || testimonials.length <= VISIBLE_COUNT) return;

    const timer = setInterval(() => {
      setIndex((i) => i + 1);
    }, AUTO_SCROLL_MS);

    return () => clearInterval(timer);
  }, [isHovered, testimonials]);

  // 🪄 Infinite loop smoothing
  useEffect(() => {
    if (!trackRef.current) return;

    const maxIndex = testimonials.length + VISIBLE_COUNT;
    const minIndex = VISIBLE_COUNT;

    if (index === maxIndex) {
      // jump to real start
      setTimeout(() => {
        trackRef.current!.style.transition = "none";
        setIndex(minIndex);
        trackRef.current!.offsetHeight; // reflow
        trackRef.current!.style.transition = "transform 600ms ease";
      }, 600);
    }

    if (index === 0) {
      // jump to real end
      setTimeout(() => {
        trackRef.current!.style.transition = "none";
        setIndex(testimonials.length);
        trackRef.current!.offsetHeight;
        trackRef.current!.style.transition = "transform 600ms ease";
      }, 600);
    }
  }, [index, testimonials.length]);

  if (loading || testimonials.length === 0) return null;

  return (
    <section className="py-12 overflow-hidden">
      <h2 className="text-3xl font-bold text-center mb-3">
        What Students <span className="text-yellow-400">Say</span>
      </h2>

      <p className="text-base text-center text-muted-foreground mb-10">
        Join thousands of students who trust SellBee
      </p>

      <div
        className="relative max-w-7xl mx-auto px-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* ⬅️ Arrow Left */}
        <button
          onClick={() => setIndex((i) => i - 1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur p-2 rounded-full shadow hover:scale-105 transition"
        >
          <ChevronLeft />
        </button>

        {/* ➡️ Arrow Right */}
        <button
          onClick={() => setIndex((i) => i + 1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur p-2 rounded-full shadow hover:scale-105 transition"
        >
          <ChevronRight />
        </button>

        {/* 🎠 Carousel */}
        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex transition-transform duration-600 ease-in-out"
            style={{
              transform: `translateX(-${(index * 100) / VISIBLE_COUNT}%)`,
            }}
          >
            {extended.map((u, i) => (
              <div
                key={i}
                className="
                  w-full
                  sm:w-1/2
                  lg:w-1/3
                  flex-shrink-0
                  px-3
                "
              >
                <Card className="h-full">
                  <CardContent className="p-6 space-y-4 text-center">
                    <p className="italic text-sm md:text-base">
                      “{u.testimonial}”
                    </p>
                    <div>
                      <p className="font-semibold">{u.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {u.collegeId}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
