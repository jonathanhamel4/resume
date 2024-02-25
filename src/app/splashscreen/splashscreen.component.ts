import { Component, AfterViewInit, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Utils } from '../../services/Utils';

@Component({
  selector: 'app-splashscreen',
  templateUrl: './splashscreen.component.html',
  styleUrls: ['./splashscreen.component.css']
})
export class SplashscreenComponent implements OnInit, AfterViewInit {

  @ViewChild('videoHomepage', { static: true }) videoHomepage!: ElementRef<HTMLVideoElement>;

  public header: string = "";
  public delayTitle: string = "";
  public delayArrow: string = "";

  constructor() { }

  public ngOnInit() {
    this.appearDelay("Jonathan Hamel", 2000, "header");
    Utils.setValueDelay("ready", ["delayTitle", "delayArrow"], this, 3000);
  }

  public ngAfterViewInit() {
    const videoTag = this.videoHomepage.nativeElement;
    videoTag.muted = true;
    videoTag.play();
  }

  public scrollToAbout() {
    document.querySelector('#about').scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  private appearDelay(msg: string, delay: number, varReference: string, isFirstLetter = true) {
    if (isFirstLetter) {
      this[varReference] = "";
    }

    if (msg) {
      const timeout = setTimeout(() => {
        this[varReference] += msg[0];
        this.appearDelay(msg.substring(1), delay, varReference, false);
        clearTimeout(timeout);
      }, (isFirstLetter ? delay : 25));
    }
  }
}
