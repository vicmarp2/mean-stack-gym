export class Gym {
  public name: string;
  public address: string;
  public contactNumber: string;
  public openingHours: {mondayToFriday: string, weekend: string};
  public coordinates: {latitude: number, longitude: number};


  constructor(
    name: string,
    address: string,
    contactNumber: string,
    openingHours: {mondayToFriday: string, weekend: string},
    coordinates: {latitude: number, longitude: number}) {
    this.name = name;
    this.address = address;
    this.contactNumber = contactNumber;
    this.openingHours = openingHours;
    this.coordinates = coordinates;
  }
}
