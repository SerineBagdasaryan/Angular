import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import { Login} from "../login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

model: Login = { email: "user@mail.ru", password: "user123"};
loginForm: FormGroup;
message: string;
returnUrl: string;
message1: string;


  constructor(private fb: FormBuilder,private router: Router, public authService: AuthService) { }

  ngOnInit() {
    // if(this.authService.isLoggedIn()) {
    //   // @ts-ignore
    //   localStorage.getItem('isLoggedIn','true');
    //   this.router.navigateByUrl('/profile');
    //
    //
    // }
this.loginForm = this.fb.group({
  email:['', Validators.required],
  password:['', Validators.required],
});
this.returnUrl = '/profile';
this.authService.logout();
  }

  get f(){
    return this.loginForm.controls;
  }
  login(){
    // @ts-ignore
    if(this.loginForm == ''){
      this.message = 'empty';
    }else{
      if(this.f.email.value== this.model.email && this.f.password.value == this.model.password){
        console.log('login successful');
        localStorage.setItem('isLoggedIn','true');
        localStorage.setItem('token',this.f.email.value);
        this.router.navigate([this.returnUrl]);

      }else{
        this.message = 'Please check your email and password';
      }
    }

  }

}
