import { Component, OnInit } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { User} from "../../models/user";
import { AuthService} from "../../services/auth.service";
import { Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private http: HttpClient, private service: AuthService, private router: Router) { }

  ngOnInit() {
  }
  onRegister(form): void {
    this.service.register(form.value).subscribe( res=>{
      this.router.navigateByUrl('/auth');
    })
  }
}
