"use client";

import { Bus } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import type { Bus } from "@/lib/api";

import { AnimatedGroup } from "@/components/ui/animated-group";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/lib/api";

export default function BusesPage() {
  const [buses, setBuses] = useState<{ buses: Bus[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/get-buses")
      .then(data => setBuses(data.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-muted-foreground">Loading buses...</div>
      </div>
    );
  }

  if (!buses) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-muted-foreground mb-2">No buses found</div>
          <div className="text-sm text-muted-foreground">Check back later for available buses</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-bold text-foreground">Buses</h1>
        <Badge variant="secondary" className="text-sm">
          {buses.buses.length}
          {" "}
          available
        </Badge>
      </div>

      <AnimatedGroup preset="slide" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {buses.buses.map(bus => (
          <Card key={bus.id} className="group hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  {bus.picture
                    ? (
                        <Image
                          src={bus.picture}
                          alt={bus.name}
                          width={48}
                          height={48}
                          className="h-12 w-12 rounded-lg object-cover border"
                        />
                      )
                    : (
                        <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center border">
                          <Bus />
                        </div>
                      )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                    {bus.name}
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </AnimatedGroup>
    </div>
  );
}
