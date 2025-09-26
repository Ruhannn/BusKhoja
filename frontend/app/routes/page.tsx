"use client";

import { ArrowRight, Bus, DollarSign, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

import type { Route } from "@/lib/api";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api";

export default function RoutesPage() {
  const [routes, setRoutes] = useState<{ routes: Route[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/get-routes")
      .then(data => setRoutes(data.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="text-muted-foreground">Loading routes...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!routes || routes.routes.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Bus className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-2">No routes found</h2>
              <p className="text-muted-foreground">Check back later for available routes.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Bus className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Routes</h1>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
              {routes.routes.length}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {routes.routes.map(route => (
            <Card key={route.id} className="group hover:shadow-lg transition-all duration-300 border-0 bg-card">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">{route.id}</CardTitle>
                  <Badge variant="outline" className="text-xs">
                    {route.bus_id}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 flex-1">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="font-medium text-sm">{route.from_id}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <div className="flex items-center gap-2 flex-1">
                    <MapPin className="h-4 w-4 text-chart-2" />
                    <span className="font-medium text-sm">{route.to_id}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-border">
                  <DollarSign className="h-4 w-4 text-primary" />
                  <span className="text-2xl font-bold text-primary">
                    $
                    {route.price}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
