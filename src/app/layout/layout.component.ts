import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Link } from '../../models/link';
import { LinkService } from '../../services/link.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, AfterViewInit, OnDestroy {

  public links: Link[] = [];
  public currentLang = '';

  constructor(private linkService: LinkService, private translate: TranslateService) { }

  public ngOnInit() {
    this.currentLang = this.translate.currentLang;
    this.links = this.linkService.sectionLinks;
  }

  public ngAfterViewInit() {
    Array.from(document.querySelectorAll(".header-anchor")).forEach((anchor: HTMLAnchorElement) => {
      anchor.addEventListener("click", this.navigateTo.bind(this, anchor), true)
    });
  }

  public ngOnDestroy() {
    Array.from(document.querySelectorAll(".header-anchor")).forEach((anchor: HTMLAnchorElement) => {
      anchor.removeEventListener("click", this.navigateTo.bind(this), true)
    });
  }

  private navigateTo(eventTarget: HTMLAnchorElement, event: MouseEvent) {
    event.preventDefault();
    document.querySelector(eventTarget.hash).scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    history.pushState(null, eventTarget.href, eventTarget.href);
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
