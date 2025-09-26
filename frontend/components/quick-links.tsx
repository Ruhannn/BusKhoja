"use client";

import { motion } from "framer-motion";
import { Bus, MapPin, TrendingUp } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { Marquee } from "./ui/marquee";

const popularRoutes = [
  { from: "Mirpur", to: "Airport", fare: "৳20" },
  { from: "Dhanmondi", to: "Gulshan", fare: "৳30" },
  { from: "Old Dhaka", to: "New Market", fare: "৳20" },
  { from: "Banani", to: "Gazipur", fare: "৳40" },
  { from: "Motijheel", to: "Uttara", fare: "৳60" },
  { from: "Jamuna Future Park", to: "Gulshan", fare: "৳20" },
  { from: "Air Port", to: "Badda", fare: "৳40" },
];

export function QuickLinks() {
  return (
    <div className="space-y-12">
      {/* Popular Routes */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Popular Routes</h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TrendingUp className="h-4 w-4" />
            Most searched today
          </div>
        </div>
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <Marquee pauseOnHover repeat={5} className="[--duration:130s]">
            {popularRoutes.map((route, i) => (
              <motion.div key={i}>
                <Card className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02] lg:min-w-[300px]">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                          <MapPin className="h-4 w-4 text-primary" />
                          {route.from}
                        </div>
                        <div className="my-2 flex items-center">
                          <div className="h-px flex-1 bg-border"></div>
                          <Bus className="mx-2 h-4 w-4 text-muted-foreground" />
                          <div className="h-px flex-1 bg-border"></div>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                          <MapPin className="h-4 w-4 text-primary" />
                          {route.to}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="text-lg font-bold text-primary">{route.fare}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Marquee>
          <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
          <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
        </div>
      </motion.div>
    </div>
  );
}
