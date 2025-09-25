"use client";

import { useEffect, useState } from "react";

import { getLocations } from "@/lib/api";

export default function LocationsPage() {
  const [locations, setLocations] = useState<{ locations: any[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLocations()
      .then(data => setLocations(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return <div>Loading...</div>;
  if (!locations)
    return <div>No locations found.</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Locations</h1>
      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
        {locations.locations.map(l => (
          <li key={l.id} className="rounded border p-3">
            {l.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
