import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import 'rxjs/Rx';
import {User} from "./user";
import * as decode from "jwt-decode";
import {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private request(method: 'post'|'get', type: 'login'|'register'|'profile', user?): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.http.post(`/api/${type}`, user);
    } else {
      base = this.http.get(`/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }

    const request = base.pipe(
      map((data) => {
        // @ts-ignore
        if (data.token) {
          // @ts-ignore
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }


  private saveToken(token: string): void {
    localStorage.setItem('token', token);
    this.token = token;
  }
  uri = 'http://localhost:4000/news';
  private token: string;

  public isLoggedIn(){
    return localStorage.getItem('token') !== null;
  }
  public isLoggedInAdmin(){
    return localStorage.getItem('token') !== null;
  }
  constructor(private http: HttpClient,) { }
 public logout(): Observable<any> {
    localStorage.removeItem('token');
    return new Observable(observer => {
      if (!!localStorage.getItem('token')) {
        observer.error(new Error("Token not removed"));
      } else {
        observer.next();
      }
    });
  }


  addUsers(fname,lname, email,password,cpassword,role): Observable<any> {
    const obj = {
      fname: fname,
      lname: lname,
      email: email,
      password: password,
      cpassword: cpassword,
      role: role,
    };
    console.log(obj);
    return this.http.post(`${this.uri}/add`, obj);

  }


  editUsers(id) {
    return this
      .http
      .get(`${this.uri}/editUser/${id}`);
  }

  addNews(title,textarea,) {
    const obj1= {
      title:title,
      textarea: textarea,
    };
    console.log(obj1);
    this.http.post(`${this.uri}/profile`,obj1)
      .subscribe(res => console.log(res));
  }
  changePassword(password) {
    const obj1= {
      password:password,
    };
    console.log(obj1);
    this.http.post(`${this.uri}/changePass`,obj1)
      .subscribe(res => console.log(res));
  }


  login( email,password): Observable<any> {
    const obj = {
      email: email,
      password:password,
    };
    console.log(obj);
 return this.http.post(`${this.uri}/profileUser`, obj);
  }
  loginEmail( email): Observable<any> {
    const obj = {
      email: email,
    };
    console.log(obj);
 return this.http.post(`${this.uri}/findEmail`, obj);
  }
  loginPassword( password,findbyEmail): Observable<any> {
    const obj = {
      findbyEmail: findbyEmail,
      password: password,
    };
    console.log(obj);
 return this.http.post(`${this.uri}/findPass`, obj);
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }



  getNews(){
    return this.http.get(`${this.uri}/getNews`);
  }

  getImage() {
    return this.http.get(`${this.uri}/images`);
  }



  getUsers() {
    return this.http.get(`${this.uri}/admin`);
  }

  editNews(id) {
    return this.http.get(`${this.uri}/edit/${id}`);
  }


  //updated
  updateNews(title,textarea, id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    const objUpd = {
    title:title,
    textarea:textarea,
    };
    console.log(objUpd);
    this.http.post(`${this.uri}/update/${id}`, objUpd)
      .subscribe(res => console.log('Done'));
  }
  updateUsers(fname,lname,email,password,cpassword,role, id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    const objUpd = {
      fname:fname,
      lname:lname,
      email: email,
      password: password,
      cpassword: cpassword,
      role: role,
    };
    console.log(objUpd);
    this.http.post(`${this.uri}/updateUsers/${id}`, objUpd)
      .subscribe(res => console.log('Done'));
  }
  deleteUsers(id) {
    return this
      .http
      .get(`${this.uri}/delete/${id}`);
  }
  deleteNews(id) {
    return this
      .http
      .get(`${this.uri}/deleteNews/${id}`);
  }


  getUserName() {
    return this.http.get(`${this.uri}/profAdmin`);
  }

  viewNews(id) {
    return this.http.get(`${this.uri}/view/${id}`);
  }

}
