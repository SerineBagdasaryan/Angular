import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {List} from "../list";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
email: string;
 data: any = [];
  angForm: FormGroup;
  searchText;
  color;
  selectedEvent: List;
  statuses = [{'name':'ordinary'}, {'name': 'special'}];
  constructor(private router: Router, public authService: AuthService,private fb: FormBuilder) {
  this.createEvent();
  }
  createEvent() {
    this.angForm = this.fb.group({
      title: ['', Validators.required],
      placeName: ['', Validators.required],
      address: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],

    });
  }

  doEvent(item: any){
    this.selectedEvent = item;
    }



    addList(title, placeName, address, date, description, status){
    // @ts-ignore
    this.authService.addList(title,placeName, address,date,description,status);
  }

  removeList(id:number){
    this.authService.removeList(id);

  }


  ngOnInit() {
    this.email = localStorage.getItem('token');
     this.data = this.authService.getList();
     for(let i = 0; i<this.data.length; i++){
       if(this.data[i].date === Date()){
       this.color= 'orange'
       }
       // if(this.data[i].date < Date()){
       //   this.color = 'red';
       // }
       console.log(Date(),'now')

    }
  }
  text;


  logout(): void{
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
