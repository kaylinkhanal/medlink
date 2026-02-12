"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Blood Recipient",
    text: "MedLink connected me with a donor in under 30 minutes during an emergency. I owe my life to this platform and the incredible community behind it.",
    avatar: "SM",
    rating: 5,
  },
  {
    name: "Dr. James Chen",
    role: "Verified Doctor",
    text: "As a healthcare professional, MedLink bridges the gap between patients in need and the help they deserve. The verification system builds real trust.",
    avatar: "JC",
    rating: 5,
  },
  {
    name: "Amara Osei",
    role: "Organ Donor",
    text: "Registering as an organ donor was seamless. Knowing I could save someone's life someday gives me an incredible sense of purpose.",
    avatar: "AO",
    rating: 5,
  },
];

const Testimonials = () => {
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
            Stories That Inspire
          </h2>
          <p className="text-muted-foreground">Real people, real impact</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="relative p-6 rounded-2xl bg-card border border-border shadow-card"
            >
              <Quote className="h-8 w-8 text-primary/15 absolute top-4 right-4" />

              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">
                    {t.name}
                  </div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
