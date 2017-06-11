import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IsoCalendarComponent} from './iso-calendar/iso-calendar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [IsoCalendarComponent],
  exports: [IsoCalendarComponent]
})
export class IsoComponentsModule {
}
