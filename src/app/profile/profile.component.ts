import {Component, OnInit, Pipe} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { FileSelectDirective,FileUploader} from "ng2-file-upload";
import { Location } from '@angular/common';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NewsService} from "../news.service";
import News from "../News";
import {HttpClient,HttpEventType } from "@angular/common/http";
import * as decode from 'jwt-decode';
import {Observable} from "rxjs";
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import Users from "../Users";
const page = 'http://localhost:4000/upload';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  angForm: FormGroup;
  passForm: FormGroup;
 public news: any = [];
  id: number;
  public fileToUpload: File;
  public res: any = [];
  public imag: any = [];
  public img: any = [];
  public show =true;

  constructor(private _sanitizer: DomSanitizer,private http: HttpClient,private router: Router, private route: ActivatedRoute, private location: Location, private fb: FormBuilder,  private bs: NewsService) {
    this.createForm();
    this.createFormPass();
  }



    deleteNews(id) {
    this.bs.deleteNews(id).subscribe(res => {
      console.log('Deleted');
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
    this.bs.addNews(title, textarea)
  }
  changePassword(password) {
    this.bs.changePassword(password)
  }


  postMethod(files: FileList) {
    this.fileToUpload = files.item(0);
    let formData = new FormData();
    formData.append('file', this.fileToUpload, this.fileToUpload.name,);
    this.http.post('http://localhost:4000/news/upload', formData, ).subscribe((data: any) => {
     // this.imag = data.image;

      // console.log(this.imag,'data image');
    });
  }



  ngOnInit() {
    this.bs.getNews().subscribe(data => {
      this.news = data;
      });
    this.bs.getImage().subscribe(data => {
      this.img= data;
      console.log(this.img);
  })
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
