import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MovieService} from "./movie.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  orderForm: FormGroup;
  private mesage: any;
  private nameError: any;
  private lastNameError: any;
  private seatError: any;
  private m: any;
  private count: any;

  constructor(private fb: FormBuilder,private movie:MovieService) {
    this.createForm();
  }
  public orde= 'test';
  createForm() {
    this.orderForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      seat: ['', Validators.required],

    });
  }

  sendOrder(name, lastname, seat) {

    this.movie.sendOrder(name, lastname, parseInt(seat)).subscribe((data: any) => {

      this.mesage = data.msg;
      this.nameError = data.nameError;
      this.lastNameError = data.lastNameError;
      this.seatError = data.seatError;
      this.m = data.m;
      this.count= data.count;
      console.log('res',this.mesage);
    });
  }

  ngOnInit() {

  }
}

