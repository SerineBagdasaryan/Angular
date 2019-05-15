import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {NewsService} from "./news.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
constructor(private services: NewsService){}
  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {

    const getToken = localStorage.getItem("token");
    if (getToken) {
      console.log(getToken);
      const cloned = req.clone({
        headers: req.headers.set("Authorization", getToken)
      });

      return next.handle(cloned);
    }
    else {
      return next.handle(req);
    }
  }
}
