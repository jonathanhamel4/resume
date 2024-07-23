import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import styles from "./layout.module.css";
import { SyntheticEvent, useEffect, useRef, useState } from "react";

import logo from "../../assets/header_logo.png";
import { useLinks } from "../../utilities/linkService";
import { SlideOut } from "../slideOut/slideOut";
import { Persona } from "../persona/persona";
import { Education } from "../education/education";
import { Work } from "../work/work";
import { Skills } from "../skills/skills";
import { Volunteering } from "../volunteering/volunteering";
import { Footer } from "../footer/footer";
import { SplashScreen } from "../splashscreen/splashscreen";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export function Layout() {
  const { i18n, t } = useTranslation();
  const links = useLinks().sectionLinks;
  const navigate = useNavigate();
  const [slideOpen, setSlideOpen] = useState(false);
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

  function onLanguageChange() {
    const navigateToLang = i18n.language === "fr" ? "en" : "fr";
    navigate(`/${navigateToLang}`);
    i18n.changeLanguage(navigateToLang);
  }

  function navigateTo(event: SyntheticEvent) {
    const buttonElement = (
      event.target as HTMLElement
    ).closest<HTMLButtonElement>("button[data-ref]");
    if (buttonElement) {
      navigate(`#${buttonElement.dataset.ref}`);
      document.querySelector(`#${buttonElement.dataset.ref}`)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    if (slideOpen) {
      setSlideOpen(false);
    }
  }

  return (
    <div className={classNames([styles.mainContainer])}>
      <header className={styles.headerV2}>
        <div className={styles.hamburger}>
          <button
            className={styles.bars}
            type="button"
            onClick={() => setSlideOpen(true)}
          >
            <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
          </button>
          <button
            className={styles.navLink}
            onClick={navigateTo}
            data-ref="about"
          >
            <img alt="logo" id={styles.headerLogo} src={logo} />
          </button>
        </div>

        <div className={styles.headerContainer}>
          {links.map((link) => (
            <button
              key={link.display}
              data-ref={link.href}
              onClick={navigateTo}
            >
              {t(`SECTIONS.${link.display.toUpperCase()}`)}
            </button>
          ))}
          <button onClick={onLanguageChange}>
            {i18n.language === "fr" ? "English" : "Français"}
          </button>
        </div>
      </header>
      <SlideOut open={slideOpen} setSlideOpen={setSlideOpen}>
        <>
          {links.map((link) => (
            <button
              key={link.display}
              data-ref={link.href}
              onClick={navigateTo}
              className={styles.link}
            >
              {t(`SECTIONS.${link.display.toUpperCase()}`)}
            </button>
          ))}
          <button className={styles.link} onClick={onLanguageChange}>
            {i18n.language === "fr" ? "English" : "Français"}
          </button>
        </>
      </SlideOut>
      <div
        id="overlay"
        className={classNames(
          slideOpen && styles.overlay,
          slideOpen && "overlayOpen"
        )}
        onClick={() => {
          setSlideOpen(false);
        }}
      ></div>
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
