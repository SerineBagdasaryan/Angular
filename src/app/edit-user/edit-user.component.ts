import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NewsService} from "../news.service";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {


  users: any = {};
  angForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private bs: NewsService,
              private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      fname: ['', Validators.required ],
      lname: ['', Validators.required ],
      email: ['', Validators.required ],
      password: ['', Validators.required ],
      cpassword: ['', Validators.required ],
      role: ['', Validators.required ],
    });
  }
  roles = [{'name':'user'}, {'name': 'admin'}];
  updateUsers(fname, lname, email,password,cpassword,role) {
    this.route.params.subscribe(params => {
      this.bs.updateUsers(fname, lname, email, password, cpassword,role, params['id']);
      this.router.navigate(['admin']);
    });
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.bs.editUsers(params['id']).subscribe(res => {
        this.users = res;
      });
    });
  }
}

