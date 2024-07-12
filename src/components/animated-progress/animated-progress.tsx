import { useEffect, useRef, useState } from "react";
import styles from "./animated-progress.module.css";
import { useOnScreen } from "../../hooks/use-on-screen";

export function AnimatedProgress({ maxValue }: { maxValue: number }) {
  const progressRef = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(progressRef);
  const [value, setValue] = useState(0);
  const intervalRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (value < maxValue && isVisible) {
      intervalRef.current = setInterval(() => {
        setValue((val) => val + 1);
      }, 0);
    }

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    };
  }, [value, maxValue, isVisible]);

  return (
    <div className={styles.progress} ref={progressRef}>
      <progress
        className={styles.progressBar}
        max="100"
        value={value}
        data-displayval="0%"
      ></progress>
    </div>
  );
}
