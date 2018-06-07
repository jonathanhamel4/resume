import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, group } from '@angular/animations';

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
  state = 'closed';

  public toggleCollapse() {
    this.state = this.state === 'closed' ? 'open' : 'closed';
  }
}
