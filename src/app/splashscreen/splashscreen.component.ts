import { Component, AfterViewInit } from '@angular/core';
import Typed from 'typed.js';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-splashscreen',
  templateUrl: './splashscreen.component.html',
  styleUrls: ['./splashscreen.component.css']
})
export class SplashscreenComponent implements AfterViewInit {

  private typed: any;

  constructor(private translate: TranslateService) { }

  public ngAfterViewInit() {
    this.initiateTypeWriter();

    this.translate.onLangChange.subscribe(() => {
      this.initiateTypeWriter();
    });

    const video = document.getElementById("videoHomepage") as HTMLVideoElement;
    video.addEventListener("click", () => {
      video.play();
    }, false);
  }

  private initiateTypeWriter() {
    this.translate.get("TYPEWRITER").subscribe((typewriterArray: string[]) => {
      if (this.typed) {
        this.typed.destroy();
        this.typed = null;
      }

      this.typed = new Typed(".typewriter", {
        strings: typewriterArray,
        typeSpeed: 50,
        startDelay: 500,
        smartBackspace: true,
        backSpeed: 20,
        loop: false,
        showCursor: true,
        cursorChar: "|",
        autoInsertCss: true
      });
    });
  }

  public scrollToAbout() {
    document.querySelector('#about').scrollIntoView({
      behavior: 'smooth',
      block: "start"
    });
  }

}
