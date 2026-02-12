import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import EmergencyPanel from "@/components/EmergencyPanel";
import HowItWorks from "@/components/HowItWorks";
import FeaturesGrid from "@/components/FeaturesGrid";
import ImpactStats from "@/components/ImpactStats";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <EmergencyPanel />
      <HowItWorks />
      <FeaturesGrid />
      <ImpactStats />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
