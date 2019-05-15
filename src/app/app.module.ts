import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GstAddComponent } from './gst-add/gst-add.component';
import {SlimLoadingBarModule} from "ng2-slim-loading-bar";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule,HTTP_INTERCEPTORS , HttpEvent} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { EditNewsComponent } from './edit-news/edit-news.component';
import { NewsService} from "./news.service";
import {AuthGuard} from "./auth.guard";
import { AdminComponent } from './admin/admin.component';
import { EditUserComponent } from './edit-user/edit-user.component';
// import{ FileUploadModule} from "ng2-file-upload";
import { FileUploadModule } from "ng2-file-upload/file-upload/file-upload.module";
import { JwtModule } from '@auth0/angular-jwt';
import { SafeHtmlPipe } from './safe-html.pipe';
import {AuthInterceptor} from "./auth.interceptor";
import { KeysPipe } from './keys.pipe';


@NgModule({
  declarations: [
    AppComponent,
    GstAddComponent,
    LoginComponent,
    ProfileComponent,
    EditNewsComponent,
    AdminComponent,
    EditUserComponent,
    SafeHtmlPipe,
    KeysPipe,
  ],
  imports: [
    BrowserModule,
    SlimLoadingBarModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    FileUploadModule,
JwtModule.forRoot({
  config: {
    tokenGetter: function  tokenGetter() {
      return     localStorage.getItem('token');},
    whitelistedDomains: ['localhost:4000'],
    blacklistedRoutes: ['http://localhost:4000/news']
  }
})
],

  providers: [NewsService,AuthGuard,{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
