// "use client";

// import { useEffect, useState } from "react";

// import { getRoutes } from "@/lib/api";

// export default function RoutesPage() {
//   const [routes, setRoutes] = useState<{ routes: any[] } | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getRoutes()
//       .then(data => setRoutes(data))
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading)
//     return <div>Loading...</div>;
//   if (!routes || routes.routes.length === 0)
//     return <div>No routes found.</div>;

//   return (
//     <div className="space-y-4">
//       <h1 className="text-2xl font-semibold">Routes</h1>
//       <table className="w-full table-auto border-collapse">
//         <thead>
//           <tr className="text-left">
//             <th className="border-b p-2">ID</th>
//             <th className="border-b p-2">Bus</th>
//             <th className="border-b p-2">From</th>
//             <th className="border-b p-2">To</th>
//             <th className="border-b p-2">Price</th>
//           </tr>
//         </thead>
//         <tbody>
//           {routes.routes.map(r => (
//             <tr key={r.id}>
//               <td className="border-b p-2">{r.id}</td>
//               <td className="border-b p-2">{r.bus_id}</td>
//               <td className="border-b p-2">{r.from_id}</td>
//               <td className="border-b p-2">{r.to_id}</td>
//               <td className="border-b p-2">{r.price}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
