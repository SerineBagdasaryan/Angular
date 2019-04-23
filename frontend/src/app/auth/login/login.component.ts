import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {UsePropertyDecorator} from "codelyzer/propertyDecoratorBase";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private service: AuthService,private router:Router) { }
  onLogin(form): void{
    this.service.login(form.value).subscribe(res=>{
      this.router.navigateByUrl('/auth');
    })
  }
  ngOnInit() {
  }

}
