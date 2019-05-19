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
  constructor(private http: HttpClient, private fb: FormBuilder, private bs: NewsService, private router: Router, private route: ActivatedRoute) {
    this.createForm();
  }
  createForm(){
    this.angForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],

    });
  }
  public show= true;
public findbyEmail;
  loginEmail(email){
  this.bs.loginEmail(email).subscribe((data: any) => {
    if(data.success !== false){
      this.show = false;
      this.findbyEmail = data;
    }else {
      this.message = data.msg;
    }


// console.log(this.findbyEmail,'vo');
})
  }
  loginPassword(password){
  this.bs.loginPassword(password,this.findbyEmail).subscribe((data: any) => {
    if(data.success === false){
      this.mess = data.obj.err;
      console.log(this.mess,'hjj');
    }else if(data.success === true){
        this.router.navigate(['news']);
    }







// console.log(this.findbyEmail,'vo');
})
  }


  ngOnInit() {
  }

}
