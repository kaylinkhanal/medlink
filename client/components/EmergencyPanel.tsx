"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Droplets, HeartHandshake, MapPin } from "lucide-react";

const actions = [
  {
    icon: AlertTriangle,
    title: "Emergency Alert",
    description: "Broadcast an SOS to nearby helpers",
    color: "bg-emergency/10 text-emergency",
    iconColor: "text-emergency",
  },
  {
    icon: Droplets,
    title: "Blood Request",
    description: "Find matching blood donors fast",
    color: "bg-primary/10 text-primary",
    iconColor: "text-primary",
  },
  {
    icon: HeartHandshake,
    title: "Organ Donation",
    description: "Register as an organ donor",
    color: "bg-secondary/10 text-secondary",
    iconColor: "text-secondary",
  },
  {
    icon: MapPin,
    title: "Nearby Hospitals",
    description: "Locate hospitals & clinics near you",
    color: "bg-accent text-accent-foreground",
    iconColor: "text-accent-foreground",
  },
];

const EmergencyPanel = () => {
  return (
    <section className="py-16 bg-card" id="emergency">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Quick Actions
          </h2>
          <p className="text-muted-foreground">
            Instant access when every second counts
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {actions.map((action, i) => (
            <motion.button
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-card border border-border shadow-card hover:shadow-card-hover transition-shadow cursor-pointer"
            >
              <div className={`p-3 rounded-xl ${action.color}`}>
                <action.icon className={`h-6 w-6 ${action.iconColor}`} />
              </div>
              <span className="font-semibold text-foreground text-sm">
                {action.title}
              </span>
              <span className="text-xs text-muted-foreground text-center">
                {action.description}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmergencyPanel;
