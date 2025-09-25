import { FeaturesSection } from "@/components/features-section";
import { HeroSection } from "@/components/hero-section";
import { QuickLinks } from "@/components/quick-links";
import { RouteFinder } from "@/components/route-finder";

export default function Home() {
  return (
    <div className="min-h-screen">

      {/* Hero Section */}
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
  );
}
