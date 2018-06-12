import { Component, OnInit } from '@angular/core';
import { Link } from '../../models/link';
import { LinkService } from '../../services/link.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  public links: Link[] = [];

  constructor(private linkService: LinkService) { }

  public ngOnInit() {
    this.links = this.linkService.sectionLinks;
  }

}
