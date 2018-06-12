import { Component, OnInit } from '@angular/core';
import { LinkService } from '../../services/link.service';
import { Link } from '../../models/link';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  public socialLinks: Link[] = [];

  constructor(private linkService: LinkService) { }

  ngOnInit() {
    this.socialLinks = this.linkService.socialLinks;
  }

}
