import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import styles from "./simonsays.module.css";

const NUMBER_OF_TILES = 4;

export function SimonSays() {
  const [started, setStarted] = useState(false);
  const [status, setStatus] = useState<"win" | "loose" | null>(null);

  return (
    <div className={styles.app}>
      <h1>Simon Says</h1>
      {!started && !status && (
        <button
          className={styles.button}
          type="button"
          onClick={() => setStarted(true)}
        >
          Start
        </button>
      )}
      {started && !status && <SimonSaysBoard setStatus={setStatus} />}
      {status === "win" && <h1>You won</h1>}
      {status === "loose" && <h1>You loose</h1>}
    </div>
  );
}

function SimonSaysBoard({
  setStatus,
}: {
  setStatus: Dispatch<SetStateAction<"win" | "loose" | null>>;
}) {
  const [tiles] = useState(
    new Array(NUMBER_OF_TILES).fill(null).map(() => generateRandomColor())
  );
  const [sequence, setSequence] = useState<(number | null)[]>(
    setTileSequence(1, tiles.length)
  );
  const [activeTile, setActiveTile] = useState<number>();
  const [turn, setTurn] = useState(0);
  const sequenceStarted = useRef(false);
  const userInputRef = useRef<(number | null)[]>([]);
  const intervalRef = useRef<number>();
  const intervalRefDuration = useRef<number>(1100);

  function setNextTurn() {
    setTurn(0);
    setSequence([...sequence, ...setTileSequence(1, tiles.length)]);
    userInputRef.current = [];
  }

  useEffect(() => {
    if (sequenceStarted.current || turn !== 0) {
      return;
    }
    sequenceStarted.current = true;
    intervalRefDuration.current = intervalRefDuration.current - 30;
    intervalRef.current = setInterval(() => {
      setActiveTile((active) => {
        if (active == sequence.length - 1) {
          clearInterval(intervalRef.current);
          sequenceStarted.current = false;
          setTurn(1);
          return;
        }
        if (active == null) {
          return 0;
        }
        return active + 1;
      });
    }, intervalRefDuration.current);
  }, [sequence]);

  function isActive(index: number) {
    return activeTile != null && index === sequence[activeTile];
  }

  function userClick(tileIndex: number) {
    const indexToLookUp = userInputRef.current.length;

    if (sequence[indexToLookUp] !== tileIndex) {
      setStatus("loose");
      return;
    }

    userInputRef.current.push(...[tileIndex, null]);

    if (userInputRef.current.length === 30) {
      setStatus("win");
      return;
    }

    if (userInputRef.current.length === sequence.length) {
      setNextTurn();
    }
  }

  return (
    <>
      <div>{turn === 0 ? "Watch the sequence" : "Repeat the sequence"}</div>
      <div className={styles.board}>
        {tiles.map((color, index) => (
          <button
            type="button"
            key={index}
            className={isActive(index) ? styles.activeTile : styles.tile}
            style={{ backgroundColor: color }}
            disabled={turn === 0 && !isActive(index)}
            onClick={() => userClick(index)}
          ></button>
        ))}
      </div>
    </>
  );
}

function setTileSequence(numbersToGenerate: number, numberOfTiles: number) {
  return new Array(numbersToGenerate * 2)
    .fill(null)
    .map((_, index) =>
      index % 2 === 1 ? null : Math.floor(Math.random() * numberOfTiles)
    );
}

const COLORS: Record<string, string> = {
  aqua: "#00ffff",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  black: "#000000",
  blue: "#0000ff",
  brown: "#a52a2a",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgrey: "#a9a9a9",
  darkgreen: "#006400",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkviolet: "#9400d3",
  fuchsia: "#ff00ff",
  gold: "#ffd700",
  green: "#008000",
  indigo: "#4b0082",
  khaki: "#f0e68c",
  lightblue: "#add8e6",
  lightcyan: "#e0ffff",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightpink: "#ffb6c1",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  magenta: "#ff00ff",
  maroon: "#800000",
  navy: "#000080",
  olive: "#808000",
  orange: "#ffa500",
  pink: "#ffc0cb",
  purple: "#800080",
  violet: "#800080",
  red: "#ff0000",
  silver: "#c0c0c0",
  white: "#ffffff",
  yellow: "#ffff00",
};
function generateRandomColor() {
  const index = Math.floor(Math.random() * Object.keys(COLORS).length);
  const key = Object.keys(COLORS)[index];
  return COLORS[key];
}
