import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MainContentComponent } from './component/main-content/main-content.component';
import { SideNavComponent } from './component/side-nav/side-nav.component';
import { ToolbarComponent } from './component/toolbar/toolbar.component';
import {MaterialModule} from "../shared/material.module";
import {InvoicesModule} from "../invoices/invoices.module";
import {ClientsModule} from "../clients/clients.module";
import {InvoiceComponent} from "./component/invoice/invoice.component";

@NgModule({
  declarations: [DashboardComponent, MainContentComponent, SideNavComponent, ToolbarComponent,InvoiceComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    InvoicesModule,
    ClientsModule,

  ]
})
export class DashboardModule { }
