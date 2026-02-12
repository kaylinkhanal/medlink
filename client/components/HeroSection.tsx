"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart, Shield } from "lucide-react";
// Fallback to a high-quality medical background image
const heroBg = "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2000";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center gradient-hero overflow-hidden pt-16">
      {/* Background image overlay */}
      <div className="absolute inset-0 opacity-10">
        <img src={heroBg} alt="" className="w-full h-full object-cover" aria-hidden="true" />
      </div>

      {/* Heartbeat line decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-px heartbeat-line" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <Heart className="h-4 w-4 animate-heartbeat" />
              Saving lives, one connection at a time
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6">
              Connecting Lives,{" "}
              <span className="text-gradient">Care</span>{" "}
              &amp; Communities
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              A social platform for emergency medical help, blood &amp; organ donation, and verified medical support — bringing hope when it matters most.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button variant="emergency" size="lg" className="text-base px-8 py-6 rounded-xl">
              <Shield className="h-5 w-5 mr-2" />
              Request Emergency Help
            </Button>
            <Button variant="hero" size="lg" className="text-base px-8 py-6 rounded-xl">
              <Heart className="h-5 w-5 mr-2" />
              Become a Donor
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 text-sm text-muted-foreground"
          >
            Trusted by 50,000+ donors &amp; medical professionals
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
