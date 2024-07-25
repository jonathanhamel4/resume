import { SyntheticEvent, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import logo from "../../assets/header_logo.png";
import styles from "./header.module.css";
import { useNavigate } from "react-router-dom";
import { SlideOut } from "../slideOut/slideOut";
import { useTranslation } from "react-i18next";
import { useLinks } from "../../utilities/linkService";
import classNames from "classnames";

export function Header() {
  const [slideOpen, setSlideOpen] = useState(false);
  const links = useLinks().sectionLinks;
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();

  //   useEffect(() => {
  //     const onScroll = () => {
  //       if (window.scrollY >= window.innerHeight) {
  //         console.log(true);
  //       } else {

  //       }
  //     };
  //     window.addEventListener("scroll", onScroll, { passive: true });

  //     return () => {
  //       window.removeEventListener("scroll", onScroll);
  //     };
  //   }, []);

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

  function onLanguageChange() {
    const navigateToLang = i18n.language === "fr" ? "en" : "fr";
    navigate(`/${navigateToLang}`);
    i18n.changeLanguage(navigateToLang);
  }

  return (
    <>
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
    </>
  );
}
