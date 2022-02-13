import { TestBed } from "@angular/core/testing"
import { MainComponent } from "./main.component"
import { waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { TranslateTestingModule } from 'ngx-translate-testing';

beforeEach(waitForAsync(() => {
  TestBed.configureTestingModule({
    imports: [RouterTestingModule, TranslateTestingModule.withTranslations({})]
  }).compileComponents();
}));

it('mounts', () => {
  const component = TestBed.createComponent(MainComponent);
  const main = component.debugElement.componentInstance;
  expect(main).toBeTruthy();
})
