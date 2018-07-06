import { Component, HostListener, ElementRef } from '@angular/core';
import { Skill } from '../../models/skill';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {

  public showLoaders = false;

  public softSkills: Skill[] = [
    { key: 'Leadership', currentValue: 0, value: 60 } as Skill,
    { key: 'Work Ethic', currentValue: 0, value: 85 } as Skill,
    { key: 'Positive Attitude', currentValue: 0, value: 80 } as Skill,
    { key: 'Communication', currentValue: 0, value: 90, tooltip: 'English & French', tooltipClass: 'tooltip-sm' } as Skill,
    { key: 'Time Management', currentValue: 0, value: 70 } as Skill,
    { key: 'Problem-Solving Skills', currentValue: 0, value: 70 } as Skill,
    { key: 'Team Player', currentValue: 0, value: 95 } as Skill,
    { key: 'Confidence', currentValue: 0, value: 60 } as Skill,
    { key: 'Learn from Criticism', currentValue: 0, value: 70 } as Skill,
    { key: 'Work under pressure', currentValue: 0, value: 80 } as Skill,
    { key: 'Adaptability', currentValue: 0, value: 85 } as Skill
  ];

  public hardSkills: Skill[] = [
    { key: 'Java', currentValue: 0, value: 60 } as Skill,
    { key: 'Javascript', currentValue: 0, value: 95 } as Skill,
    { key: '.NET & .NET Core', currentValue: 0, value: 80 } as Skill,
    { key: 'AngularJs', currentValue: 0, value: 70 } as Skill,
    { key: 'Angular 2+', currentValue: 0, value: 100 } as Skill,
    { key: 'ReactJs', currentValue: 0, value: 60 } as Skill,
    { key: 'Nodejs + modules', currentValue: 0, value: 90 } as Skill,
    { key: 'Python', currentValue: 0, value: 70 } as Skill,
    { key: 'VueJs', currentValue: 0, value: 15 } as Skill,
    { key: 'Ruby', currentValue: 0, value: 10 } as Skill,
    { key: 'Ansible', currentValue: 0, value: 70 } as Skill,
    { key: 'Capistrano', currentValue: 0, value: 70 } as Skill,
    { key: 'Shell & Bash', currentValue: 0, value: 40 } as Skill,
    { key: 'PHP', currentValue: 0, value: 40 } as Skill,
    { key: 'MSSQL', currentValue: 0, value: 60 } as Skill,
    { key: 'MYSQL', currentValue: 0, value: 60 } as Skill
  ];

  public softSkillsExpanded = false;
  public hardSkillsExpanded = false;

  constructor(private el: ElementRef) {
    this.softSkills = this.softSkills.sort((a: Skill, b: Skill) => a.key.localeCompare(b.key));
    this.hardSkills = this.hardSkills.sort((a: Skill, b: Skill) => a.key.localeCompare(b.key));
  }

  public getSoftSkills(): Skill[] {
    return this.softSkillsExpanded ? this.softSkills : this.softSkills.slice(0, 10);
  }

  public getHardSkills(): Skill[] {
    return this.hardSkillsExpanded ? this.hardSkills : this.hardSkills.slice(0, 10);
  }

  public toggleSoftSkillsExpanded(): void {
    this.softSkillsExpanded = !this.softSkillsExpanded;
  }

  public toggleHardSkillsExpanded(): void {
    this.hardSkillsExpanded = !this.hardSkillsExpanded;
  }
}
