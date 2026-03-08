import { useState, useEffect } from "react";
import { Bus, Utensils, MapPinned, Calendar, Shield, HeadphonesIcon } from "lucide-react";

interface Service {
  icon: string;
  title: string;
  description: string;
  features: string[];
  color: "primary" | "accent" | "nature";
}

// Map backend icon strings to React icons
const iconMap = {
  bus: Bus,
  food: Utensils,
  route: MapPinned
};

// Additional features not coming from backend
const additionalFeatures = [
  { icon: Calendar, title: "Easy Scheduling", description: "Book trips weeks in advance" },
  { icon: Shield, title: "Full Insurance", description: "Comprehensive trip coverage" },
  { icon: HeadphonesIcon, title: "24/7 Support", description: "Help when you need it" }
];

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);

  // Fetch services from backend exactly like Destinations
  useEffect(() => {
    fetch("http://localhost:5000/service/get-all")
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error(err));
  }, []);

  const getColorClasses = (color: Service["color"]) => {
    const colors = {
      primary: "bg-primary/10 text-primary border-primary/20",
      accent: "bg-accent/10 text-accent border-accent/20",
      nature: "bg-nature/10 text-nature border-nature/20"
    };
    return colors[color];
  };

  const getIconBgClasses = (color: Service["color"]) => {
    const colors = {
      primary: "gradient-hero",
      accent: "gradient-accent",
      nature: "gradient-nature"
    };
    return colors[color];
  };

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent font-medium text-sm mb-4">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Everything You Need for a{" "}
            <span className="text-gradient-accent">Perfect Trip</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From transportation to meals, we've got every detail covered so you can focus on creating memorable experiences.
          </p>
        </div>

        {/* Main Services */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap];
            return (
              <div key={service.title} className="bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2 border border-border">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl ${getIconBgClasses(service.color)} flex items-center justify-center mb-6 shadow-lg`}>
                  {Icon && <Icon className="w-8 h-8 text-white" />}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-display font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>

                {/* Features */}
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm">
                      <span className={`w-6 h-6 rounded-full ${getColorClasses(service.color)} flex items-center justify-center text-xs font-bold`}>✓</span>
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Additional Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {additionalFeatures.map((feature) => (
            <div key={feature.title} className="flex gap-4">
              <feature.icon className="w-6 h-6 text-primary" />
              <div>
                <h4 className="font-display font-bold text-foreground mb-1">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;