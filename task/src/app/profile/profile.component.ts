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
  format;
  selectedEvent: List;
  statuses = [{'name':'ordinary'}, {'name': 'special'}];
  private findByDate: any;
  private findByDateId: any;
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
      this.data = this.authService.getList();
  }

  removeList(id:number){
    this.authService.removeList(id);
    this.data = this.authService.getList();

  }


  ngOnInit() {
    let dateObj = new Date();
    let month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
    let date = ('0' + dateObj.getDate()).slice(-2);
    let year = dateObj.getFullYear();
     this.format = year + '-' + month + '-' + date;
    console.log(this.format,'change date format');
    this.email = localStorage.getItem('token');
     this.data = this.authService.getList();

    // this.findByDate=this.data.find(p => p.date < this.format);
    // console.log(this.findByDate.id,"one id");
    // this.findByDateId=this.data.find(p => p.id== this.findByDate.id);
    // if(this.findByDateId){
    //   this.color = 'red';
    // }

    //  for(let i = 0; i<this.data.length; i++){
    //    if(this.data[i].date === format){
    //      this.color = 'orange';
    //      // @ts-ignore
    //      // document.getElementsByClassName('item').backgroundColor = 'orange'
    //    }
    //    if(this.data[i].date < format){
    //      this.color = 'red';
    //    }
    //    // else{
    //    //   this.color = '';
    //    // }
    //
    //
    // }
  }


  logout(): void{
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
