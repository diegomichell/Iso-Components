import {TestBed, async} from '@angular/core/testing';

import {AppComponent} from './app.component';
import {IsoCalendarComponent} from './iso-components/iso-calendar/iso-calendar.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        IsoCalendarComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should contain iso calendar tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const dom = fixture.nativeElement;
    expect(dom.querySelectorAll('iso-calendar').length).toBeGreaterThan(0);
  }));

});
