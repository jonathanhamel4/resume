import { Component, HostListener, ElementRef } from "@angular/core";
import { Skill } from "../../models/skill";

@Component({
  selector: "app-skills",
  templateUrl: "./skills.component.html",
  styleUrls: ["./skills.component.css"],
})
export class SkillsComponent {
  public showLoaders = false;

  public hardSkills: Skill[] = [
    { key: "Java", currentValue: 0, value: 50 } as Skill,
    { key: "JavaScript/Node.js", currentValue: 0, value: 95 } as Skill,
    { key: ".NET & .NET Core", currentValue: 0, value: 70 } as Skill,
    { key: "Angular 2+", currentValue: 0, value: 80 } as Skill,
    { key: "ReactJs", currentValue: 0, value: 95 } as Skill,
    { key: "Python", currentValue: 0, value: 85 } as Skill,
    { key: "Ruby", currentValue: 0, value: 60 } as Skill,
    { key: "Ansible", currentValue: 0, value: 70 } as Skill,
    { key: "Bash", currentValue: 0, value: 60 } as Skill,
    { key: "SQL", currentValue: 0, value: 60 } as Skill,
    { key: "Golang", currentValue: 0, value: 40 } as Skill,
  ];

  public hardSkillsExpanded = false;

  constructor(private el: ElementRef) {
    this.hardSkills = this.hardSkills.sort(
      (a: Skill, b: Skill) => b.value - a.value
    );
  }

  public getHardSkills(): Skill[] {
    return this.hardSkillsExpanded
      ? this.hardSkills
      : this.hardSkills.slice(0, 7);
  }

  public toggleHardSkillsExpanded(): void {
    this.hardSkillsExpanded = !this.hardSkillsExpanded;
  }
}
