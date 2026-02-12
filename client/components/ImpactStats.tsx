"use client";

import { motion } from "framer-motion";
import { Heart, Users, ShieldCheck, Activity } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const stats = [
  { icon: Heart, value: 12540, label: "Lives Saved", suffix: "+" },
  { icon: Users, value: 48200, label: "Active Donors", suffix: "+" },
  { icon: ShieldCheck, value: 3800, label: "Emergency Cases Handled", suffix: "+" },
  { icon: Activity, value: 1200, label: "Verified Doctors", suffix: "+" },
];

function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [started, target, duration]);

  return { count, ref };
}

const ImpactStats = () => {
  return (
    <section className="py-20 gradient-primary relative overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
        backgroundSize: "32px 32px"
      }} />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-primary-foreground mb-2">
            Our Impact in Numbers
          </h2>
          <p className="text-primary-foreground/70">Real lives, real impact, every single day</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, i) => {
            const { count, ref } = useCountUp(stat.value);
            return (
              <motion.div
                key={stat.label}
                ref={ref}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <stat.icon className="h-8 w-8 text-primary-foreground/80 mx-auto mb-3" />
                <div className="text-3xl sm:text-4xl font-extrabold text-primary-foreground mb-1">
                  {count.toLocaleString()}{stat.suffix}
                </div>
                <div className="text-sm text-primary-foreground/70 font-medium">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
