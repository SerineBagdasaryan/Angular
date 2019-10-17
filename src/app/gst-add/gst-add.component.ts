import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-gst-add',
  templateUrl: './gst-add.component.html',
  styleUrls: ['./gst-add.component.css']
})
export class GstAddComponent implements OnInit {

  angForm: FormGroup;
  public errorMessage;
  public errors;
  public er;
  private message: any;
  constructor(private fb: FormBuilder, private bs: NewsService) {
    this.createForm();
  }
  roles = [];
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
  addUsers(fname, lname, email,password,cpassword,role) {
    this.bs.addUsers(fname, lname, email,password,cpassword,role).subscribe((data: any) => {
      console.log( data.msg,'hy');
      this.errorMessage = data.msg;
      this.errors = data.messg;
      this.er=data.msges;
      this.message = data.messag;
    });
  }


  ngOnInit() {
     this.bs.getRoles().subscribe((data: any) =>{
       this.roles = data;
     })
  }

}
