import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientListingComponent } from './client-listing/client-listing.component';
import {FormsModule} from "@angular/forms";
import {MaterialModule} from "../shared/material.module";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [ClientListingComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    HttpClientModule

  ],
  exports:[ClientListingComponent]
})
export class ClientsModule { }
