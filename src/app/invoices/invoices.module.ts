import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceListingComponent } from './invoice-listing/invoice-listing.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../shared/material.module";
import {HttpClientModule} from "@angular/common/http";
import {InvoiceService} from "./services/invoice.service";
import { InvoiceFormComponent } from './invoice-form/invoice-form.component';

@NgModule({
  declarations: [InvoiceListingComponent, InvoiceFormComponent,],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,

  ],
  exports :[InvoiceListingComponent,InvoiceFormComponent],
  providers:[
    InvoiceService
  ]
})
export class InvoicesModule { }
