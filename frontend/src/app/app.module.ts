import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { NewListComponent } from './pages/new-list/new-list.component';
import { EditListComponent } from './pages/edit-list/edit-list.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {WebReqInterceptor} from "./web-req.interceptor";
@NgModule({
  declarations: [
    AppComponent,
    TaskViewComponent,
    NewListComponent,
    EditListComponent,
    EditTaskComponent,
    LoginPageComponent,
    NewTaskComponent,
    SignupPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
  { provide: HTTP_INTERCEPTORS, useClass: WebReqInterceptor, multi: true }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
