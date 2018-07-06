import { Component, OnInit } from '@angular/core';
import { Link } from '../../models/link';
import { LinkService } from '../../services/link.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  public links: Link[] = [];
  public currentLang = '';

  constructor(private linkService: LinkService, private translate: TranslateService) { }

  public ngOnInit() {
    this.currentLang = this.translate.currentLang;
    this.links = this.linkService.sectionLinks;
  }

  public setCurrentLang() {
    if (this.currentLang === 'en') {
      this.currentLang = 'fr';
      this.translate.use('fr');
    } else {
      this.currentLang = 'en';
      this.translate.use('en');
    }
    localStorage.setItem("ngx-translate-default-lang", this.currentLang);
  }
}
