import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import styles from "./simonsays.module.css";
import { SlideInCard } from "../slideInCard/slideInCard";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

const NUMBER_OF_TILES = 6;

type Status = "win" | "loose" | null;
type Sequence = (number | null)[];

export function SimonSays() {
  const { t } = useTranslation();
  const [started, setStarted] = useState(false);
  const [status, setStatus] = useState<Status>(null);

  const rules = t("GAME.RULES", { returnObjects: true }) as string[];

  function restart() {
    setStatus(null);
    setStarted(false);
  }

  return (
    <SlideInCard>
      {!started && !status && (
        <>
          <h3>{t("GAME.TITLE")}</h3>
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
        </>
      )}
      {started && (
        <SimonSaysBoard
          setStatus={setStatus}
          restart={restart}
          status={status}
        />
      )}
    </SlideInCard>
  );
}

function SimonSaysBoard({
  setStatus,
  status,
  restart,
}: {
  setStatus: Dispatch<SetStateAction<Status>>;
  status: Status;
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
    if (sequenceStarted.current || turn !== 0 || status !== null) {
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
  }, [sequence, status]);

  function isActive(index: number) {
    return activeTile != null && index === sequence[activeTile];
  }

  function userClick(tileIndex: number) {
    const indexToLookUp = userInputRef.current.length;

    if (sequence[indexToLookUp] !== tileIndex) {
      setStatus("loose");
      setTurn(0);
      return;
    }

    userInputRef.current.push(...[tileIndex, null]);

    if (userInputRef.current.length === 20) {
      setStatus("win");
      setTurn(0);
      return;
    }

    if (userInputRef.current.length === sequence.length) {
      setNextTurn();
    }
  }

  return (
    <div className={styles.boardWrapper}>
      <div className={styles.controls}>
        <p className={styles.levels}>
          {t("GAME.LEVEL")} {sequence.length / 2}
        </p>
        {status === null && (
          <button className={styles.button} type="button" onClick={restart}>
            {t("GAME.RESTART")}
          </button>
        )}
        {status === "win" && (
          <div style={{ display: "flex" }}>
            <p>{t("GAME.WON")}</p>
            <button
              className={styles.unStyledButton}
              type="button"
              onClick={restart}
            >
              {t("GAME.PLAY_AGAIN")}
            </button>
          </div>
        )}
        {status === "loose" && (
          <div style={{ display: "flex" }}>
            <p>{t("GAME.LOOSE")}</p>
            <button
              className={styles.unStyledButton}
              type="button"
              onClick={restart}
            >
              {t("GAME.TRY_AGAIN")}
            </button>
          </div>
        )}
      </div>
      <div className={styles.board}>
        <div
          className={classNames({
            [styles.overlay]: true,
            [styles.overlayVisible]: turn === 0,
          })}
        ></div>
        {tiles.map((color, index) => (
          <button
            type="button"
            key={index}
            className={classNames({
              [styles.tile]: true,
              [styles.active]: isActive(index),
            })}
            style={{
              background: `linear-gradient(90deg,rgb(255 255 255/50%),rgb(0 0 0/50%)), ${color}`,
            }}
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
  green: "#008000",
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
