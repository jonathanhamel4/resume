import { RefObject, useEffect, useMemo, useState } from "react";

export function useOnScreen(ref: RefObject<HTMLElement>) {
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
  