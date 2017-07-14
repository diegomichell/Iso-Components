import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';

const MONTH_NAMES = moment.monthsShort();

export const WEEK_DAYS_STARTING_SUNDAY: string[] = [
  'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'
].map(day => day.substr(0, 3));

export const WEEK_DAYS_STARTING_MONDAY: string[] = [
  'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
].map(day => day.substr(0, 3));

export const MAX_NUMBER_OF_DAYS_IN_CALENDAR = 42;

export class MonthInfo {
  monthIndex: number;
  year: number;
  dayInfos: DayInfo[] = [];

  constructor(monthIndex: number, year: number, dayInfos: DayInfo[]) {
    this.monthIndex = monthIndex;
    this.year = year;
    this.dayInfos = dayInfos;
  }
}

export class DayInfo {
  date: string;
  message: string;
  tag: CalendarTag;

  constructor(date: string, message: string, tag: CalendarTag) {
    this.date = date;
    this.message = message;
    this.tag = tag;
  }
}

export class CalendarTag {
  title: string;
  bgColor: string;
  textColor: string;

  constructor(title: string, bgColor: string, textColor: string) {
    this.title = title;
    this.bgColor = bgColor;
    this.textColor = textColor;
  }
}

export interface CalendarDay {
  day: number;
  inMonth: boolean;
}

@Component({
  selector: 'iso-calendar',
  templateUrl: './iso-calendar.component.html',
  styleUrls: ['./iso-calendar.component.scss']
})
export class IsoCalendarComponent implements OnInit {

  @Input()
  monthInfo: MonthInfo;
  @Input()
  tags: CalendarTag[];
  @Input()
  startSunday = true;
  weekDays: string[];
  monthName: string;
  monthMoment: moment.Moment;

  daysInCalendar: CalendarDay[][];
  @Output()
  selectedCalendarDay = new EventEmitter<DayInfo>();

  ngOnInit() {
    this.monthMoment = moment(`${this.monthInfo.year} ${this.monthInfo.monthIndex + 1}`, 'YYYY MM');
    this.monthName = MONTH_NAMES[this.monthInfo.monthIndex];
    this.daysInCalendar = this.calculateDaysInCalendar();
    this.weekDays = this.startSunday ? WEEK_DAYS_STARTING_SUNDAY : WEEK_DAYS_STARTING_MONDAY;
  }

  calculateDaysInCalendar(): CalendarDay[][] {
    const currentMonthDays: CalendarDay[] = [];
    const numDaysInMonth = this.monthMoment.daysInMonth();

    for (let i = 1; i <= numDaysInMonth; i++) {
      currentMonthDays.push({day: i, inMonth: true});
    }

    const paddedDaysInCalendar = this.padDaysInCalendar(currentMonthDays);

    return _.chunk(paddedDaysInCalendar, 7);
  }

  selectCalendarDay(calendarDay: CalendarDay) {

    if (calendarDay.inMonth) {
      const dayInfo = this.monthInfo.dayInfos.find(info => {
        const dayInfoMoment = moment(info.date, 'YYYY-MM-DD');
        return dayInfoMoment.date() === calendarDay.day && dayInfoMoment.year() === this.monthMoment.year();
      });

      if (dayInfo) {
        this.selectedCalendarDay.emit(dayInfo);
      }
    }

  }

  getTagBgColor(calendarDay: CalendarDay) {

    if (calendarDay.inMonth) {
      const dayInfo = this.monthInfo.dayInfos.find(info => {
        const dayInfoMoment = moment(info.date, 'YYYY-MM-DD');
        return dayInfoMoment.date() === calendarDay.day && dayInfoMoment.year() === this.monthMoment.year();
      });

      if (dayInfo) {
        return dayInfo.tag.bgColor;
      }
    }

    return 'none';
  }

  getTagTextColor(calendarDay: CalendarDay) {

    if (calendarDay.inMonth) {
      const dayInfo = this.monthInfo.dayInfos.find(info => {
        const dayInfoMoment = moment(info.date, 'YYYY-MM-DD');
        return dayInfoMoment.date() === calendarDay.day && dayInfoMoment.year() === this.monthMoment.year();
      });

      if (dayInfo) {
        return dayInfo.tag.textColor;
      }
    }

    return 'none';
  }

  protected padDaysInCalendar(monthDays: CalendarDay[]): CalendarDay[] {
    this.padPreviousMonthDaysInCalendar(monthDays);
    this.padNextMonthDaysInCalendar(monthDays);

    return monthDays;
  }

  protected padPreviousMonthDaysInCalendar(monthDays: CalendarDay[]) {
    const startDate = moment(`${this.monthMoment.year()}-${this.monthMoment.month() + 1}-01`, 'YYYY-MM-DD');
    const previousMonthDaysDiff = startDate.day() - (this.startSunday ? 0 : 1);

    if (previousMonthDaysDiff > 0) {
      const previousMonthDays: CalendarDay[] = [];
      const initialDayOfWeekForPreviousMonth = startDate.clone().subtract(previousMonthDaysDiff, 'days').date();

      for (let i = 0; i < previousMonthDaysDiff; i++) {
        previousMonthDays.push({day: initialDayOfWeekForPreviousMonth + i, inMonth: false});
      }

      monthDays.unshift(...previousMonthDays);
    }
  }

  protected padNextMonthDaysInCalendar(monthDays: CalendarDay[]) {
    const nextMonthDaysDiff = MAX_NUMBER_OF_DAYS_IN_CALENDAR - monthDays.length;

    for (let i = 1; i <= nextMonthDaysDiff; i++) {
      monthDays.push({day: i, inMonth: false})
    }
  }

}
