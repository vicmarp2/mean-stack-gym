export class Gym {

  constructor(
    public codName: string,
    public name: string,
    public address: string,
    public contactNumber: string,
    public openingHours: {mondayToFriday: string, weekend: string},
    public coordinates: {latitude: number, longitude: number}) {
    this.codName = codName;
    this.name = name;
    this.address = address;
    this.contactNumber = contactNumber;
    this.openingHours = openingHours;
    this.coordinates = coordinates;
  }
}
