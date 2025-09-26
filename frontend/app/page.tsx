import Chat from "@/components/chat";
import { FeaturesSection } from "@/components/features-section";
import { HeroSection } from "@/components/hero-section";
import { QuickLinks } from "@/components/quick-links";
import { RouteFinder } from "@/components/route-finder";
import { Particles } from "@/components/ui/particles";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <Particles
        className="absolute inset-0 z-0"
        quantity={350}
        ease={80}
        color="#000000"
        refresh
      />
      <Chat />
      {/* Hero Section */}
      <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32 z-10">
        <HeroSection />

        {/* Route Finder */}
        <section id="route-finder" className="px-4 py-16 sm:px-6 lg:px-8">
          <RouteFinder />
        </section>

        {/* Features Section */}
        <FeaturesSection />

        {/* Quick Links */}
        <section className="px-4 py-16 sm:px-6 lg:px-8 bg-muted/20">
          <div className="mx-auto max-w-6xl">
            <QuickLinks />
          </div>
        </section>
      </div>

    </div>
  );
}
