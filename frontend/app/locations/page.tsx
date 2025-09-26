"use client";

import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";

import type { Location } from "@/lib/api";

import { AnimatedGroup } from "@/components/ui/animated-group";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/lib/api";

export default function LocationsPage() {
  const [locations, setLocations] = useState<{ locations: Location[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/get-locations")
      .then(data => setLocations(data.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Locations</h1>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!locations || locations.locations.length === 0) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Locations</h1>
        <Card>
          <CardContent className="p-8 text-center">
            <MapPin className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No locations found.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Locations</h1>
        <Badge variant="secondary">
          {locations.locations.length}
          {" "}
          location
          {locations.locations.length !== 1 ? "s" : ""}
        </Badge>
      </div>
      <AnimatedGroup preset="slide" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {locations.locations.map(location => (
          <Card key={location.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{location.name}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </AnimatedGroup>
    </div>
  );
}
