import { Directive, Input, HostListener, Renderer2, ElementRef } from '@angular/core';

@Directive({ selector: '[appHover]' })
export class HoverDirective {
  @Input() hoverClass: string;

  constructor(public elementRef: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseover') mouseover() {
    this.renderer.addClass(this.elementRef.nativeElement, this.hoverClass);
  }

  @HostListener('mouseout') mouseout() {
    this.renderer.removeClass(this.elementRef.nativeElement, this.hoverClass);
  }
}
