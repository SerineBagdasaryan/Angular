import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {NewsService} from "../news.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  angForm: FormGroup;
  public message: string;
  public mess: string;
  private show1: boolean;
  constructor(private http: HttpClient, private fb: FormBuilder, private bs: NewsService, private router: Router, private route: ActivatedRoute) {
    this.createForm();
  }
  createForm(){
    this.angForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      text: ['']

    });
  }
  public show= true;
public findbyEmail;
public randomN;
  loginEmail(email){
  this.bs.loginEmail(email).subscribe((data: any) => {
    if(data.success !== false){
      this.show = true;
      this.findbyEmail = data.email;
      this.randomN = data.rand;
      console.log( this.randomN,'with randomNum');
      this.show1 = true;
    }else {
      this.message = data.msg;
    }
})
  }

  randNumber(text){
   if(this.randomN === text){
     this.show = false;
     this.show1 = false;
     console.log(true)
   }else{
     console.log(false);
     this.router.navigate(['news']);
   }
}
    loginPassword(password){
  this.bs.loginPassword(password,this.findbyEmail).subscribe((data: any) => {
    if(data.success === false){
      this.mess = data.obj.err;
      console.log(this.mess,'hjj');
    }else if(data.success === true){
        this.router.navigate(['news']);
    }


})
  }


  ngOnInit() {
  }

}
