import { Component, OnInit } from '@angular/core';
import {InvoiceService} from "../services/invoice.service";
import {Invoice} from "../models/invoice";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material";
import {remove} from 'lodash';
@Component({
  selector: 'app-invoice-listing',
  templateUrl: './invoice-listing.component.html',
  styleUrls: ['./invoice-listing.component.scss']
})
export class InvoiceListingComponent implements OnInit {

  constructor(private service: InvoiceService,private router: Router,private snackBar: MatSnackBar,) { }

  displayedColumns: string[] = ['item', 'date', 'due', 'qty','rate','tax','action'];
  dataSource: Invoice[]= [];
save() {
this.router.navigate(['dashboard', 'invoices', 'new'])
}

  invoiceDescrition(id) {
this.router.navigate(['invoice',['id']])
    console.log(id,'invoice');
}
  editeBtn(id) {
  this.router.navigate(['dashboard', 'invoices', id])

  }
deleteBtn(id) {
  console.log(id);
  this.service.deleteInvoice(id).subscribe(data =>{
    const removedItem = remove(this.dataSource,(item) =>{
      return item._id === data._id
    });
    this.dataSource = [...this.dataSource]
    this.snackBar.open('Invoice deleted','Success',{
      duration: 2000
    })
    console.log(data);
  },err => this.errHandler(err,'Failed to delete invoice'));
}

  private errHandler(error,message) {
    console.error(error);
    this.snackBar.open(message,'Error',{
      duration: 2000
    })
  }
  ngOnInit() {
    this.service.getInvoice().subscribe(data => {
      this.dataSource = data;
      console.log(data);

    },err => this.errHandler(err,'Failed to delete invoice'))
  }

}
