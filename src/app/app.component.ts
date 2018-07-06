import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private availableLanguages: string[] = ["en", "fr"];

  constructor(public translate: TranslateService) {
    const localStorageLanguage: string = localStorage.getItem("ngx-translate-default-lang");
    if(localStorageLanguage && this.availableLanguages.includes(localStorageLanguage.toLowerCase())) {
      this.setLanguage(localStorageLanguage);
    } else {
      const browserLang: string = translate.getBrowserLang();
      const defaultLang =this.availableLanguages.includes(browserLang) ? browserLang : 'en';
      this.setLanguage(defaultLang);
    }
  }

  private setLanguage(language: string) {
    this.translate.setDefaultLang(language);
    this.translate.use(language);
  }
}
