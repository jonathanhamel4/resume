import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { PersonaComponent } from './persona/persona.component';
import { FooterComponent } from './footer/footer.component';
import { EducationComponent } from './education/education.component';
import { SkillsComponent } from './skills/skills.component';
import { VolunteeringComponent } from './volunteering/volunteering.component';
import { HttpClientModule } from '@angular/common/http';
import { HoverDirective } from '../directives/hover.directive';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { SplashscreenComponent } from './splashscreen/splashscreen.component';
import { InViewportModule } from 'ng-in-viewport';
import { AnimatedProgressComponent } from './animated-progress/animated-progress.component';

const httpLoaderPrefix = environment.production ? "/resume/assets/i18n/" : "/assets/i18n/";
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, httpLoaderPrefix);
}

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    PersonaComponent,
    FooterComponent,
    EducationComponent,
    SkillsComponent,
    VolunteeringComponent,
    HoverDirective,
    SplashscreenComponent,
    AnimatedProgressComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule,
    HttpClientModule,
    InViewportModule,
    TranslateModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
