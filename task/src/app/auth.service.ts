import { Injectable } from '@angular/core';
import { List} from "./list";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private nextId:number;

  constructor() {
    let lists = this.getList();
    if(lists.length == 0){
      this.nextId = 0;
    }else{
      let maxId = lists[lists.length -1].id;
      this.nextId = maxId +1;
    }

  }
  public addList(title: string, placeName: string,address: string, date: Date, description: string,status: string): void{
    // @ts-ignore
    let list = new List(this.nextId,title,placeName,address,date,description,status)
  let lists = this.getList();
    lists.push(list);
    this.setLocaleStorageLists(lists);
    this.nextId++;
  }

  public getList():List[]{
    let localStorageItem = JSON.parse(localStorage.getItem('lists'));
    return localStorageItem == null ? []:localStorageItem.lists;
  }

  public removeList(id: number){
    let lists = this.getList();
    lists=lists.filter((list) => list.id !== id,);
    this.setLocaleStorageLists(lists);

  }


  private setLocaleStorageLists(lists: List[]): void {
    localStorage.setItem('lists', JSON.stringify({lists}));
  }
  logout(): void{
    localStorage.setItem("isLoggedIn","false");
    localStorage.removeItem('token');
  }
  public isLoggedIn():boolean{
      let status = false;
      if(localStorage.getItem('isLoggedIn') == "true"){
        status = true;
      }else{
        status = false;
      }
      return status;
    }



   // @ts-ignore
  updateEvent(oldEvent, newEvent): List[] {
    console.log('oldEvent:',oldEvent,'newEvent:',newEvent)
     let events = this.getList();
    for(let i = 0; i <events.length; i++) {
      if(events[i].id == oldEvent.id) {
        events[i] = newEvent;
      }

    }
     this.setLocaleStorageLists(events);

  }


}
