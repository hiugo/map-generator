import { MIN_ROOMS } from "vars";

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getCoinFlip() {
  return getRandomInt(0, 1) === 0;
}

export function generateMap(steps: number, currentMaxRooms: number) {
  const generatedSteps = [...Array(steps)].map(() =>
    getRandomInt(MIN_ROOMS, currentMaxRooms)
  );

  const map = generatedSteps.map((numberOfRooms, stepIndex) => {
    let lastConnected: number;

    const nextStepRooms = generatedSteps[stepIndex + 1] ?? 1;

    const rooms = [...Array(numberOfRooms)].map((_, thisRoomIndex) => {
      const isThisRoomLast = thisRoomIndex + 1 === numberOfRooms;
      let hasRoom = false;
      let hasBreak = false;

      const routes = [...Array(nextStepRooms)].map((_, nextRoomIndex) => {
        const getResult = () => {
          const isNextRoomLast = nextRoomIndex + 1 === nextStepRooms;

          if (lastConnected === undefined) {
            lastConnected = nextRoomIndex;
            hasRoom = true;
            return true;
          }

          if (nextRoomIndex < lastConnected) return false;

          if (isThisRoomLast && isNextRoomLast) {
            lastConnected = nextRoomIndex;
            return true;
          }

          const isLastEmpty = nextRoomIndex > lastConnected;

          if (isLastEmpty && (!hasRoom || isThisRoomLast)) {
            lastConnected = nextRoomIndex;
            return true;
          }

          if (!hasRoom && isNextRoomLast) {
            lastConnected = nextRoomIndex;
            return true;
          }

          if (hasBreak) return false;

          const randomFlip = getCoinFlip();

          if (!randomFlip) hasBreak = true;
          else {
            hasRoom = true;
            lastConnected = nextRoomIndex;
          }

          return randomFlip;
        };

        const result = getResult();

        return {
          id: `route-${stepIndex}-${thisRoomIndex}-${nextRoomIndex}`,
          available: result,
          from: thisRoomIndex,
          to: nextRoomIndex,
        };
      });

      return {
        id: `room-${stepIndex}-${thisRoomIndex}`,
        routes,
      };
    });

    return {
      id: `step-${stepIndex}`,
      rooms,
    };
  });

  return map;
}
