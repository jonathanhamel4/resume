import { useLinks } from "../../utilities/linkService";

import styles from "./persona.module.css";
import self from "../../assets/persona2.jpg";
import { useTranslation } from "react-i18next";
import classNames from "classnames";

export function Persona() {
  const { t } = useTranslation();
  const links = useLinks().socialLinks;
  return (
    <div className={styles.about}>
      <div id="about" className="hiddenId"></div>
      <div className={styles.flexRow}>
        <div className={styles.imgPersona}>
          <img src={self} />
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
                  <i
                    className={classNames([
                      link.icon,
                      link.animationClass
                        ? styles[link.animationClass]
                        : undefined,
                      styles.linkIcon,
                    ])}
                  ></i>
                </a>
              );
            })}
          </div>
          <p className={styles.wrapNewLine}>{t("ABOUT")}</p>
        </div>
      </div>
    </div>
  );
}
