import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from "./dashboard.component";
import {MainContentComponent} from "./component/main-content/main-content.component";
import {InvoiceListingComponent} from "../invoices/invoice-listing/invoice-listing.component";
import {ClientListingComponent} from "../clients/client-listing/client-listing.component";
import {InvoiceFormComponent} from "../invoices/invoice-form/invoice-form.component";
import {InvoiceComponent} from "./component/invoice/invoice.component";

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
  children: [
    {
      path: 'invoices',
      component: InvoiceListingComponent
    },
    {
      path: 'invoices/new',
      component: InvoiceFormComponent
    },
    {
      path: 'invoices/:id',
      component: InvoiceFormComponent
    },
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
