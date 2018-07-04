import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Link } from '../../models/link';
import { LinkService } from '../../services/link.service';
import { TranslateService } from '@ngx-translate/core';
import Typed from 'typed.js';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, AfterViewInit {

  public links: Link[] = [];
  public currentLang = '';

  constructor(private linkService: LinkService, private translate: TranslateService) { }

  public ngOnInit() {
    this.currentLang = this.translate.currentLang;
    this.links = this.linkService.sectionLinks;
  }

  public ngAfterViewInit() {
    new Typed(".typewriter", { 
      strings: [
        "Hi, my name is Jonathan",
        "I'm a Web Developer", 
        "I'm an Engineer",
        "I'm a Software Engineer",
        "Here is my interactive resume"],
      typeSpeed: 50,
      startDelay: 500,
      smartBackspace: true,
      backSpeed: 20,
      loop: false,
      showCursor: true,
      cursorChar: "|",
      autoInsertCss: true
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
