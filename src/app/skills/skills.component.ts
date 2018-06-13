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
    { key: 'Leadership', value: 60 } as Skill,
    { key: 'Work Ethic', value: 85 } as Skill,
    { key: 'Positive Attitude', value: 80 } as Skill,
    { key: 'Communication', value: 90, tooltip: 'English & French', tooltipClass: 'tooltip-sm' } as Skill,
    { key: 'Time Management', value: 70 } as Skill,
    { key: 'Problem-Solving Skills', value: 70 } as Skill,
    { key: 'Team Player', value: 95 } as Skill,
    { key: 'Confidence', value: 60 } as Skill,
    { key: 'Learn from Criticism', value: 70 } as Skill,
    { key: 'Work under pressure', value: 80 } as Skill,
    { key: 'Adaptability', value: 85 } as Skill
  ];

  public hardSkills: Skill[] = [
    { key: 'Java', value: 60 } as Skill,
    { key: 'Javascript', value: 95 } as Skill,
    { key: '.NET & .NET Core', value: 80 } as Skill,
    { key: 'AngularJs', value: 70 } as Skill,
    { key: 'Angular 2+', value: 100 } as Skill,
    { key: 'ReactJs', value: 60 } as Skill,
    { key: 'Nodejs + modules', value: 90 } as Skill,
    { key: 'Python', value: 70 } as Skill,
    { key: 'VueJs', value: 15 } as Skill,
    { key: 'Ruby', value: 10 } as Skill,
    { key: 'Ansible', value: 70 } as Skill,
    { key: 'Capistrano', value: 70 } as Skill,
    { key: 'Shell & Bash', value: 40 } as Skill,
    { key: 'PHP', value: 40 } as Skill,
    { key: 'MSSQL', value: 60 } as Skill,
    { key: 'MYSQL', value: 60 } as Skill
  ];

  constructor(private el: ElementRef) {
    this.softSkills = this.softSkills.sort((a: Skill, b: Skill) => a.key.localeCompare(b.key));
    this.hardSkills = this.hardSkills.sort((a: Skill, b: Skill) => a.key.localeCompare(b.key));
  }
}
