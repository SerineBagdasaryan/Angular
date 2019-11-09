import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  uri = 'http://127.0.0.1:8080/order';
  constructor(private http: HttpClient) { }

  // @ts-ignore
  sendOrder( name,lastname,seat): Observable<any> {
    const obj = {
      name: name,
      lastname:lastname,
      seat:seat,
    };
    console.log(obj);
    return this.http.post(`${this.uri}/createOrder`, obj);
  }
}
