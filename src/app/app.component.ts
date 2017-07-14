import {Component} from '@angular/core';
import {CalendarTag, DayInfo, MonthInfo} from './iso-components/iso-calendar/iso-calendar.component';

@Component({
  selector: 'iso-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  monthInfo = new MonthInfo(6, 2017, [
    new DayInfo('2017-06-13', 'Birthday!', new CalendarTag('Holiday', '#cb3832', '#fff'))
  ]);
}
