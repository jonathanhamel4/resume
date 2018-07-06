import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-animated-progress',
  templateUrl: './animated-progress.component.html',
  styleUrls: ['./animated-progress.component.css']
})
export class AnimatedProgressComponent  {

  @Input() item: { currentValue: number, value: number }

  private alreadySeen: boolean = false;

  constructor() { }

  public inViewPortEvent(event: any) {
    if(!this.alreadySeen && event.visible) {
      this.alreadySeen = true;
      while(this.item.currentValue < this.item.value) {
        this.item.currentValue++;
      }
    }
  }

}
