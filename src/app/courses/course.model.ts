

export class Course {

  constructor(
    public id: string,
    public name: string,
    public description: string,
    public imageUrl: string,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
  }
}
