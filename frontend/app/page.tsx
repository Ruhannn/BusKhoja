"use client";

import type { Route } from "next";

import Link from "next/link";
import { useEffect, useState } from "react";

import type { Location } from "@/lib/api";

import { getLocations } from "@/lib/api";

export default function Home() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLocations()
      .then(data => setLocations(data.locations || []))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return <p>Loading...</p>;
  if (!locations)
    return <p>No locations available.</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Find a route</h1>
      <form action="/routes/search" className="flex flex-wrap gap-3">
        <label className="flex flex-col gap-1">
          <span className="text-sm text-muted-foreground">From</span>
          <select name="fromId" required className="min-w-40 rounded border p-2" defaultValue="">
            <option value="" disabled>Select origin</option>
            {locations.map(l => (
              <option key={l.id} value={l.id}>{l.name}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-muted-foreground">To</span>
          <select name="toId" required className="min-w-40 rounded border p-2" defaultValue="">
            <option value="" disabled>Select destination</option>
            {locations.map(l => (
              <option key={l.id} value={l.id}>{l.name}</option>
            ))}
          </select>
        </label>
        <button type="submit" className="rounded bg-black px-4 py-2 text-white">Search</button>
      </form>

      <p className="text-sm text-muted-foreground">Or browse:</p>
      <ul className="flex gap-4">
        <li>
          <Link href={"/buses" as Route} className="underline">Buses</Link>
        </li>
        <li>
          <Link href={"/locations" as Route} className="underline">Locations</Link>
        </li>
        <li>
          <Link href={"/routes" as Route} className="underline">Routes</Link>
        </li>
      </ul>
    </div>
  );
}
