// import {Component, OnInit, Pipe} from '@angular/core';
// import {ActivatedRoute, Router} from "@angular/router";
// import { FileSelectDirective,FileUploader} from "ng2-file-upload";
// import { Location } from '@angular/common';
// import {FormBuilder, FormGroup, Validators} from "@angular/forms";
// import {NewsService} from "../news.service";
// import News from "../News";
// import {HttpClient, HttpEventType, HttpHeaders} from "@angular/common/http";
// import * as decode from 'jwt-decode';
// import {Observable} from "rxjs";
// import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
// import * as io from 'socket.io-client';
//
// @Component({
//   selector: 'app-profile',
//   templateUrl: './profile.component.html',
//   styleUrls: ['./profile.component.css']
// })
//
// export class ProfileComponent implements OnInit {
//   // socket;
//   // chats;
//   angForm: FormGroup;
//   passForm: FormGroup;
//   public news: any = [];
//   id: number;
//   public res: any = [];
//   public img: any = [];
//   public show =true;
//   private SelectedFile: File;
//   public ekac: any =[];
//
//   constructor(private _sanitizer: DomSanitizer,private http: HttpClient,private router: Router, private route: ActivatedRoute, private location: Location, private fb: FormBuilder,  private bs: NewsService) {
//     this.createForm();
//     this.createFormPass();
//   }
//
//
//
//   deleteNews(id) {
//     this.bs.deleteNews(id).subscribe(res => {
//       console.log('Deleted');
//       this.bs.getNews().subscribe(data => {
//         this.news = data;
//       });
//
//     });
//   }
//   createForm() {
//     this.angForm = this.fb.group({
//       title: ['', Validators.required],
//       textarea: ['', Validators.required],
//
//     });
//   }
//   createFormPass() {
//     this.passForm = this.fb.group({
//       password: ['', Validators.required],
//     });
//   }
//
//   addNews(title, textarea) {
//     this.bs.addNews(title, textarea);
//     this.bs.getNews().subscribe(data => {
//       this.news = data;
//     });
//   }
//   changePassword(password) {
//     this.bs.changePassword(password)
//   }
//
//
//   OnFileSelected(event){
//     this.SelectedFile = event.target.files[0] as File;
//   }
//
//   OnUpload(){
//     const formData: FormData = new FormData();
//     formData.append('file', this.SelectedFile, this.SelectedFile.name);
//     this.http.post('http://localhost:4000/news/upload',formData).subscribe((data: any) => {
//       this.ekac = data;
//       console.log(this.ekac,'idea');
//     });
//   }
// /////https://dzone.com/articles/angular-7-uploads-backed-by-nodejs
//   ngOnInit() {
//     this.bs.getImage().subscribe(data => {
//       this.img= data;
//       console.log(this.img,'hi');
//     })
//   }
//
//   logout(){
//     localStorage.removeItem('token');
//     this.router.navigate(['/news']);
//   }
// }
//







import {Component, OnInit, Pipe} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { FileSelectDirective,FileUploader} from "ng2-file-upload";
import { Location } from '@angular/common';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NewsService} from "../news.service";
import News from "../News";
import {HttpClient, HttpEventType, HttpHeaders} from "@angular/common/http";
import * as decode from 'jwt-decode';
import {Observable} from "rxjs";
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  // socket;
  // chats;
  angForm: FormGroup;
  passForm: FormGroup;
 public news: any = [];
  id: number;
  public res: any = [];
  public img: any = [];
  public show =true;
  private SelectedFile: File;

  constructor(private _sanitizer: DomSanitizer,private http: HttpClient,private router: Router, private route: ActivatedRoute, private location: Location, private fb: FormBuilder,  private bs: NewsService) {
    this.createForm();
    this.createFormPass();
  }



    deleteNews(id) {
    this.bs.deleteNews(id).subscribe(res => {
      console.log('Deleted');
      this.bs.getNews().subscribe(data => {
        this.news = data;
      });

    });
  }
  createForm() {
    this.angForm = this.fb.group({
      title: ['', Validators.required],
      textarea: ['', Validators.required],

    });
  }
  createFormPass() {
    this.passForm = this.fb.group({
      password: ['', Validators.required],
    });
  }

  addNews(title, textarea) {
    this.bs.addNews(title, textarea);
    this.bs.getNews().subscribe(data => {
      this.news = data;
    });
  }
  changePassword(password) {
    this.bs.changePassword(password)
  }


  OnFileSelected(event){
    this.SelectedFile = event.target.files[0] as File;
  }

  OnUpload(){
    const formData: FormData = new FormData();
    formData.append('file', this.SelectedFile, this.SelectedFile.name);
    this.http.post('http://localhost:4000/news/upload',formData).subscribe((data: any) => {
      });
  }
// @ts-ignore
  uri = this.bs.uri
  ngOnInit() {
    this.bs.getNews().subscribe(data => {
      this.news = data;
      });
    this.bs.getImage().subscribe(data => {
      this.img= data;
      console.log(this.img);
  })
    console.log(this.res.fname,'str');
    this.bs.getUserName().subscribe((data) => {
      this.res = data;
      console.log(data);
    })



  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/news']);
  }
}
