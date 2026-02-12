"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  Droplets,
  HeartHandshake,
  ShieldCheck,
  MessageCircle,
  Rss,
} from "lucide-react";

const features = [
  {
    icon: AlertTriangle,
    title: "Emergency Alerts",
    description: "Broadcast SOS to your network and nearby verified responders instantly.",
    color: "bg-emergency/10",
    iconColor: "text-emergency",
  },
  {
    icon: Droplets,
    title: "Blood Donation Matching",
    description: "Smart matching by blood type, location, and availability for urgent transfusions.",
    color: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    icon: HeartHandshake,
    title: "Organ Donation Registry",
    description: "Secure organ donor registration with privacy-first verified profiles.",
    color: "bg-secondary/10",
    iconColor: "text-secondary",
  },
  {
    icon: ShieldCheck,
    title: "Verified Doctors",
    description: "Connect with credential-verified medical professionals for trusted advice.",
    color: "bg-accent",
    iconColor: "text-accent-foreground",
  },
  {
    icon: MessageCircle,
    title: "Real-time Chat",
    description: "Secure messaging between patients, donors, and healthcare providers.",
    color: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    icon: Rss,
    title: "Smart Medical Feed",
    description: "Personalized health updates, donation drives, and community stories.",
    color: "bg-secondary/10",
    iconColor: "text-secondary",
  },
];

const FeaturesGrid = () => {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Core Features
          </h2>
          <p className="text-muted-foreground">Everything you need to save and support lives</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-background border border-border shadow-card hover:shadow-card-hover transition-all duration-300"
            >
              <div className={`inline-flex p-3 rounded-xl ${feature.color} mb-4`}>
                <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
              </div>
              <h3 className="text-base font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
