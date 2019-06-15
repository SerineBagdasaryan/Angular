import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router : Router,private authService: AuthService){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
let url: string = state.url;
console.log(url,'hy');
return this.verifyLogin(url);
  }
  // @ts-ignore
  verifyLogin(url): boolean{
    if(!this.authService.isLoggedIn()){
      this.router.navigate(['/login']);
      return false;
    }else if(this.authService.isLoggedIn()){
      return  true;
    }
  }

  // @ts-ignore
  // public isLoggedIn():boolean{
  //   let status = false;
  //   if(localStorage.getItem('isLoggedIn') == "true"){
  //     status = true;
  //   }else{
  //     status = false;
  //   }
  //   return status;
  // }
  
}
