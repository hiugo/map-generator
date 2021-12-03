import { KeyboardEvent, useContext, useEffect, useState } from "react";
import { StateContext } from "StateContext";
import { MAX_ROOMS, MAX_STEPS, MIN_ROOMS, MIN_STEPS } from "vars";

type OptionType = {
  title: string;
  value: number;
  handler: React.Dispatch<React.SetStateAction<number>>;
  min: number;
  max: number;
};

export function Options() {
  const { steps, setSteps, rooms, setRooms, generateMap } =
    useContext(StateContext);

  const options: OptionType[] = [
    {
      title: "Number of steps",
      value: steps,
      handler: setSteps,
      min: MIN_STEPS,
      max: MAX_STEPS,
    },
    {
      title: "Max number of rooms",
      value: rooms,
      handler: setRooms,
      min: MIN_ROOMS,
      max: MAX_ROOMS,
    },
  ];

  function handleGenerateMap() {
    generateMap();
  }

  return (
    <div className="options-wrapper">
      {options.map((option, index) => (
        <Option key={`option-${index}`} {...option} />
      ))}
      <div className="option">
        <button className="option-button" onClick={handleGenerateMap}>
          Generate new map 🗺️
        </button>
      </div>
      <div className="option">
        <a
          className="option-button github"
          href="https://github.com/hiugo/map-generator"
          rel="noreferrer"
          target="_blank"
        >
          Github
        </a>
      </div>
    </div>
  );
}

function Option({ title, value, handler, min, max }: OptionType) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      const target = event.target as HTMLInputElement;
      let number = ~~target.value;

      if (number < min) number = min;
      else if (number > max) number = max;

      handler(number);
    }
  }

  return (
    <div className="option">
      <div className="option-title">{title}</div>
      <div className="option-content">
        <button
          className="option-button"
          disabled={value <= min}
          onClick={() => handler((prev) => prev - 1)}
        >
          -
        </button>
        <input
          className="option-input"
          type="number"
          value={inputValue}
          onChange={(event) => setInputValue(~~event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="option-button"
          disabled={value >= max}
          onClick={() => handler((prev) => prev + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
}
