import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {List} from "../list";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edite-event',
  templateUrl: './edite-event.component.html',
  styleUrls: ['./edite-event.component.css']
})
export class EditeEventComponent implements OnInit {
  edit:FormGroup;
  statuses = [{'name':'ordinary'}, {'name': 'special'}];
  private id: number;
  private list: List;

  constructor(private route: ActivatedRoute,private as:AuthService,private router: Router, private fb: FormBuilder) {
 this.editeForm();
  }

  editeForm(){
    this.edit = this.fb.group({
      title: [''],
      placeName: [''],
      address: [''],
      date: [''],
      description: [''],
      status: [''],

    })
  }

  ngOnInit() {
    this.id= parseInt(this.route.snapshot.params['id']);
    let lists=this.as.getList();
    this.list=lists.find(p => p.id==this.id);
    console.log(this.list,"one list");

  }
  updateEvent(title,placeName,address,date,description,status): void {
    const obj ={
      id: this.id,
      title: title,
      placeName: placeName,
      address: address,
      date: date,
      description:description,
      status: status,

    }
    console.log(obj,'newVal');
    this.as.updateEvent(this.list,obj);
    this.router.navigate(['/profile'])

  }
}
