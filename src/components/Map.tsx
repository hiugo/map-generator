import React, { useState, useContext, useEffect } from "react";
import { Routes } from "./Routes";
import { StateContext } from "StateContext";

export function Map() {
  const { map, generateMap } = useContext(StateContext);

  const [selectedRoute, setSelectedRoute] = useState<number[]>([]);

  function handleClick(index: number) {
    setSelectedRoute((prev) => [...prev, index]);
  }

  function handleFinish() {
    setSelectedRoute([]);
    generateMap();
  }

  useEffect(() => {
    setSelectedRoute([]);
  }, [map]);

  return (
    <div className="map-wrapper">
      {[...Array(map.length)].map((_, index) => {
        const stepData = map[index];

        const isStepAvailable = selectedRoute.length === index;
        const lastRoomIndex = selectedRoute[index - 1];
        const currentRoomIndex = selectedRoute[index];
        const nextRoomIndex = selectedRoute[index + 1];
        const lastRoomRoutes = map[index - 1]?.rooms?.[lastRoomIndex]?.routes;

        return (
          <React.Fragment key={stepData.id}>
            <div className="step">
              {stepData.rooms.map((room, roomIndex) => {
                const lastRoute = lastRoomRoutes?.[roomIndex];
                const isRouteAvailable =
                  !lastRoomRoutes || lastRoute?.available;
                const isSelected = currentRoomIndex === roomIndex;

                return (
                  <button
                    key={room.id}
                    className={`room ${isSelected ? "selected" : ""}`}
                    disabled={!isStepAvailable || !isRouteAvailable}
                    onClick={() => handleClick(roomIndex)}
                  >
                    {roomIndex + 1}
                  </button>
                );
              })}
            </div>
            <Routes
              rooms={stepData.rooms}
              nextRooms={map[index + 1]?.rooms?.length ?? 1}
              currentRoomIndex={currentRoomIndex}
              nextRoomIndex={nextRoomIndex}
              isNextStepAvailable={selectedRoute.length === index + 1}
              lastSelectedRoom={selectedRoute[index]}
            />
          </React.Fragment>
        );
      })}

      <button
        className="room"
        disabled={selectedRoute.length < map.length}
        onClick={handleFinish}
      >
        End
      </button>
    </div>
  );
}
