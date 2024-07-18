import styles from "./slideOut.module.css";

import logo from "../../assets/header_logo.png";
import classNames from "classnames";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

export function SlideOut({
  children,
  open,
  setSlideOpen,
}: React.PropsWithChildren<{
  open: boolean;
  setSlideOpen(open: boolean): void;
}>) {
  const slideOutRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={slideOutRef}
      className={classNames([styles.slideOut, open && styles.opening])}
    >
      <div className={styles.header}>
        <img alt="logo" id={styles.headerLogo} src={logo} />
        <button className={styles.unstyled} onClick={() => setSlideOpen(false)}>
          <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
        </button>
      </div>
      <div className={styles.links}>{children}</div>
    </div>
  );
}
