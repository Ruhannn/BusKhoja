"use client";

import { Bus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { AnimatedGroup } from "./ui/animated-group";
import { LineShadowText } from "./ui/line-shadow-text";
import { Magnetic } from "./ui/magnetic";
import { NumberTicker } from "./ui/number-ticker";

export function HeroSection() {
  return (
    <>
      <div>
        <AnimatedGroup
          variants={{
            container: {
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            },

          }}
          preset="scale"
          className="mx-auto max-w-4xl text-center"
        >
          {/* Badge */}
          <div
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Bus className="h-4 w-4" />
              <div>Bus Khoja - Your Bus Guide</div>
            </div>
          </div>

          {/* Main Heading */}
          <h1
            className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          >
            Find bus routes &
            {" "}
            <LineShadowText className="text-balance text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-primary" shadowColor="black">
              fares
            </LineShadowText>
          </h1>

          <p
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
          >
            Navigate Dhaka's bustling streets with ease. Get real-time bus fares, route information, and journey
            planning for millions of daily commuters.
          </p>

          {/* CTA Button */}
          <Magnetic
            intensity={0.2}
            springOptions={{ bounce: 0.1 }}
            actionArea="global"
            range={400}
          >
            <div
              className="mt-10 "
            >
              <Button
                size="lg"
                className="h-14 px-8 text-lg font-semibold shadow-lg hover:scale-105 hover:shadow-xl cursor-pointer"
                onClick={() => document.querySelector("#route-finder")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Magnetic
                  intensity={0.1}
                  springOptions={{ bounce: 0.1 }}
                  actionArea="global"
                  range={400}
                >
                  Check Bus
                </Magnetic>
              </Button>
            </div>
          </Magnetic>

          <AnimatedGroup
            className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4"
            preset="scale"
            variants={{
              container: {
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
              },
              item: {
                hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: {
                    duration: 1.2,
                    type: "spring",
                    bounce: 0.3,
                  },
                },
              },
            }}

          >
            <div className="text-center flex items-center justify-center flex-col">
              <div className="flex items-center justify-center">
                <NumberTicker value={200} className="text-2xl font-bold text-primary sm:text-3xl" />
              </div>
              <div className="text-sm text-muted-foreground">Bus Routes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary sm:text-3xl">৳10-350</div>
              <div className="text-sm text-muted-foreground">Fare Range</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary sm:text-3xl">24/7</div>
              <div className="text-sm text-muted-foreground">Live Pricing</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary sm:text-3xl">2M+</div>
              <div className="text-sm text-muted-foreground">Daily Riders</div>
            </div>
          </AnimatedGroup>
        </AnimatedGroup>
      </div>
    </>
  );
}
