import classNames from "classnames";
import styles from "./splashscreen.module.css";
import { useTranslation } from "react-i18next";

import webm from "../../assets/Love-Coding.webm?url";
import ogv from "../../assets/Love-Coding.ogv?url";
import mp4 from "../../assets/Love-Coding.mp4?url";
import poster from "../../assets/Love-Coding.jpg";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

export function SplashScreen() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  function scrollToAbout() {
    navigate("#about");
    document.querySelector("#about")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <div id={styles.headerContainer}>
      <div id={styles.headerTypewriterContainer}>
        <h1 className={styles.appearDelay}>Jonathan Hamel</h1>
        <h3 className={classNames([styles.fadeInLate, styles.titleLabel])}>
          {t("TITLE")}
        </h3>
      </div>
      <div className={styles.arrowContainer}>
        <FontAwesomeIcon
          onClick={scrollToAbout}
          icon={faAngleDown}
          className={classNames([styles.goDown, styles.fadeInLate])}
        ></FontAwesomeIcon>
      </div>
      <video
        autoPlay
        id={styles.videoHomepage}
        loop
        muted
        className={styles.fillWidth}
        poster={poster}
      >
        <source src={webm} type="video/webm" />
        <source src={mp4} type="video/mp4" />
        <source src={ogv} type="video/ogv" />
        <img
          alt="splashscreen"
          src={poster}
          title="Your browser does not support the video tag"
        />
      </video>
    </div>
  );
}
