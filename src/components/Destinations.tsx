import { useEffect, useState } from "react";
import { MapPin, Clock, Star } from "lucide-react";
import { Button } from "./ui/button";

interface Destination {
  _id: string;
  name: string;
  description: string;
  image: string;
  duration: string;
  rating: number;
  tags: string[];
  hight: number;
}

const BACKEND_URL = "http://localhost:5000"; // <-- make sure this matches your backend

const Destinations = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${BACKEND_URL}/destinations/get-all`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch destinations");
        return res.json();
      })
      .then((data) => {
        setDestinations(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not load destinations");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center py-20">Loading destinations...</p>;
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>;

  return (
    <section id="destinations" className="py-20 lg:py-32 bg-secondary/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
            Popular Destinations
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Discover Georgia's <span className="text-gradient">Hidden Treasures</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose from our curated selection of educational and adventure destinations perfect for unforgettable school trips.
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination, index) => (
            <div
              key={destination._id}
              className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={`${BACKEND_URL}${destination.image}`} // <-- prepend backend URL
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />

                {/* Rating */}
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-golden text-golden-foreground text-sm font-semibold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  {destination.rating}
                </div>

                {/* Height */}
                <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full bg-white text-golden-foreground text-sm font-semibold">
                  {destination.hight}m
                </div>

                {/* Duration */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1 px-3 py-1 rounded-full bg-background/90 backdrop-blur-sm text-sm font-medium">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  {destination.duration}
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-display font-bold text-foreground mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  {destination.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{destination.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {destination.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Button variant="outline" size="sm" className="w-full">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="default" size="lg">View All Destinations</Button>
        </div>
      </div>
    </section>
  );
};

export default Destinations;