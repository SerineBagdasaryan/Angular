export class List {
  id:number;
  title: string;
  placeName: string;
  address: string;
  date: string;
  description: string;
  status: string;

  constructor(id: number, title: string,placeName: string, address: string, date: Date, description: string ,status: string) {
    this.id = id;
    this.title = title;
    this.placeName = placeName;
    this. address =  address;
    this.date = Date();
    this.description = description;
    this.status = status;

  }
}
