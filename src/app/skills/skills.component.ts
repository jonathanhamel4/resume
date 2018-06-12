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
    { display: 'Leadership', value: 60 } as Skill,
    { display: 'Work Ethic', value: 85 } as Skill,
    { display: 'Positive Attitude', value: 80 } as Skill,
    { display: 'Communication', value: 90, tooltip: 'English & French', tooltipClass: 'tooltip-sm' } as Skill,
    { display: 'Time Management', value: 70 } as Skill,
    { display: 'Problem-Solving Skills', value: 70 } as Skill,
    { display: 'Team Player', value: 95 } as Skill,
    { display: 'Confidence', value: 60 } as Skill,
    { display: 'Learn from Criticism', value: 70 } as Skill,
    { display: 'Work under pressure', value: 80 } as Skill,
    { display: 'Adaptability', value: 85 } as Skill
  ];

  public hardSkills: Skill[] = [
    { display: 'Java', value: 60 } as Skill,
    { display: 'Javascript', value: 95 } as Skill,
    { display: '.NET & .NET Core', value: 80 } as Skill,
    { display: 'AngularJs', value: 70 } as Skill,
    { display: 'Angular 2+', value: 100 } as Skill,
    { display: 'ReactJs', value: 60 } as Skill,
    { display: 'Nodejs + modules', value: 90 } as Skill,
    { display: 'Python', value: 70 } as Skill,
    { display: 'VueJs', value: 15 } as Skill,
    { display: 'Ruby', value: 10 } as Skill,
    { display: 'Ansible', value: 70 } as Skill,
    { display: 'Capistrano', value: 70 } as Skill,
    { display: 'Shell & Bash', value: 40 } as Skill,
    { display: 'PHP', value: 40 } as Skill,
    { display: 'MSSQL', value: 60 } as Skill,
    { display: 'MYSQL', value: 60 } as Skill
  ];

  constructor(private el: ElementRef) {
    this.softSkills = this.softSkills.sort((a: Skill, b: Skill) => a.display.localeCompare(b.display));
    this.hardSkills = this.hardSkills.sort((a: Skill, b: Skill) => a.display.localeCompare(b.display));
  }
}
