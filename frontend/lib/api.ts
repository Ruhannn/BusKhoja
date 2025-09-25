import axios from "axios";

export const api = axios.create({
  // eslint-disable-next-line node/no-process-env
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export type Bus = {
  id: string;
  name: string;
  picture?: string | null;
  full_path?: string | null;
};

export type Location = {
  id: string;
  name: string;
};

export type Route = {
  id: string;
  bus_id: string;
  from_id: string;
  to_id: string;
  price: number;
};

export type BusOnRoute = {
  price: number;
  bus: Pick<Bus, "name" | "picture" | "full_path">;
};

export type RouteGroup = {
  from: Pick<Location, "name">;
  to: Pick<Location, "name">;
  buses: BusOnRoute[];
};

// ------------------ Axios wrapper ------------------

// ------------------ Bus APIs ------------------

// export function getBuses(): Promise<{ buses: Bus[] }> {
//   return api<{ buses: Bus[] }>("/get-buses");
// }

// export function getBusById(id: string): Promise<{ bus: Bus }> {
//   return api<{ bus: Bus }>(`/get-bus/${id}`);
// }

// export async function createBus(input: {
//   name: string;
//   picture?: string | null;
//   full_path?: string | null;
//   routes?: string;
// }): Promise<Bus> {
//   return api<Bus>("/create-bus", {
//     method: "POST",
//     data: input,
//   });
// }

// export async function updateBus(id: string, input: {
//   name?: string;
//   picture?: string | null;
//   full_path?: string | null;
// }): Promise<void> {
//   return api<void>(`/update-bus/${id}`, {
//     method: "PUT",
//     data: input,
//   });
// }

// export async function deleteBus(id: string): Promise<void> {
//   return api<void>(`/delete-bus/${id}`, {
//     method: "DELETE",
//   });
// }

// // ------------------ Location APIs ------------------

// export function getLocations(): Promise<{ locations: Location[] }> {
//   return api<{ locations: Location[] }>("/get-locations");
// }

// export function getLocationById(id: string): Promise<{ location: Location }> {
//   return api<{ location: Location }>(`/get-location/${id}`);
// }

// export async function createLocation(input: { name: string }): Promise<{ location: Location }> {
//   return api<{ location: Location }>("/create-location", {
//     method: "POST",
//     data: input,
//   });
// }

// export async function updateLocation(id: string, input: { name: string }): Promise<void> {
//   return api<void>(`/update-location/${id}`, {
//     method: "PUT",
//     data: input,
//   });
// }

// export async function deleteLocation(id: string): Promise<void> {
//   return api<void>(`/delete-location/${id}`, {
//     method: "DELETE",
//   });
// }

// // ------------------ Route APIs ------------------

// export function getRoutes(): Promise<{ routes: Route[] }> {
//   return api<{ routes: Route[] }>("/get-routes");
// }

// export function getRouteById(id: string): Promise<{ route: Route }> {
//   return api<{ route: Route }>(`/get-route/${id}`);
// }

// export async function createRoute(input: {
//   bus_id: string;
//   from_id: string;
//   to_id: string;
//   price: number;
// }): Promise<Route> {
//   return api<Route>("/create-route", {
//     method: "POST",
//     data: input,
//   });
// }

// export async function updateRoute(id: string, input: {
//   price?: number;
// }): Promise<void> {
//   return api<void>(`/update-route/${id}`, {
//     method: "PUT",
//     data: input,
//   });
// }

// export async function deleteRoute(id: string): Promise<void> {
//   return api<void>(`/delete-route/${id}`, {
//     method: "DELETE",
//   });
// }

// // ------------------ Search Buses ------------------

export async function searchRoutes(fromId: string, toId: string): Promise<RouteGroup[]> {
  const raw = (await api.get(`/search-buses?from=${fromId}&to=${toId}`)).data;

  if (!raw || !raw.buses)
    return [];

  const fromName = raw.from?.name || "";
  const toName = raw.to?.name || "";

  const buses: BusOnRoute[] = Array.isArray(raw.buses)
    ? raw.buses.map((b: any) => ({
        price: b.price,
        bus: {
          name: b.bus?.name || "",
          picture: b.bus?.picture ?? null,
          full_path: b.bus?.full_path ?? null,
        },
      }))
    : [];

  return [
    {
      from: { name: fromName },
      to: { name: toName },
      buses,
    },
  ];
}
