import { useTranslation } from "react-i18next";
import concordia from "../../assets/concordia.png";
import cem from "../../assets/cem_v_2.jpg";

import styles from "./education.module.css";
import { SlideInCard } from "../slideInCard/slideInCard";

export function Education() {
  const { t } = useTranslation();

  return (
    <SlideInCard>
      <div id="education" className="hiddenId"></div>
      <h3>{t("SECTIONS.EDUCATION")}</h3>
      <div className={styles.flexRow}>
        <img
          alt={`${t("EDUCATION.CONCORDIA.SCHOOL")} logo`}
          className={styles.educationImg}
          src={concordia}
        />
        <div className={styles.description}>
          <h4 className={styles.school}>{t("EDUCATION.CONCORDIA.SCHOOL")}</h4>
          <p className={styles.descriptionText}>
            {t("EDUCATION.CONCORDIA.DESC")}
          </p>
          <h5 className={styles.honor}>{t("EDUCATION.CONCORDIA.HONOR")}</h5>
          <div
            className={styles.honors}
            dangerouslySetInnerHTML={{
              __html: t("EDUCATION.CONCORDIA.HONORS"),
            }}
          ></div>
        </div>
      </div>

      <div className={styles.flexRow}>
        <img
          alt={`${t("EDUCATION.CEM.SCHOOL")} logo`}
          className={styles.educationImg}
          src={cem}
        />
        <div className={styles.description}>
          <h4 className={styles.school}>{t("EDUCATION.CEM.SCHOOL")}</h4>
          <p className={styles.descriptionText}>{t("EDUCATION.CEM.DESC")}</p>
        </div>
      </div>
    </SlideInCard>
  );
}
