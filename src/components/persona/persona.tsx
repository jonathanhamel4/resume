import { useLinks } from "../../utilities/linkService";

import styles from "./persona.module.css";
import self from "../../assets/persona2.jpg";
import { useTranslation } from "react-i18next";
import { SlideInCard } from "../slideInCard/slideInCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Persona() {
  const { t } = useTranslation();
  const links = useLinks().socialLinks;
  return (
    <SlideInCard style={{ backgroundColor: "lightgray", border: "darkgrey" }}>
      <div id="about" className="hiddenId"></div>
      <div className={styles.flexRow}>
        <div className={styles.imgPersona}>
          <img alt="" src={self} />
        </div>
        <div className={styles.personaDescription}>
          <div className={styles.flexHeaderWithTitle}>
            <h3>{t("SECTIONS.ABOUT")}</h3>
            {links.map((link, index) => {
              return (
                <a
                  key={link.display}
                  className={styles.aboutLink}
                  target="__blank"
                  href={link.href}
                >
                  <span className={styles.linkDisplay}>{link.display}</span>
                  {index !== links.length - 1 && (
                    <span className={styles.linkSeparator}>|</span>
                  )}
                  {link.icon && (
                    <FontAwesomeIcon
                      size="lg"
                      className={styles.linkIcon}
                      icon={link.icon}
                      pulse={link.buzz}
                    />
                  )}
                </a>
              );
            })}
          </div>
          <p className={styles.wrapNewLine}>{t("ABOUT")}</p>
        </div>
      </div>
    </SlideInCard>
  );
}
