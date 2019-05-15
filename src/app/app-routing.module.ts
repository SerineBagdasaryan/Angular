
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GstAddComponent } from './gst-add/gst-add.component';
import {LoginComponent} from "./login/login.component";
import {ProfileComponent} from "./profile/profile.component";
import {EditNewsComponent} from "./edit-news/edit-news.component";
import {AdminComponent} from "./admin/admin.component";
import {EditUserComponent} from "./edit-user/edit-user.component";
import {AuthGuard} from "./auth.guard";
const routes: Routes = [
  { path: '',
    redirectTo: 'news',
    pathMatch: 'full'
  },

  {
    path: 'news/create',
    component: GstAddComponent
  },
  {
    path: 'news',
    component: LoginComponent
  } ,
  {
    path: 'profileUser/:id',
    component: ProfileComponent,canActivate: [AuthGuard]
  },
  {
    path: 'admin/:id',
    component: AdminComponent,canActivate: [AuthGuard]
  },{
  path:'edit/:id',
    component: EditNewsComponent
  },

  {
  path:'editUser/:id',
    component: EditUserComponent
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
