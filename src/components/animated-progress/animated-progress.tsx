import { RefObject, useEffect, useMemo, useRef, useState } from "react";
import styles from "./animated-progress.module.css";

function useOnScreen(ref: RefObject<HTMLElement>) {
  const [isIntersecting, setIntersecting] = useState(false);

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) =>
        setIntersecting(entry.isIntersecting)
      ),
    []
  );

  useEffect(() => {
    if (ref.current) {
      observer.observe(ref.current);
      return () => observer.disconnect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isIntersecting;
}

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
