import { useEffect, useRef, useState } from "react";
import { Room } from "types";

type RoutesProps = {
  rooms: Room[];
  nextRooms: number;
  currentRoomIndex: number;
  nextRoomIndex: number;
  isNextStepAvailable: boolean;
  lastSelectedRoom: number;
};

export function Routes({
  rooms,
  nextRooms,
  currentRoomIndex,
  nextRoomIndex,
  isNextStepAvailable,
  lastSelectedRoom,
}: RoutesProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (wrapperRef?.current) {
      setHeight(wrapperRef?.current?.clientHeight);
    }
  }, []);

  return (
    <div className="routes" ref={wrapperRef}>
      {rooms.map((room, roomIndex) =>
        room.routes.map((route, routeIndex) => {
          if (!route.available || !wrapperRef?.current) return null;

          const thisRooms = rooms.length;
          const thisSpaces = thisRooms - 1 < 0 ? 0 : thisRooms - 1;
          const thisHeight = 60 * thisRooms + 16 * thisSpaces;
          const thisY = height / 2 + 30 + roomIndex * 76 - thisHeight / 2;

          const nextSpaces = nextRooms - 1 < 0 ? 0 : nextRooms - 1;
          const nextHeight = 60 * nextRooms + 16 * nextSpaces;
          const nextY = height / 2 + 30 + routeIndex * 76 - nextHeight / 2;

          const isAvailable = lastSelectedRoom === roomIndex;

          const isDisabled = !isNextStepAvailable || !isAvailable;
          const isSelected =
            nextRoomIndex === route.to && currentRoomIndex === route.from;

          return (
            <svg
              key={route.id}
              className={`route-svg ${isDisabled && !isSelected ? "back" : ""}`}
            >
              <line
                className={`route-line ${isDisabled ? "disabled" : ""} ${
                  isSelected ? "selected" : ""
                }`}
                x1="0%"
                x2="100%"
                y1={`${thisY}px`}
                y2={`${nextY}px`}
                stroke="black"
              />
            </svg>
          );
        })
      )}
    </div>
  );
}
