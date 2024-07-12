import { useTranslation } from "react-i18next";
import styles from "./volunteering.module.css";
import { SlideInCard } from "../slideInCard/slideInCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

export function Volunteering() {
  const { t } = useTranslation();
  const linkIcon = <FontAwesomeIcon icon={faLink} color="black"></FontAwesomeIcon>
  return (
    <SlideInCard>
      <div className={styles.volunteering}>
        <div id="volunteering" className="hiddenId"></div>
        <h3>{t("SECTIONS.VOLUNTEERING")} </h3>
        <h5>
          {" "}
          {t("VOLUNTEERING.DIABLOS.HEADER")}
          <a href="http://www.footballdiablos.com/">
            {linkIcon}
          </a>
        </h5>
        <div>
          <p>{t("VOLUNTEERING.DIABLOS.DESC")} </p>
        </div>
        <h5>
          {" "}
          {t("VOLUNTEERING.HABITAT.HEADER")}
          <a href="https://www.habitat.ca/">
            {linkIcon}
          </a>
        </h5>
        <div>
          <p>{t("VOLUNTEERING.HABITAT.DESC")} </p>
        </div>
        <h5>
          {" "}
          {t("VOLUNTEERING.MISSION.HEADER")}
          <a href="https://welcomehallmission.com/">
            {linkIcon}
          </a>
        </h5>
        <div>
          <p>{t("VOLUNTEERING.MISSION.DESC")} </p>
        </div>
      </div>
    </SlideInCard>
  );
}
