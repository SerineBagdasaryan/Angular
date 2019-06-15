import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../auth.service";
import {List} from "../list";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-edite-event',
  templateUrl: './edite-event.component.html',
  styleUrls: ['./edite-event.component.css']
})
export class EditeEventComponent implements OnInit {
  data: any = [];
  public title: string;
  public date: string;
  public address: string;
  public description: string;
  public placeName: string;
  public status: boolean = false;
  private id: number;
  private list: List;


  constructor(private route: ActivatedRoute,private as:AuthService) {
    this.title = '';
    this.placeName = '';
    this.address = '';
    this.date
    this.description = '';
  }



  ngOnInit() {
    this.id= this.route.snapshot.params['id'];
    let lists=this.as.getList();
    this.list=lists.find(p => p.id==this.id);
    console.log(this.list,"one list");

  }
  updateEvent(): void {
    const obj ={
      id: this.id,
      title: this.title,
      placeName: this.placeName,
      address: this.address,
      date: this.date,
      description: this.description,

    }
    console.log(obj,'newVal');
    this.as.updateEvent(this.list,obj);

  }
}
