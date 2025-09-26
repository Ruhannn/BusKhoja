// "use client";

// import Image from "next/image";
// import { useEffect, useState } from "react";

// import { getBuses } from "@/lib/api";

// export default function BusesPage() {
//   const [buses, setBuses] = useState<{ buses: any[] } | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     api.get('/')
//       .then(data => setBuses(data))
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading)
//     return <div>Loading...</div>;
//   if (!buses)
//     return <div>No buses found.</div>;

//   return (
//     <div className="space-y-4">
//       <h1 className="text-2xl font-semibold">Buses</h1>
//       <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
//         {buses.buses.map((bus) => {
//           let picture: React.ReactNode;
//           if (bus.picture) {
//             picture = (
//               <Image
//                 src={bus.picture}
//                 alt={bus.name}
//                 width={48}
//                 height={48}
//                 className="h-12 w-12 rounded object-cover"
//               />
//             );
//           }
//           else {
//             picture = <div className="h-12 w-12 rounded bg-gray-200" />;
//           }
//           return (
//             <li key={bus.id} className="flex items-center gap-3 rounded border p-3">
//               {picture}
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// }
