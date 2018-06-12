import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public translate: TranslateService) {
    const browserLang: string = translate.getBrowserLang();
    const defaultLang = ['en', 'fr'].includes(browserLang) ? browserLang : 'en';
    translate.setDefaultLang(defaultLang);
    translate.use(defaultLang);
  }
}
