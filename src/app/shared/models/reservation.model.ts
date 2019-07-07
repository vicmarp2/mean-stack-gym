export class Reservation {
  constructor(
    public id: string,
    public event: string,
    public user: number,
    public exactDate: Date,
  ) {}
}
