"use client";

import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Bus, Filter, GraduationCap, MapPin, Users } from "lucide-react";
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
      return passengerType === "student" ? Math.round(originalPrice * 0.5) : originalPrice;
    };
  }, [passengerType]);

  if (!fromId || !toId) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <p className="text-destructive">Invalid search parameters</p>
            <Link href="/">
              <Button className="mt-4">Go Back Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const SidebarContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-4 flex items-center gap-2 text-base">
          <Users className="h-4 w-4" />
          Passenger Type
        </h3>
        <div className="space-y-3">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setPassengerType("normal");
              setSidebarOpen(false);
            }}
            className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
              passengerType === "normal"
                ? "border-primary bg-primary/10 text-primary shadow-sm"
                : "border-border hover:border-primary/30 hover:bg-muted/50"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${passengerType === "normal" ? "bg-primary/20" : "bg-muted"}`}>
                <Users className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <span className="font-medium block">Normal</span>
                <p className="text-xs text-muted-foreground mt-1">Regular fare</p>
              </div>
            </div>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setPassengerType("student");
              setSidebarOpen(false);
            }}
            className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
              passengerType === "student"
                ? "border-primary bg-primary/10 text-primary shadow-sm"
                : "border-border hover:border-primary/30 hover:bg-muted/50"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${passengerType === "student" ? "bg-primary/20" : "bg-muted"}`}>
                <GraduationCap className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Student</span>
                  <Badge variant="secondary" className="text-xs px-2 py-0.5">
                    50% OFF
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Half price for students</p>
              </div>
            </div>
          </motion.button>
        </div>

        <div className="mt-4 h-16">
          <AnimatePresence mode="wait">
            {passengerType === "student" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="p-3 bg-primary/5 rounded-xl border border-primary/20"
              >
                <p className="text-sm text-primary flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Student discount active!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Bus Khoja
                </Button>
              </Link>

              <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden bg-transparent">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <div className="py-6">
                    <h2 className="text-lg font-semibold mb-6">Filters</h2>
                    <SidebarContent />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Bus Routes</h1>
            <div className="flex items-center gap-4 text-base sm:text-lg flex-wrap">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="font-semibold text-primary">{routeGroups?.[0]?.from.name}</span>
              </div>
              <div className="text-xl text-muted-foreground">→</div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="font-semibold text-primary">{routeGroups?.[0]?.to.name}</span>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-1 hidden lg:block"
            >
              <Card className="sticky top-8">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Filter className="h-5 w-5" />
                    Filters
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <SidebarContent />
                </CardContent>
              </Card>
            </motion.div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Loading State */}
              {isLoading && (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Card className="animate-pulse">
                        <CardContent className="p-6">
                          <div className="h-6 bg-muted rounded mb-4"></div>
                          <div className="h-4 bg-muted rounded mb-2"></div>
                          <div className="h-4 bg-muted rounded w-3/4"></div>
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
                    <CardContent className="p-8 text-center">
                      <p className="text-destructive">Unable to load routes. Please try again later.</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Results */}
              {routeGroups && routeGroups.length > 0 && (
                <div className="space-y-6">
                  {routeGroups.map((routeGroup, groupIndex) => (
                    <motion.div
                      key={groupIndex}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: groupIndex * 0.1 }}
                    >
                      <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardHeader className="pb-4">
                          <CardTitle className="flex items-center gap-2 text-lg">
                            <Bus className="h-5 w-5 text-primary" />
                            Available Buses (
                            {routeGroup.buses.length}
                            {" "}
                            options)
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {routeGroup.buses.map((busOnRoute, busIndex) => (
                            <motion.div
                              key={busIndex}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: busIndex * 0.1 }}
                              className="flex gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors border border-transparent hover:border-primary/20"
                            >
                              <img
                                src={busOnRoute.bus.picture || "/placeholder.svg?height=64&width=80&query=bus"}
                                alt={busOnRoute.bus.name}
                                className="w-16 h-12 sm:w-20 sm:h-16 rounded-lg object-cover flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-foreground text-base sm:text-lg truncate">
                                      {busOnRoute.bus.name}
                                    </h3>
                                    {busOnRoute.bus.full_path && (
                                      <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                                        <MapPin className="h-3 w-3 flex-shrink-0" />
                                        <span className="truncate">{busOnRoute.bus.full_path}</span>
                                      </div>
                                    )}
                                  </div>
                                  <div className="text-right flex-shrink-0">
                                    <div className="min-h-[2rem] flex flex-col justify-center">
                                      <div className="text-lg sm:text-xl font-bold text-primary">
                                        ৳
                                        {calculatePrice(busOnRoute.price)}
                                      </div>
                                      <div className="h-4">
                                        {passengerType === "student" && (
                                          <div className="text-xs text-muted-foreground line-through">
                                            ৳
                                            {busOnRoute.price}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 mt-3 flex-wrap">
                                  <Badge variant="outline" className="text-xs">
                                    Regular Service
                                  </Badge>
                                  {passengerType === "student" && (
                                    <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                                      Student Discount Applied
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* No Results */}
              {routeGroups && routeGroups.length === 0 && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                  <Card>
                    <CardContent className="p-8 text-center">
                      <Bus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">No Routes Found</h3>
                      <p className="text-muted-foreground mb-4">
                        We couldn't find any bus routes between these locations.
                        {keyword && " Try searching without keywords or with different terms."}
                      </p>
                      <Link href="/">
                        <Button>Try Different Locations</Button>
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
