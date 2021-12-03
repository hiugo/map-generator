export type Route = {
  id: string;
  available: boolean;
  from: number;
  to: number;
};

export type Room = {
  id: string;
  routes: Route[];
};

export type Step = {
  id: string;
  rooms: Room[];
};

export type Map = Step[];
