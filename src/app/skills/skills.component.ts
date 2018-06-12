import { Component, OnInit } from '@angular/core';
import { Skill } from '../../models/skill';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  public softSkills: Skill[] = [
    { display: 'Leadership', value: 60 } as Skill
  ]

  public hardSkills: Skill[] = [
    { display: 'Leadership', value: 60 } as Skill
  ]

  constructor() { }

  ngOnInit() {
  }

}
