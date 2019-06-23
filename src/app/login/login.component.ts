import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NewsService} from "../news.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as decode from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  angForm: FormGroup;
  public id: number;

  constructor(private http: HttpClient, private fb: FormBuilder, private bs: NewsService, private router: Router, private route: ActivatedRoute) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],

    });
  }

  public res: any;
  d: any;
  login(email, password) {
    this.bs.login(email, password).subscribe((data: any) => {
          console.log( data.user, 'hy');
          this.res = data.msg;
          if (data.user.role === 'admin') {
            this.router.navigate(['admin/' + data.user._id]);
            localStorage.setItem('token', data.token);

            // @ts-ignore

          } else if (data.user.role === 'user') {
            this.router.navigate(['profileUser/'+ data.user._id]);
            localStorage.setItem('token', data.token);
          } else {
            this.router.navigate(['news']);
          }
        // decode token
      // console.log(data, 'hy');
      // this.res = data.msg;
      // const tokenPayload = decode(data.token);
      // console.log(tokenPayload,'data token');
      // const roless = tokenPayload['role'];
      // const id = tokenPayload['sub'];
      // console.log(id, 'id token');
      // if (roless === 'admin') {
      //   this.router.navigate(['admin/' + id]);
      //   localStorage.setItem('token', data.token);
      // } else if (roless === 'user') {
      //   this.router.navigate(['profileUser/' + id]);
      //   localStorage.setItem('token', data.token);
      // } else {
      //   this.router.navigate(['news']);
      // }
    });
  }


  ngOnInit() {

    const token = localStorage.getItem('token');
    if(token){
      const tokenPayload = decode(token);
      const tokenRole = tokenPayload['role'];
      const id = tokenPayload['sub'];
      if (tokenRole === 'admin') {
          this.router.navigateByUrl('/admin/'+  id);
      } else if (tokenRole === 'user') {
          this.router.navigateByUrl('/profileUser/' + id);
      }
    }

 else {
      this.router.navigateByUrl('/news');

      }
    }


}

