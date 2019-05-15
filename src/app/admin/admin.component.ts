import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NewsService} from "../news.service";
import Users from "../Users";
import * as decode from 'jwt-decode';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
  public users: Users[];
  public res = {};
  public show =true;
  passForm: FormGroup;
  private adminData;

  constructor(private router: Router, private route: ActivatedRoute, private location: Location, private fb: FormBuilder, private bs: NewsService) {
    this.createFormPass();

  }
  createFormPass() {
    this.passForm = this.fb.group({
      password: ['', Validators.required],
    });
  }

  changePassword(password) {
    this.bs.changePassword(password)
  }
  deleteUsers(id) {
    this.bs.deleteUsers(id).subscribe(res => {
      console.log('Deleted');
    });
  }
  logout() {
    this.bs.logout();
    this.router.navigateByUrl('/news');
  }
  create(){
    this.router.navigateByUrl('/news/create');
  }

  ngOnInit() {
    this.bs.getUsers().subscribe((data: Users[]) => {
        this.users= data;
      });
    this.bs.getUserName().subscribe((data: Users[]) => {
      this.adminData = data;
      console.log(data);
    })

  }

}
