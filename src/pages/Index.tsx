import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { FeatureCards } from "@/components/FeatureCards";
import { QuickActions } from "@/components/QuickActions";
import { Footer } from "@/components/Footer";
import { SOSButton } from "@/components/SOSButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeatureCards />
        <QuickActions />
      </main>
      <Footer />
      <SOSButton />
    </div>
  );
};

export default Index;
