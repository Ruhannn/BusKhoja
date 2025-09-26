"use client";
import React, { useState } from "react";
import { toast } from "sonner";

import { BackgroundLines } from "@/components/ui/background-lines";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

export default function Page() {
  const [message, setMessage] = useState("");

  const placeholders = [
    "How do I get to Old Dhaka?",
    "What is Rob Rob?",
    "Poristan or Projapoti? ;3",
    "I'll just get an Uber.",
    "Will a bus come in 5 minutes?",
  ];

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: "moviebuzz989@gmail.com",
        subject: "Bus Khoja",
        message,
      }),
    });
    toast.success("Message sent!");
  };

  return (
    <BackgroundLines className="relative h-screen flex items-center justify-center">

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
        <h2 className="mb-8 text-xl text-center sm:text-5xl text-foreground font-semibold">
          Ask us Anything
        </h2>
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={() => setMessage(message)}
          onSubmit={onSubmit}
        />
      </div>

    </BackgroundLines>
  );
}
