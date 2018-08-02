import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { SkillsComponent } from './skills.component';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { AnimatedProgressComponent } from '../animated-progress/animated-progress.component';
import { ClarityModule } from '@clr/angular';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Observable } from 'rxjs/Observable';
import { MockHttpLoader } from '../../services/mockTranslateLoader.service';
import 'rxjs/add/observable/of';

describe('Skills Component', () => {
    let component: SkillsComponent;
    let fixture: ComponentFixture<SkillsComponent>;
    let translate: TranslateService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useClass: MockHttpLoader
                    }
                }),
                ClarityModule],
            declarations: [SkillsComponent, AnimatedProgressComponent],
            providers: []
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SkillsComponent);
        component = fixture.componentInstance;
        translate = getTestBed().get(TranslateService);
        translate.use('en');
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should translate skills', () => {
        const elements = fixture.nativeElement.querySelectorAll('h5');
        expect(elements.length).toBe(2);
        expect(elements[0].innerHTML).toEqual('Soft Skills');
        expect(elements[1].innerHTML).toEqual('Hard Skills');
    });
});
