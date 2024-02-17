import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Link } from '../../models/link';
import { LinkService } from '../../services/link.service';
import { TranslateService } from '@ngx-translate/core';
import { Analytics } from '../../services/analytics';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  @Output() onLanguageToggle: EventEmitter<void>; // eslint-disable-line @angular-eslint/no-output-on-prefix

  public links: Link[] = [];

  constructor(private linkService: LinkService, public translate: TranslateService) {
    this.onLanguageToggle = new EventEmitter<void>();
  }

  public ngOnInit() {
    this.links = this.linkService.sectionLinks;
    console.log(this.links)
  }

  public navigateTo(event: MouseEvent) {
    const anchorElement = this.findAnchor(event.target as HTMLElement) as HTMLAnchorElement;
    if (anchorElement) {
      document.querySelector(anchorElement.hash).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      history.pushState(null, anchorElement.href, anchorElement.href);
      Analytics.sendEvent('event', 'Navigate', anchorElement.hash);
    }
  }

  public findAnchor(target: HTMLElement) {
    while (target && target.tagName !== 'A') {
      target = target.parentElement;
    }
    return target;
  }

  public changeLanguage() {
    this.onLanguageToggle.emit();
  }
}
