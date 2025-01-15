import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Game2048.module.css";
import { useTranslation } from "react-i18next";

const POSSIBLE_CHOICES = [
  2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048,
] as const;

const POSSIBLE_COLORS: Record<(typeof POSSIBLE_CHOICES)[number], string> = {
  2: "#efe4da",
  4: "#ebd8b6",
  8: "#f2ae72",
  16: "#f58f59",
  32: "#f58f59",
  64: "#f58f59",
  128: "#f2cf57",
  256: "#f2cf57",
  512: "#c54242",
  1024: "#ab1d1d",
  2048: "#d50909",
};

function getRandomNumber(
  min: number,
  max: number,
  notInSet = new Set<number>()
): number {
  const number =
    Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) +
    Math.ceil(min);
  if (notInSet.has(number)) {
    return getRandomNumber(min, max, notInSet);
  }

  return number;
}

function cellToTopLeft(cell: number) {
  const left = (cell % 4) * 100;
  const top = Math.floor(cell / 4) * 100;
  return { left, top };
}

let RUNNING_ID = 0;

function generateNumber(notInSet: Set<number> = new Set(), maxExcluded = 2) {
  return {
    value: POSSIBLE_CHOICES[getRandomNumber(0, maxExcluded)],
    index: getRandomNumber(0, 16, notInSet),
    id: RUNNING_ID++,
    wasUpdated: false,
  };
}

export function Game2048() {
  const boardRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const [rect, setRect] = useState<DOMRect>();

  function generateFirstNumbers() {
    const firstNumber = generateNumber();
    const secondNumber = generateNumber(new Set([firstNumber.index]));

    return [firstNumber, secondNumber];
  }

  const [numbers, setNumbers] = useState(generateFirstNumbers());

  const moveNumbers = useCallback(
    (direction: 0 | 1 | 2 | 3) => {
      const goingRight = [
        [3, 2, 1, 0],
        [7, 6, 5, 4],
        [11, 10, 9, 8],
        [15, 14, 13, 12],
      ];
      const goingDown = [
        [12, 8, 4, 0],
        [13, 9, 5, 1],
        [14, 10, 6, 2],
        [14, 10, 6, 2],
        [15, 11, 7, 3],
      ];
      const moveOrder = {
        0: goingRight,
        1: goingDown,
        2: [...goingRight].map((r) => [...r].reverse()),
        3: [...goingDown].map((r) => [...r].reverse()),
      };

      const newNumbers = [...numbers];
      const collapse = (from: number, to: number) => {
        const fromIndexInNumbers = newNumbers.findIndex(
          ({ index }) => index === from
        );
        const fromNum =
          fromIndexInNumbers >= 0 ? newNumbers[fromIndexInNumbers] : null;

        if (!fromNum) return;

        const toIndexInNumbers = newNumbers.findIndex(
          ({ index }) => index === to
        );
        const toNum =
          toIndexInNumbers >= 0 ? newNumbers[toIndexInNumbers] : null;

        if (toNum == null) {
          newNumbers.splice(fromIndexInNumbers, 1, {
            ...fromNum,
            index: to,
            value: fromNum.value,
          });
          return;
        }

        if (toNum.value === fromNum.value && !toNum.wasUpdated) {
          newNumbers.splice(fromIndexInNumbers, 1, {
            ...fromNum,
            index: to,
            value: (fromNum.value * 2) as (typeof POSSIBLE_CHOICES)[number],
            wasUpdated: true,
          });
          newNumbers.splice(toIndexInNumbers, 1);
        }
      };

      moveOrder[direction].forEach((moves) => {
        collapse(moves[1], moves[0]);

        collapse(moves[2], moves[1]);
        collapse(moves[1], moves[0]);

        collapse(moves[3], moves[2]);
        collapse(moves[2], moves[1]);
        collapse(moves[1], moves[0]);
      });

      return newNumbers.map((num) => ({ ...num, wasUpdated: false }));
    },
    [numbers]
  );

  useEffect(() => {
    const rect = boardRef.current?.getBoundingClientRect();
    setRect(rect);

    const listener = (evt: any) => {
      if (numbers.some((num) => num.value === 2048)) return;

      if (evt.key === "ArrowRight") {
        const newNumbers = moveNumbers(0);
        evt.preventDefault();

        if (newNumbers.length === 16) {
          return;
        }

        const biggestNumber = Math.max(...newNumbers.map(({ value }) => value));
        const biggestNumberIndex = POSSIBLE_CHOICES.findIndex(
          (num) => num === biggestNumber
        );
        setNumbers(newNumbers);
        setTimeout(() => {
          const usedIndices = new Set(newNumbers.map(({ index }) => index));
          setNumbers([
            ...newNumbers,
            generateNumber(usedIndices, biggestNumberIndex),
          ]);
        }, 200);
      }
      if (evt.key === "ArrowDown") {
        const newNumbers = moveNumbers(1);
        evt.preventDefault();

        if (newNumbers.length === 16) {
          return;
        }

        const biggestNumber = Math.max(...newNumbers.map(({ value }) => value));
        const biggestNumberIndex = POSSIBLE_CHOICES.findIndex(
          (num) => num === biggestNumber
        );
        setNumbers(newNumbers);
        setTimeout(() => {
          const usedIndices = new Set(newNumbers.map(({ index }) => index));
          setNumbers([
            ...newNumbers,
            generateNumber(usedIndices, biggestNumberIndex),
          ]);
        }, 200);
      }
      if (evt.key === "ArrowLeft") {
        const newNumbers = moveNumbers(2);
        evt.preventDefault();

        if (newNumbers.length === 16) {
          return;
        }

        const biggestNumber = Math.max(...newNumbers.map(({ value }) => value));
        const biggestNumberIndex = POSSIBLE_CHOICES.findIndex(
          (num) => num === biggestNumber
        );
        setNumbers(newNumbers);
        setTimeout(() => {
          const usedIndices = new Set(newNumbers.map(({ index }) => index));
          setNumbers([
            ...newNumbers,
            generateNumber(usedIndices, biggestNumberIndex),
          ]);
        }, 200);
      }
      if (evt.key === "ArrowUp") {
        const newNumbers = moveNumbers(3);
        evt.preventDefault();

        if (newNumbers.length === 16) {
          return;
        }

        const biggestNumber = Math.max(...newNumbers.map(({ value }) => value));
        const biggestNumberIndex = POSSIBLE_CHOICES.findIndex(
          (num) => num === biggestNumber
        );
        setNumbers(newNumbers);
        setTimeout(() => {
          const usedIndices = new Set(newNumbers.map(({ index }) => index));
          setNumbers([
            ...newNumbers,
            generateNumber(usedIndices, biggestNumberIndex),
          ]);
        }, 200);
      }
    };

    boardRef.current?.addEventListener("keydown", listener);
    const boardRefValue = boardRef.current;
    return () => {
      boardRefValue?.removeEventListener("keydown", listener);
    };
  }, [moveNumbers, numbers]);

  function newGame() {
    setNumbers(generateFirstNumbers());
  }

  return (
    <>
      <button type="button" className={styles.newGameButton} onClick={newGame}>
        {t("NEW_GAME")}
      </button>
      <div style={{ position: "relative" }}>
        <div className={styles.board} ref={boardRef} tabIndex={0}>
          {Array.from({ length: 16 }).map((_, index) => {
            return <div key={index} className={styles.boardCell}></div>;
          })}
        </div>
        {numbers.map((numberObj) => (
          <span
            key={numberObj.id}
            className={styles.number}
            style={
              rect
                ? {
                    top: cellToTopLeft(numberObj.index).top,
                    left: cellToTopLeft(numberObj.index).left,
                  }
                : { display: "none" }
            }
          >
            <span
              style={{
                backgroundColor: POSSIBLE_COLORS[numberObj.value] as any,
              }}
            >
              {numberObj.value}
            </span>
          </span>
        ))}
      </div>
    </>
  );
}
