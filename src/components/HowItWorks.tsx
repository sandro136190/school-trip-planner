import { useEffect, useState } from "react";
import { ClipboardList, Bus, UtensilsCrossed, PartyPopper } from "lucide-react";
import { Button } from "./ui/button";

interface Step {
  _id: string;
  number: string;
  icon: string;
  title: string;
  description: string;
  color: string;
}

const iconMap: any = {
  ClipboardList: ClipboardList,
  Bus: Bus,
  UtensilsCrossed: UtensilsCrossed,
  PartyPopper: PartyPopper,
};

const HowItWorks = () => {
  const [steps, setSteps] = useState<Step[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/steps/get-all")
      .then((res) => res.json())
      .then((data) => setSteps(data))
      .catch((err) => console.error(err));
  }, []);

  const getGradientClass = (color: string) => {
    const gradients: Record<string, string> = {
      primary: "gradient-hero",
      sky: "bg-sky",
      accent: "gradient-accent",
      nature: "gradient-nature",
    };
    return gradients[color] || "gradient-hero";
  };

  return (
    <section className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {steps.map((step) => {

            const Icon = iconMap[step.icon];

            return (
              <div key={step._id} className="bg-card rounded-2xl p-6 shadow-card">

                <div className="flex items-center justify-between mb-6">

                  <span className="text-5xl font-bold text-muted/50">
                    {step.number}
                  </span>

                  <div className={`w-14 h-14 rounded-xl ${getGradientClass(step.color)} flex items-center justify-center`}>

                    {Icon && <Icon className="w-7 h-7 text-white" />}

                  </div>

                </div>

                <h3 className="text-xl font-bold mb-3">
                  {step.title}
                </h3>

                <p className="text-muted-foreground text-sm">
                  {step.description}
                </p>

              </div>
            );
          })}

        </div>

        <div className="text-center mt-12">
          <Button>Start Planning Today</Button>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;