import { Component, OnInit } from '@angular/core';
import {UserService} from "../../shared/user.service";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
model ={
  email: '',
  password:''
}
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  private serverErrorMessages;
  constructor(private service: UserService,private router: Router) { }

  ngOnInit() {
    if(this.service.isLoggedIn())
    this.router.navigateByUrl('/userProfile');
  }
onSubmit(form: NgForm){
    this.service.login(form.value).subscribe(
      res=>{
this.service.setToken(res['token']);
this.router.navigateByUrl('/userProfile');
      },
      err=>{
this.serverErrorMessages = err.error.message;
      }
    )
  }
}
