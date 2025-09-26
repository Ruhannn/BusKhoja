"use client";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/map"), {
  loading: () => <p>A map is loading</p>,
  ssr: false,
});

export default function MyPage() {
  return (
    <div className="min-h-screen">
      <Map />
    </div>
  );
}
