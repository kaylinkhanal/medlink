"use client";

import { motion } from "framer-motion";
import { Heart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navLinks = ["Home", "Donate", "Emergency", "Doctors", "Community"];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border"
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <a href="/home" className="flex items-center gap-2">
          <Heart className="h-7 w-7 text-primary fill-primary/20" />
          <span className="text-xl font-bold text-gradient">MedLink</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm">Sign In</Button>
          <Button variant="hero" size="sm">Join MedLink</Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden bg-card border-b border-border px-4 pb-4"
        >
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary"
              onClick={() => setOpen(false)}
            >
              {link}
            </a>
          ))}
          <div className="flex gap-2 mt-3">
            <Button variant="ghost" size="sm" className="flex-1">Sign In</Button>
            <Button variant="hero" size="sm" className="flex-1">Join</Button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
