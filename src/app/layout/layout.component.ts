import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Link } from '../../models/link';
import { LinkService } from '../../services/link.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Typed from 'typed.js';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, AfterViewInit {

  public links: Link[] = [];
  public currentLang = '';
  private typed: any;

  constructor(private linkService: LinkService, private translate: TranslateService) { }

  public ngOnInit() {
    this.currentLang = this.translate.currentLang;
    this.links = this.linkService.sectionLinks;
  }

  public ngAfterViewInit() {    
    this.initiateTypeWriter();

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.initiateTypeWriter();
    });

    const video = document.getElementById("videoHomepage") as HTMLVideoElement;
    video.addEventListener("click", () => {
      video.play();
    }, false);
  }

  private initiateTypeWriter() {
    this.translate.get("TYPEWRITER").subscribe((typewriterArray: string[]) => {
      if(this.typed) {
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

  public setCurrentLang() {
    if (this.currentLang === 'en') {
      this.currentLang = 'fr';
      this.translate.use('fr');
    } else {
      this.currentLang = 'en';
      this.translate.use('en');
    }
  }

  public scrollToAbout() {
    document.querySelector('#about').scrollIntoView({ 
      behavior: 'smooth',
      block: "start"
    });
  }
}
