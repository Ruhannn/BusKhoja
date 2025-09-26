"use client";

import type React from "react";

import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Bus, Filter, GraduationCap, MapPin, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";

import type { RouteGroup } from "@/lib/api";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { searchRoutes } from "@/lib/api";

const SuccessPage: React.FC = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <RouteSearchPage />
      </Suspense>
    </div>
  );
};

function RouteSearchPage() {
  const searchParams = useSearchParams();
  const fromId = searchParams.get("fromId");
  const toId = searchParams.get("toId");
  const keyword = searchParams.get("keyword");

  const [passengerType, setPassengerType] = useState<"normal" | "student">("normal");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {
    data: routeGroups,
    isLoading,
    isError,
  } = useQuery<RouteGroup[]>({
    queryKey: ["routes", fromId, toId, keyword],
    queryFn: () => searchRoutes(fromId!, toId!),
    enabled: !!(fromId && toId),
  });

  const calculatePrice = useMemo(() => {
    return (originalPrice: number) => {
      if (passengerType === "student") {
        const discountedPrice = Math.round(originalPrice * 0.5);
        return Math.max(discountedPrice, 10);
      }
      return originalPrice;
    };
  }, [passengerType]);

  if (!fromId || !toId) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <p className="text-destructive mb-4">Invalid search parameters</p>
            <Link href="/">
              <Button className="w-full">Go Back Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const SidebarContent = () => (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium mb-3 flex items-center gap-2 text-sm">
          <Users className="h-4 w-4" />
          Passenger Type
        </h3>
        <div className="space-y-2">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setPassengerType("normal");
              setSidebarOpen(false);
            }}
            className={`w-full p-3 rounded-lg border-2 transition-all duration-200 text-left ${
              passengerType === "normal"
                ? "border-primary bg-primary/10 text-primary"
                : "border-border hover:border-primary/30 hover:bg-muted/50"
            }`}
          >
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded ${passengerType === "normal" ? "bg-primary/20" : "bg-muted"}`}>
                <Users className="h-3 w-3" />
              </div>
              <div className="flex-1">
                <span className="font-medium text-sm">Normal</span>
                <p className="text-xs text-muted-foreground">Regular fare</p>
              </div>
            </div>
          </motion.button>

          <motion.button
            disabled={(routeGroups?.length ?? 0) > 0}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setPassengerType("student");
              setSidebarOpen(false);
            }}
            className={`w-full p-3 rounded-lg border-2 transition-all duration-200 text-left ${
              passengerType === "student"
                ? "border-primary bg-primary/10 text-primary"
                : "border-border hover:border-primary/30 hover:bg-muted/50"
            }`}
          >
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded ${passengerType === "student" ? "bg-primary/20" : "bg-muted"}`}>
                <GraduationCap className="h-3 w-3" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">Student</span>
                  <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                    50% OFF
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">Min ৳10</p>
              </div>
            </div>
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          {passengerType === "student" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="mt-3 p-2 bg-primary/5 rounded-lg border border-primary/20"
            >
              <p className="text-xs text-primary flex items-center gap-1">
                <GraduationCap className="h-3 w-3" />
                Student discount active!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="px-3 py-4 sm:px-4 sm:py-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <div className="flex items-center justify-between mb-3">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-xs sm:text-sm">
                  <ArrowLeft className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Back to Bus Khoja</span>
                  <span className="sm:hidden">Back</span>
                </Button>
              </Link>

              <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden text-xs bg-transparent">
                    <Filter className="mr-1 h-3 w-3" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72 sm:w-80">
                  <div className="py-4">
                    <h2 className="text-base font-semibold mb-4">Filters</h2>
                    <SidebarContent />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-2">Bus Routes</h1>
            {routeGroups && routeGroups[0].from.name && routeGroups[0].to.name && (
              <div className="flex items-center gap-2 sm:gap-4 text-sm sm:text-base flex-wrap">
                <div className="flex items-center gap-1 sm:gap-2">
                  <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="font-semibold text-primary truncate max-w-[120px] sm:max-w-none">
                    {routeGroups[0].from.name}
                  </span>
                </div>
                <div className="text-lg text-muted-foreground">→</div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="font-semibold text-primary truncate max-w-[120px] sm:max-w-none">
                    {routeGroups[0].to.name}
                  </span>
                </div>
              </div>
            )}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-1 hidden lg:block"
            >
              <Card className="sticky top-6">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Filter className="h-4 w-4" />
                    Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <SidebarContent />
                </CardContent>
              </Card>
            </motion.div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Loading State */}
              {isLoading && (
                <div className="space-y-3">
                  {[1, 2, 3].map(i => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Card className="animate-pulse">
                        <CardContent className="p-4">
                          <div className="h-5 bg-muted rounded mb-3"></div>
                          <div className="h-3 bg-muted rounded mb-2"></div>
                          <div className="h-3 bg-muted rounded w-3/4"></div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Error State */}
              {isError && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                  <Card className="border-destructive/20 bg-destructive/5">
                    <CardContent className="p-6 text-center">
                      <p className="text-destructive text-sm">Unable to load routes. Please try again later.</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Results */}
              {routeGroups && routeGroups.length > 0 && (
                <div className="space-y-4">
                  {routeGroups.map((routeGroup, groupIndex) => (
                    <motion.div
                      key={groupIndex}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: groupIndex * 0.1 }}
                    >
                      <Card className="shadow-sm hover:shadow-md transition-all duration-300">
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                            <Bus className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                            Available Buses (
                            {routeGroup.buses.length}
                            {" "}
                            options)
                          </CardTitle>
                        </CardHeader>
                        {routeGroup.buses.length > 0
                          ? (
                              <CardContent className="space-y-3">
                                {routeGroup.buses.map((busOnRoute, busIndex) => (
                                  <motion.div
                                    key={busIndex}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: busIndex * 0.1 }}
                                    className="flex gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors border border-transparent hover:border-primary/20"
                                  >
                                    <Image
                                      width={5000}
                                      height={5000}
                                      src={busOnRoute.bus.picture || "/placeholder.svg?height=48&width=64&query=bus"}
                                      alt={busOnRoute.bus.name}
                                      className="w-12 h-9 sm:w-16 sm:h-12 rounded object-cover flex-shrink-0"
                                    />
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1 min-w-0">
                                          <h3 className="font-semibold text-foreground text-sm sm:text-base truncate">
                                            {busOnRoute.bus.name}
                                          </h3>
                                          {busOnRoute.bus.full_path && (
                                            <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                                              <MapPin className="h-3 w-3 flex-shrink-0" />
                                              <span className="truncate">{busOnRoute.bus.full_path}</span>
                                            </div>
                                          )}
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                          <div className="flex flex-col items-end">
                                            <div className="text-base sm:text-lg font-bold text-primary">
                                              ৳
                                              {calculatePrice(busOnRoute.price)}
                                            </div>
                                            {passengerType === "student"
                                              && calculatePrice(busOnRoute.price) !== busOnRoute.price && (
                                              <div className="text-xs text-muted-foreground line-through">
                                                ৳
                                                {busOnRoute.price}
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </motion.div>
                                ))}
                              </CardContent>
                            )
                          : (
                              <CardContent className="space-y-3">
                                <p className="text-sm text-muted-foreground">No buses available for this route.</p>
                              </CardContent>
                            )}
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* No Results */}
              {routeGroups && routeGroups.length === 0 && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Bus className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-3" />
                      <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">No Routes Found</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        We couldn't find any bus routes between these locations.
                        {keyword && " Try searching without keywords or with different terms."}
                      </p>
                      <Link href="/">
                        <Button className="w-full sm:w-auto">Try Different Locations</Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;
