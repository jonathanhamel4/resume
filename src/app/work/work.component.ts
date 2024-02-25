import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-work",
  templateUrl: "./work.component.html",
  styleUrls: ["./work.component.css"],
})
export class WorkComponent {
  constructor(private translate: TranslateService) {
    translate.setDefaultLang("en");
  }

  public getWork() {
    const work = this.translate.instant("WORK");
    return Array.isArray(work) ? work : [];
  }

  public getWorkClass(i: number) {
    const { previousSame, nextSame } = this.getJobPosition(i);

    if (previousSame && nextSame) {
      return "dot-up dot-down";
    }

    if (previousSame) {
      return "dot-up";
    }

    if (nextSame) {
      return "dot-down";
    }
  }

  public shouldShowCompany(i: number) {
    const { previousSame } = this.getJobPosition(i);
    return !previousSame;
  }

  private getJobPosition(i: number) {
    const work = this.getWork();
    const previousSame = work[i - 1] && work[i - 1].COMPANY === work[i].COMPANY;
    const nextSame = work[i + 1] && work[i + 1].COMPANY === work[i].COMPANY;

    return { previousSame, previous: work[i - 1], work, nextSame, next: work[i + 1] };
  }
}
