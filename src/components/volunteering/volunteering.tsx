import { useTranslation } from "react-i18next";
import styles from "./volunteering.module.css";

export function Volunteering() {
  const { t } = useTranslation();
  return (
    <div className={styles.card}>
      <div id="volunteering" className="hiddenId"></div>
      <h3>{t("SECTIONS.VOLUNTEERING")} </h3>
      <h5>
        {" "}
        {t("VOLUNTEERING.DIABLOS.HEADER")}
        <a href="http://www.footballdiablos.com/">
          <i className="fa fa-link"> </i>
        </a>
      </h5>
      <div>
        <p>{t("VOLUNTEERING.DIABLOS.DESC")} </p>
      </div>
      <h5>
        {" "}
        {t("VOLUNTEERING.HABITAT.HEADER")}
        <a href="https://www.habitat.ca/">
          <i className="fa fa-link"> </i>
        </a>
      </h5>
      <div>
        <p>{t("VOLUNTEERING.HABITAT.DESC")} </p>
      </div>
      <h5>
        {" "}
        {t("VOLUNTEERING.MISSION.HEADER")}
        <a href="https://welcomehallmission.com/">
          <i className="fa fa-link"> </i>
        </a>
      </h5>
      <div>
        <p>{t("VOLUNTEERING.MISSION.DESC")} </p>
      </div>
    </div>
  );
}
