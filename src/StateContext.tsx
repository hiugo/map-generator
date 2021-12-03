import { createContext, useState } from "react";
import { Map } from "types";
import { generateMap } from "utils";

type StateContextProps = {
  steps: number;
  setSteps: React.Dispatch<React.SetStateAction<number>>;
  rooms: number;
  setRooms: React.Dispatch<React.SetStateAction<number>>;
  map: Map;
  generateMap: () => void;
};

const initialState = {
  steps: 4,
  setSteps: () => null,
  rooms: 4,
  setRooms: () => null,
  map: [],
  generateMap: () => null,
};

export const StateContext = createContext<StateContextProps>(initialState);

type StateContextProviderProps = {
  children: React.ReactNode;
};

export function StateContextProvider({ children }: StateContextProviderProps) {
  const [steps, setSteps] = useState(4);
  const [rooms, setRooms] = useState(5);
  const [map, setMap] = useState<Map>(() => generateMap(steps, rooms));

  function generateNewMap() {
    setMap(() => generateMap(steps, rooms));
  }

  return (
    <StateContext.Provider
      value={{
        steps,
        setSteps,
        rooms,
        setRooms,
        map,
        generateMap: generateNewMap,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}
