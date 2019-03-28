export class Event {
  constructor(
    public id: string,
    public activityName: string,
    public startHour: number,
    public endHour: number,
    public dayOfWeek: number,
  ) {}
}
