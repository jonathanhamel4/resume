import { useTranslation } from "react-i18next";
import styles from "./work.module.css";
import classNames from "classnames";
import { SlideInCard } from "../slideInCard/slideInCard";

export function Work() {
  const { t } = useTranslation();
  const work = t("WORK", { returnObjects: true }) as {
    COMPANY: string;
    POSITION: string;
    DATE: string;
    DESCRIPTION: string;
  }[];

  function getWorkClass(i: number) {
    const { previousSame, nextSame } = getJobPosition(i);

    if (previousSame && nextSame) {
      return classNames([styles.dotUp, styles.dotDown]);
    }

    if (previousSame) {
      return styles.dotUp;
    }

    if (nextSame) {
      return styles.dotDown;
    }
  }

  function shouldShowCompany(i: number) {
    const { previousSame } = getJobPosition(i);
    return !previousSame;
  }

  function getJobPosition(i: number) {
    const previousSame = work[i - 1] && work[i - 1].COMPANY === work[i].COMPANY;
    const nextSame = work[i + 1] && work[i + 1].COMPANY === work[i].COMPANY;

    return {
      previousSame,
      previous: work[i - 1],
      work,
      nextSame,
      next: work[i + 1],
    };
  }

  return (
    <SlideInCard>
      <div id="work" className="hiddenId"></div>
      <h3>{t("SECTIONS.WORK")}</h3>
      {work.map((work, i) => (
        <div key={work.COMPANY + i} className={styles.flexRow}>
          <div style={{ position: "relative" }} className={getWorkClass(i)}>
            <div className={styles.dot}></div>
          </div>
          <div className={styles.workCompany}>
            {shouldShowCompany(i) && (
              <p
                className={styles.removeSpacing}
                style={{ fontWeight: "bold" }}
              >
                {work.COMPANY}
              </p>
            )}
            <p className={styles.reduceFont}>{work.DATE}</p>
          </div>
          <div>
            <p className={styles.workPosition}>{work.POSITION}</p>
            <p className={styles.reduceFont}>{work.DESCRIPTION}</p>
          </div>
        </div>
      ))}
    </SlideInCard>
  );
}
