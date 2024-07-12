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
    const anchorElement = findAnchor(
      event.target as HTMLElement
    ) as HTMLAnchorElement;
    if (anchorElement) {
      navigate(`#${anchorElement.dataset.ref}`);
      document.querySelector(`#${anchorElement.dataset.ref}`)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    if (slideOpen) {
      setSlideOpen(false);
    }
  }

  function findAnchor(target: HTMLElement) {
    let t: HTMLElement | null = target;
    while (t && t.tagName !== "A") {
      t = target.parentElement;
    }
    return t;
  }

  return (
    <div className={classNames([styles.mainContainer])}>
      <header className={styles.header}>
        <div className={styles.branding}>
          <button
            className={styles.bars}
            type="button"
            onClick={() => setSlideOpen(true)}
          >
            <i className="fa fa-bars"></i>
          </button>
          <a className={styles.navLink} onClick={navigateTo} data-ref="about">
            <img id={styles.headerLogo} src={logo} />
          </a>
        </div>
        <div className={styles.linkContainer}>
          {links.map((link) => (
            <a
              key={link.display}
              data-ref={link.href}
              onClick={navigateTo}
              className={styles.link}
            >
              {t(`SECTIONS.${link.display.toUpperCase()}`)}
            </a>
          ))}
          <a className={styles.link} onClick={onLanguageChange}>
            {i18n.language === "fr" ? "English" : "Français"}
          </a>
        </div>
      </header>
      <SlideOut open={slideOpen} setSlideOpen={setSlideOpen}>
        <>
          {links.map((link) => (
            <a
              key={link.display}
              data-ref={link.href}
              onClick={navigateTo}
              className={styles.link}
            >
              {t(`SECTIONS.${link.display.toUpperCase()}`)}
            </a>
          ))}
          <a className={styles.link} onClick={onLanguageChange}>
            {i18n.language === "fr" ? "English" : "Français"}
          </a>
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
