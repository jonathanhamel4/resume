import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Analytics } from '../../services/analytics';

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

  constructor(private route: ActivatedRoute, private router: Router, public translate: TranslateService) { }

  public ngOnInit() {
    this.route.params.subscribe((param: Params) => {
      const language = param['language'] ? param['language'] : null;
      if (this.availableLanguages.includes(language)) {
        this.setLanguage(language);
      } else {
        const browserLang: string = this.translate.getBrowserLang();
        const defaultLang = this.availableLanguages.includes(browserLang) ? browserLang : 'en';
        this.router.navigate(['/' + defaultLang], { replaceUrl: true });
      }
    });

    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          console.log('NavigationEnd:', event);
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
    Analytics.sendEvent('event', 'Language', navigateToLang);
  }

}
