import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { trigger, state, style, animate, transition, group } from '@angular/animations';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('slideInOut', [
      state('closed', style({ height: 0 })),
      state('open', style({ height: '*' })),
      transition('open <=> closed', animate('300ms ease'))
    ])
  ]
})
export class HeaderComponent {
  public scrollDarkBackground = false;
  public state = 'closed';

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const number = window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
    console.log(number);
    if (number > 930) {
      this.scrollDarkBackground = true;
    } else if (this.scrollDarkBackground && number < 10) {
      this.scrollDarkBackground = false;
    }
  }

  constructor(@Inject(DOCUMENT) private document: Document) { }

  public toggleCollapse() {
    this.state = this.state === 'closed' ? 'open' : 'closed';
  }
}
