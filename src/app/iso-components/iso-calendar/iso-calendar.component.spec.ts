import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsoCalendarComponent } from './iso-calendar.component';

describe('IsoCalendarComponent', () => {
  let component: IsoCalendarComponent;
  let fixture: ComponentFixture<IsoCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsoCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsoCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
