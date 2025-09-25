"use client";

import { motion } from "framer-motion";
import { Banknote, Clock, MapPin, Search, Shield, Users } from "lucide-react";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";

import { Pointer } from "./ui/pointer";

const features = [
  {
    icon: Banknote,
    title: "Real-time Fares",
    description: "Get accurate, up-to-date bus fare information for all routes across Dhaka.",
    pointer: (
      <Image src="https://img.icons8.com/office/128/realtime-protection.png" alt="pointer" width={300} height={300} className="size-[40px]" />
    ),
  },
  {
    icon: MapPin,
    title: "Route Planning",
    description: "Find the best routes between any two locations in Dhaka with detailed path information.",
    pointer: (
      <Image src="https://img.icons8.com/ultraviolet/128/route.png" alt="pointer" width={300} height={300} className="size-[40px]" />
    ),
  },
  {
    icon: Search,
    title: "Smart Search",
    description: "Search by bus name, route number, or keywords to find exactly what you need.",
    pointer: (
      <Image src="https://img.icons8.com/color/128/search--v1.png" alt="pointer" width={300} height={300} className="size-[40px]" />
    ),
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Built for the people of Dhaka, by understanding real commuter needs.",
    pointer: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-pink-600"
      >
        <motion.path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          fill="currentColor"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>

    ),
  },
  {
    icon: Shield,
    title: "Reliable Data",
    description: "Trusted information sourced from official transport authorities and verified routes.",
    pointer: (
      <Image src="https://img.icons8.com/dusk/128/shield.png" alt="pointer" width={300} height={300} className="size-[40px]" />
    ),
  },
  {
    icon: Clock,
    title: "Always Updated",
    description: "Our database is constantly updated to reflect the latest route and fare changes.",
    pointer: (
      <Image src="https://img.icons8.com/doodle/128/24-7-open-sign-.png" alt="pointer" width={300} height={300} className="size-[40px]" />
    ),
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">Why Choose Bus Khoja?</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              We make navigating Dhaka's bus network simple, reliable, and accessible for everyone.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                data-swapy-slot={`feature-${index}`}
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Pointer>
                  <motion.div
                    key={`${feature.title}-pointer`}
                    animate={{
                      scale: [0.8, 1, 0.8],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {feature.pointer}
                  </motion.div>
                </Pointer>
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-primary/10">
                  <CardContent className="p-6">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4"
                    >
                      <feature.icon className="h-6 w-6 text-primary" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
