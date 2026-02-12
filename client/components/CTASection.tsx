"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart, ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center p-10 sm:p-14 rounded-3xl gradient-primary relative overflow-hidden"
        >
          {/* Dot pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative z-10">
            <Heart className="h-12 w-12 text-primary-foreground/80 mx-auto mb-6 animate-heartbeat" />

            <h2 className="text-2xl sm:text-4xl font-extrabold text-primary-foreground mb-4 leading-tight">
              Join MedLink &amp; Be Someone&apos;s Lifeline Today
            </h2>

            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto leading-relaxed">
              Every donor, every volunteer, every share makes a difference.
              Together, we can build a world where no one faces a medical
              emergency alone.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                variant="hero"
                className="bg-card text-primary hover:bg-card/90 text-base px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                Get Started Free
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="hero"
                className="border-2  shadow-lg hover:shadow-xl text-base px-8 py-6 transition-all rounded-xl"
              >
                Learn More
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
