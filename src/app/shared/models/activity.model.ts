

export class Activity {

  constructor(
    public id: string,
    public name: string,
    public description: string,
    public imageUrl: string,
    public events: Array<{
      id: string,
      activityName: string
      startHour: number,
      endHour: number,
      dayOfWeek: number,
    }>
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.events = events;
  }
}
