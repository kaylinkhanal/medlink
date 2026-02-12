import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-10 bg-foreground">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary fill-primary/30" />
            <span className="text-lg font-bold text-background">MedLink</span>
          </div>

          <div className="flex items-center gap-6">
            {["Privacy", "Terms", "Contact", "About"].map((link) => (
              <a key={link} href="#" className="text-sm text-background/60 hover:text-background transition-colors">
                {link}
              </a>
            ))}
          </div>

          <p className="text-sm text-background/40">
            © 2026 MedLink. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
