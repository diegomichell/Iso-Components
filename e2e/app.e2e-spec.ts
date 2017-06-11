import { NgIsoCalendarPage } from './app.po';

describe('ng-iso-calendar App', () => {
  let page: NgIsoCalendarPage;

  beforeEach(() => {
    page = new NgIsoCalendarPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
