import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import styles from "./simonsays.module.css";
import { SlideInCard } from "../slideInCard/slideInCard";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

const NUMBER_OF_TILES = 6;

export function SimonSays() {
  const { t } = useTranslation();
  const [started, setStarted] = useState(false);
  const [status, setStatus] = useState<"win" | "loose" | null>(null);

  const rules = t("GAME.RULES", { returnObjects: true }) as string[];

  function restart() {
    setStatus(null);
    setStarted(false);
  }

  return (
    <SlideInCard>
      <h3>{t("GAME.TITLE")}</h3>
      {!started && !status && (
        <div>
          <p>{t("GAME.RULE_HEADER")}</p>
          <ul>
            {rules.map((value, i) => (
              <li key={i}>{value}</li>
            ))}
          </ul>
          <button
            className={styles.button}
            type="button"
            onClick={() => setStarted(true)}
          >
            {t("GAME.START")}
          </button>
        </div>
      )}
      {started && !status && (
        <SimonSaysBoard setStatus={setStatus} restart={restart} />
      )}
      {status === "win" && (
        <div>
          <p>{t("GAME.WON")}</p>
          <button type="button" onClick={restart}>
            {t("GAME.PLAY_AGAIN")}
          </button>
        </div>
      )}
      {status === "loose" && (
        <div>
          <p>{t("GAME.LOOSE")}</p>
          <button type="button" onClick={restart}>
            {t("GAME.TRY_AGAIN")}
          </button>
        </div>
      )}
    </SlideInCard>
  );
}

type Sequence = (number | null)[];

function SimonSaysBoard({
  setStatus,
  restart,
}: {
  setStatus: Dispatch<SetStateAction<"win" | "loose" | null>>;
  restart(): void;
}) {
  const [tiles] = useState(getTiles(NUMBER_OF_TILES));
  const [sequence, setSequence] = useState<Sequence>(
    setTileSequence(1, tiles.length)
  );
  const [activeTile, setActiveTile] = useState<number>();
  const [turn, setTurn] = useState<0 | 1>(0);
  const sequenceStarted = useRef(false);
  const userInputRef = useRef<Sequence>([]);
  const intervalRef = useRef<number>();
  const intervalRefDuration = useRef<number>(1000);
  const { t } = useTranslation();

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

    if (userInputRef.current.length === 20) {
      setStatus("win");
      return;
    }

    if (userInputRef.current.length === sequence.length) {
      setNextTurn();
    }
  }

  const rules = t("GAME.RULES", { returnObjects: true }) as string[];

  return (
    <div className={styles.boardWrapper}>
      <div className={styles.rules}>
        <div>
          <p>
            <b>{t("GAME.SEQUENCE_COUNT")}</b> {sequence.length / 2}
          </p>
          {turn === 0 && (
            <p>
              <b>{t("GAME.TURN")}</b> {rules[0]}
            </p>
          )}
          {turn === 1 && (
            <p>
              <b>{t("GAME.TURN")}</b> {rules[1]}
            </p>
          )}
        </div>
        <button className={styles.button} type="button" onClick={restart}>
          {t("GAME.RESTART")}
        </button>
      </div>
      <div className={styles.board}>
        {tiles.map((color, index) => (
          <button
            type="button"
            key={index}
            className={classNames({
              [styles.tile]: true,
              [styles.active]: isActive(index),
            })}
            style={{ backgroundColor: color }}
            disabled={turn === 0 && !isActive(index)}
            onClick={() => userClick(index)}
          ></button>
        ))}
      </div>
    </div>
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
  blue: "#0000ff",
  cyan: "#00ffff",
  fuchsia: "#ff00ff",
  gold: "#ffd700",
  green: "#008000",
  khaki: "#f0e68c",
  lightblue: "#add8e6",
  lightcyan: "#e0ffff",
  lightgreen: "#90ee90",
  lightpink: "#ffb6c1",
  magenta: "#ff00ff",
  olive: "#808000",
  orange: "#ffa500",
  pink: "#ffc0cb",
  violet: "#800080",
  red: "#ff0000",
  yellow: "#ffff00",
};
function generateRandomColor() {
  const index = Math.floor(Math.random() * Object.keys(COLORS).length);
  const key = Object.keys(COLORS)[index];
  return COLORS[key];
}

function getTiles(numberOfTiles: number) {
  const tiles: string[] = [];

  for (let i = 0; i < numberOfTiles; i++) {
    const color = generateRandomColor();
    if (tiles.includes(color)) {
      i--;
      continue;
    }
    tiles.push(color);
  }
  return tiles;
}
