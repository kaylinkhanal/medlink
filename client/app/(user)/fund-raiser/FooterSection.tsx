import { Facebook, TwitterIcon } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="border-t border-white/6 bg-slate-50/70 backdrop-blur-sm">
      <div className="container px-6 py-8">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <div className="font-semibold text-foreground mb-2">MedLink</div>
          <p className="mb-3">Help people save their lives — every share and donation helps.</p>

          <div className="flex items-center justify-center gap-4 mb-4">
            <a href="#" className="text-blue-800">
              <Facebook className="w-5 h-5 inline-block mr-1" />
            </a>
            <a href="#" className="text-sky-500 hover:underline">
              <TwitterIcon className="w-5 h-5 inline-block mr-1"/>
            </a>
          </div>

          <div className="text-xs text-muted-foreground">© 2026 MedLink. All donations are tax-deductible.</div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
