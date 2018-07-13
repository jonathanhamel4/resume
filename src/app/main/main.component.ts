import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-main',
  template: `
    <app-layout *ngIf='translate.currentLang' (onLanguageToggle)='onLanguageToggle()'>
      <div main-content>
        <app-persona></app-persona>
        <app-education></app-education>
        <app-work></app-work>
        <app-skills></app-skills>
        <app-volunteering></app-volunteering>
      </div>
      <app-footer footer></app-footer>
    </app-layout>`
})
export class MainComponent implements OnInit {

  private availableLanguages: string[] = ['en', 'fr'];
  private currentLanguage: string = null;

  constructor(private route: ActivatedRoute, private router: Router, public translate: TranslateService) { }

  public ngOnInit() {
    this.route.params.subscribe((param: Params) => {
      const language = param['language'] ? param['language'] : null;
      if (this.availableLanguages.includes(language)) {
        this.currentLanguage = language;
        this.setLanguage(language);
      } else {
        const browserLang: string = this.translate.getBrowserLang();
        const defaultLang = this.availableLanguages.includes(browserLang) ? browserLang : 'en';
        this.router.navigate(['/' + defaultLang]);
      }
    });
  }

  private setLanguage(language: string) {
    this.translate.setDefaultLang(language);
    this.translate.use(language);
  }

  public onLanguageToggle() {
    const navigateToLang = this.translate.currentLang === 'fr' ? 'en' : 'fr';
    this.router.navigate(['/' + navigateToLang]);
  }

}
