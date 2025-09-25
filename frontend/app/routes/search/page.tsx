"use client";

import { useEffect, useState } from "react";

import { searchRoutes } from "@/lib/api";

type RouteGroup = {
  from: { name: string };
  to: { name: string };
  buses: { bus: { name: string }; price: number }[];
};

export default function RouteSearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const [groups, setGroups] = useState<RouteGroup[] | null>(null);
  const [loading, setLoading] = useState(false);

  const fromIdStr = searchParams.fromId;
  const toIdStr = searchParams.toId;

  useEffect(() => {
    if (fromIdStr && toIdStr) {
      setLoading(true);
      searchRoutes(fromIdStr, toIdStr)
        .then(data => setGroups(data))
        .finally(() => setLoading(false));
    }
    else {
      setGroups(null);
    }
  }, [fromIdStr, toIdStr]);

  let content: React.ReactNode = (
    <p className="text-sm text-muted-foreground">Provide fromId and toId to search.</p>
  );

  if (loading) {
    content = <p>Loading...</p>;
  }
  else if (groups && groups.length > 0) {
    content = (
      <ul className="space-y-4">
        {groups.map((g, gIdx) => (
          <li key={`group-${gIdx}`} className="rounded border p-3">
            <div className="mb-2 flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                <span>{g.from.name}</span>
                <span> → </span>
                <span>{g.to.name}</span>
              </div>
            </div>
            <ul className="space-y-2">
              {g.buses.map((b, bIdx) => (
                <li
                  key={`bus-${gIdx}-${bIdx}`}
                  className="flex items-center justify-between"
                >
                  <div className="font-medium">{b.bus.name}</div>
                  <div className="text-right font-medium">
                    <span>৳</span>
                    <span>{b.price}</span>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Route Search</h1>
      {content}
    </div>
  );
}
