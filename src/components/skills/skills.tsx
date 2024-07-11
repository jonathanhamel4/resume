import { useTranslation } from "react-i18next";
import styles from "./skills.module.css";
import { AnimatedProgress } from "../animated-progress/animated-progress";
import { useState } from "react";

export interface Skill {
  value: number;
  display?: string;
  tooltip?: string;
  key: string;
}

const hardSkillsList: Skill[] = [
  { key: "Java", value: 50 },
  { key: "JavaScript/Node.js", value: 95 },
  { key: ".NET & .NET Core", value: 70 },
  { key: "Angular 2+", value: 80 },
  { key: "ReactJs", value: 95 },
  { key: "Python", value: 85 },
  { key: "Ruby", value: 60 },
  { key: "Ansible", value: 70 },
  { key: "Bash", value: 60 },
  { key: "SQL", value: 60 },
  { key: "Golang", value: 40 },
].sort((a: Skill, b: Skill) => b.value - a.value);

export function Skills() {
  const { t } = useTranslation();
  const [hardSkillsExpanded, setHardSkillsExpanded] = useState(false);

  const hardSkills = hardSkillsExpanded
    ? hardSkillsList
    : hardSkillsList.slice(0, 7);

  function toggleHardSkills() {
    setHardSkillsExpanded((value) => !value);
  }

  return (
    <div className={styles.card}>
      <div id="skills" className="hiddenId"></div>
      <h3>{t("SECTIONS.SKILLS")}</h3>
      <div>
        {hardSkills.map((skill) => (
          <div key={skill.key}>
            <p className={styles.skillHeading}> {skill.key} </p>
            <AnimatedProgress maxValue={skill.value}></AnimatedProgress>
          </div>
        ))}
        <div className={styles.viewMoreContainer}>
          {!hardSkillsExpanded && (
            <span className={styles.viewMore} onClick={toggleHardSkills}>
              {t("VIEW_MORE")}
            </span>
          )}
          {hardSkillsExpanded && (
            <span className={styles.viewMore} onClick={toggleHardSkills}>
              {t("VIEW_LESS")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
