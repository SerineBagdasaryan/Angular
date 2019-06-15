export class List {
  id:number;
  title: string;
  placeName: string;
  address: string;
  date: Date;
  description: string;
  status: boolean;

  constructor(id: number, title: string,placeName: string, address: string, date: Date, description: string ,status: boolean) {
    this.id = id;
    this.title = title;
    this.placeName = placeName;
    this. address =  address;
    this.date = new Date();
    this.description = description;
    this.status = false;

  }
}
