import { Check } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ThemeToggle } from "./ThemeToggle";

interface PricingProps {
  onBackToLogin: () => void;
}

export function Pricing({ onBackToLogin }: PricingProps) {
  const tiers = [
    {
      name: "Starter",
      price: "₹9,999",
      period: "/month",
      description: "Perfect for small wholesalers getting started",
      features: [
        "Manage up to 50 farmers",
        "Basic price tracking",
        "Up to 10 transport jobs/month",
        "Email support",
        "Mobile app access",
        "Basic analytics dashboard",
      ],
      cta: "Start Free Trial",
      popular: false,
    },
    {
      name: "Pro",
      price: "₹24,999",
      period: "/month",
      description: "For growing distributors and FPOs",
      features: [
        "Manage up to 500 farmers",
        "Full market intelligence engine",
        "Unlimited transport jobs",
        "Priority support (24/7)",
        "Advanced analytics & reports",
        "API access",
        "Custom integrations",
        "Batch payment processing",
      ],
      cta: "Get Started",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large-scale operations",
      features: [
        "Unlimited farmers",
        "White-label solution",
        "Dedicated account manager",
        "Custom feature development",
        "On-premise deployment option",
        "Advanced security & compliance",
        "Training & onboarding",
        "SLA guarantees",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0e13] overflow-y-auto relative">
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <button
            onClick={onBackToLogin}
            className="text-emerald-500 hover:text-emerald-400 mb-8 inline-block"
          >
            ← Back to Login
          </button>
          <h1 className="text-gray-900 dark:text-white text-5xl mb-4">Choose Your Plan</h1>
          <p className="text-gray-600 dark:text-gray-400 text-xl">
            Select the perfect plan for your agricultural business
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={`bg-white dark:bg-[#0f1419] border-gray-200 dark:border-gray-800 p-8 relative ${
                tier.popular ? "ring-2 ring-emerald-500" : ""
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-4 py-1 rounded-full text-sm">
                  Most Popular
                </div>
              )}

              <h3 className="text-gray-900 dark:text-white text-2xl mb-2">{tier.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 min-h-[3rem]">{tier.description}</p>

              <div className="mb-6">
                <span className="text-gray-900 dark:text-white text-4xl">{tier.price}</span>
                <span className="text-gray-600 dark:text-gray-400">{tier.period}</span>
              </div>

              <Button
                className={`w-full mb-8 ${
                  tier.popular
                    ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                    : "bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
                }`}
              >
                {tier.cta}
              </Button>

              <ul className="space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                    <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center text-gray-600 dark:text-gray-400">
          <p className="mb-4">All plans include a 14-day free trial. No credit card required.</p>
          <p>
            Need a custom solution?{" "}
            <a href="#" className="text-emerald-500 hover:text-emerald-400">
              Contact our sales team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
