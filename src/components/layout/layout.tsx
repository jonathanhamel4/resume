import { useEffect, useRef } from "react";

import { Persona } from "../persona/persona";
import { Education } from "../education/education";
import { Work } from "../work/work";
import { Skills } from "../skills/skills";
import { Volunteering } from "../volunteering/volunteering";
import { Footer } from "../footer/footer";
import { SplashScreen } from "../splashscreen/splashscreen";
import classNames from "classnames";
import { Header } from "../header/header";

import styles from "./layout.module.css";

export function Layout() {
  const scrolledRef = useRef(false);

  useEffect(() => {
    const hashSplit = window.location.hash.split(/(#[^#]+)/).filter(Boolean);
    const hash = hashSplit[hashSplit.length - 1];
    if (hash && !scrolledRef.current) {
      scrolledRef.current = true;
      setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, []);

  return (
    <div className={classNames([styles.mainContainer])}>
      <Header />
      <div className={styles.mainContent}>
        <SplashScreen />
        <div style={{ overflowY: "auto", overflowX: "hidden" }}>
          <div className={styles.mainContentContainer}>
            <Persona />
            <Education />
            <Work />
            <Skills />
            <Volunteering />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
