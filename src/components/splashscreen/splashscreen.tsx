import classNames from "classnames";
import styles from "./splashscreen.module.css";
import { useTranslation } from "react-i18next";

import webm from "../../assets/Love-Coding.webm?url";
import ogv from "../../assets/Love-Coding.ogv?url";
import mp4 from "../../assets/Love-Coding.mp4?url";
import poster from "../../assets/Love-Coding.jpg";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export function SplashScreen() {
  const { t } = useTranslation();
  const [header, setHeader] = useState("");
  const writerRef = useRef<boolean>(false);
  const [delayElementsVisible, setDelayElementsVisible] = useState(false);
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);

  function scrollToAbout() {
    navigate("#about");
    document.querySelector("#about")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  const appearDelay = useCallback(
    (msg: string, delay: number, isFirstLetter = true) => {
      if (msg) {
        setTimeout(
          () => {
            setHeader((header) => (header += msg[0]));
            appearDelay(msg.substring(1), delay, false);
          },
          isFirstLetter ? delay : 25
        );
      }
    },
    []
  );

  useEffect(() => {
    if (!writerRef.current) {
      writerRef.current = true;
      appearDelay("Jonathan Hamel", 2000);

      setTimeout(() => {
        setDelayElementsVisible(true);
      }, 3000);
    }

    if (videoRef.current) {
      // videoRef.current.muted = true;
      // videoRef.current.play();
    }
  }, [appearDelay]);

  return (
    <div id={styles.headerContainer}>
      <div id={styles.headerTypewriterContainer}>
        <div className={styles.writerRow}>
          <h1 className={styles.appearDelay}>{header}</h1>
          <h1
            className={classNames([styles.initialBlinking, styles.lightgray])}
          >
            |
          </h1>
        </div>
        <h3
          className={classNames([
            styles.fadeInLate,
            styles.titleLabel,
            delayElementsVisible && styles.ready,
          ])}
        >
          {t("TITLE")}
        </h3>
      </div>
      <div className={styles.arrowContainer}>
        <i
          className={classNames([
            styles.goDown,
            "fa fa-angle-down",
            styles.fadeInLate,
            delayElementsVisible && styles.ready,
          ])}
          onClick={scrollToAbout}
        ></i>
      </div>
      <video
        autoPlay
        id={styles.videoHomepage}
        loop
        muted
        ref={videoRef}
        className={styles.fillWidth}
        poster={poster}
      >
        <source src={webm} type="video/webm" />
        <source src={mp4} type="video/mp4" />
        <source src={ogv} type="video/ogv" />
        <img
          src="assets/Love-Coding.jpg"
          title="Your browser does not support the video tag"
        />
      </video>
    </div>
  );
}
