import { Directive, Input, HostListener, Renderer, ElementRef } from '@angular/core';

// tslint:disable-next-line directive-selector
@Directive({ selector: '[app-hover]' })
export class HoverDirective {
    @Input() hoverClass: string;

    constructor(public elementRef: ElementRef, private renderer: Renderer) { }

    @HostListener('mouseover') mouseover() {
        this.renderer.setElementClass(this.elementRef.nativeElement, this.hoverClass, true);
    }

    @HostListener('mouseout') mouseout() {
        this.renderer.setElementClass(this.elementRef.nativeElement, this.hoverClass, false);
    }
}
