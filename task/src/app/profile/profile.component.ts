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
 public title: string;
  public date: Date;
 public address: string;
 public description: string;
 public placeName: string;
 public status: boolean = false;
  searchText;
  color;
  selectedEvent: List;
  // angForm: FormGroup;
  constructor(private router: Router, public authService: AuthService,private fb: FormBuilder) {
    this.title = '';
    this.placeName = '';
    this.address = '';
    this.description = '';

  }

  doEvent(item: any){
    this.selectedEvent = item;
    this.status = true;
    }





  private addList(): void {
    // @ts-ignore
    this.authService.addList(this.title,this.placeName, this.address,this.date,this.description,this.status);
    this.title = '';
    this.placeName = '';
    this.address = '';
    this.description = '';
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
       if(this.data[i].date < Date()){
         this.color = 'red';
       }
       console.log(Date(),'now')

    }
  }



  logout(): void{
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
