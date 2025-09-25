"use client";

import type React from "react";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowRight, Banknote, MapPin, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import type { Location } from "@/lib/api";

import { LocationCombobox } from "@/components/location-combobox";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/lib/api";

import { AnimatedGroup } from "./ui/animated-group";

export function RouteFinder() {
  const [fromId, setFromId] = useState("");
  const [toId, setToId] = useState("");
  const router = useRouter();

  const {
    data: locations,
    isLoading,
    isError,
  } = useQuery<Location[]>({
    queryKey: ["locations"],
    queryFn: async () => (await api.get<{ locations: Location[] }>("/get-locations")).data.locations,
  });

  if (isLoading) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-4xl">
        <Card className="animate-pulse-soft shadow-none border-0">
          <CardContent className="p-8">
            <div className="h-8 bg-muted rounded mb-6"></div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="h-12 bg-muted rounded"></div>
              <div className="h-12 bg-muted rounded"></div>
            </div>
            <div className="h-12 bg-muted rounded mt-6"></div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  if (isError || !locations?.length) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-4xl">
        <Card className="border-destructive/20 bg-destructive/5">
          <CardContent className="p-8 text-center">
            <p className="text-destructive">Unable to load locations. Please try again later.</p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fromId && toId) {
      const params = new URLSearchParams({ fromId, toId });
      router.push(`/routes/search?${params}`);
    }
  };

  return (
    <div
      className="mx-auto max-w-4xl min-h-[80vh]"
    >
      <>
        <AnimatedGroup
          preset="blur-slide"
          className="p-8"
        >
          <div
            className="mb-6 text-center"
          >
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Find Bus Routes & Fares</h2>
            <p className="mt-2 text-muted-foreground">Get real-time pricing and route information</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div
              className="grid gap-6 md:grid-cols-2"
            >
              {/* From Location */}
              <LocationCombobox
                locations={locations}
                value={fromId}
                onValueChange={setFromId}
                placeholder="Select your starting point"
                label="From"
                excludeId={toId}
              />

              {/* To Location */}
              <LocationCombobox
                locations={locations}
                value={toId}
                onValueChange={setToId}
                placeholder="Select your destination"
                label="To"
                excludeId={fromId}
              />
            </div>

            {/* Search Button */}
            <div>
              <Button
                type="submit"
                size="lg"
                className="w-full h-12 text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                disabled={!fromId || !toId}
              >
                <Search className="mr-2 h-5 w-5" />
                Find Routes & Prices
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </form>

          <div
            className="mt-8 grid gap-4 sm:grid-cols-2"
          >
            <div className="flex items-center gap-3 rounded-lg bg-primary/5 p-4">
              <Banknote className="h-5 w-5 text-primary" />
              <div>
                <div className="text-sm font-medium text-foreground">Live Pricing</div>
                <div className="text-xs text-muted-foreground">Real-time fare information</div>
              </div>
            </div>
            <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-3 rounded-lg bg-primary/5 p-4">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <div className="text-sm font-medium text-foreground">Multiple Routes</div>
                <div className="text-xs text-muted-foreground">Compare different options</div>
              </div>
            </motion.div>
          </div>
        </AnimatedGroup>
      </>
    </div>
  );
}
