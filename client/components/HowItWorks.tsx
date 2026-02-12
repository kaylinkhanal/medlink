"use client";

import { motion } from "framer-motion";
import { FileEdit, Users, HeartPulse } from "lucide-react";

const steps = [
  {
    icon: FileEdit,
    step: "01",
    title: "Post Your Medical Need",
    description:
      "Share your medical request — blood type, organ need, or emergency details.",
  },
  {
    icon: Users,
    step: "02",
    title: "Get Matched Instantly",
    description:
      "Our smart system connects you with verified donors and medical professionals nearby.",
  },
  {
    icon: HeartPulse,
    step: "03",
    title: "Save Lives Together",
    description:
      "Coordinate, communicate, and make a life-saving impact as a community.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            How <span className="text-gradient">MedLink</span> Works
          </h2>
          <p className="text-muted-foreground">
            Three simple steps to make a difference
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative text-center"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-gradient-to-r from-primary/30 to-secondary/30" />
              )}

              <div className="relative inline-flex items-center justify-center mb-6">
                <div className="w-24 h-24 rounded-2xl gradient-primary flex items-center justify-center shadow-lg">
                  <step.icon className="h-10 w-10 text-primary-foreground" />
                </div>
                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-card border-2 border-primary text-primary text-xs font-bold flex items-center justify-center shadow-sm">
                  {step.step}
                </span>
              </div>

              <h3 className="text-lg font-bold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
