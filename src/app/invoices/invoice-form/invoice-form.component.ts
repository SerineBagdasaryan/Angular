import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {InvoiceService} from "../services/invoice.service";
import {MatSnackBar} from '@angular/material';
import {ActivatedRoute, Router} from "@angular/router";
import {Invoice} from "../models/invoice";
@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {
invoiceForm: FormGroup;
  private invoice: Invoice;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private services: InvoiceService,private snackBar: MatSnackBar,private router:Router) { }
  onSubmit(){
    if(this.invoice){
this.services.updateInvoice(this.invoice._id, this.invoiceForm.value).subscribe(data =>{
  this.snackBar.open('Invoice updated', 'Success',{
    duration: 2000
  });
  this.router.navigate(['dashboard','invoices'])

},err => this.errHandler(err,'Failed to update invoice'));
    }else{
    this.services.createInvoice(this.invoiceForm.value).subscribe(data =>{
      console.log(data);
      this.snackBar.open('Invoice created', 'Success', {
        duration: 2000,
      });
      this.router.navigate(['dashboard', 'invoices']);
    }, err=> this.errHandler(err,'Failed to create Invoice'))};
    // console.log(this.invoiceForm.value);
  }


  private errHandler(error,message) {
    console.error(error);
    this.snackBar.open(message,'Error',{
      duration: 2000
    })
  }
  createForm() {
    this.invoiceForm = this.fb.group({
      item: ['', Validators.required ],
      date: ['', Validators.required ],
      due: ['', Validators.required ],
      qty: ['', Validators.required ],
      rate: '',
      tax: '',
    })
  }
  private getInvoice(){
    this.route.params.subscribe(params =>{
      let id = params['id'];
      console.log(id);
      if(!id){
        return;
      }
      this.services.getInvoices(id).subscribe(invoice => {
        this.invoice = invoice;
        this.invoiceForm.patchValue(this.invoice);
      }, err => this.errHandler(err, 'Failed to get invoice'));
    })
  }
  ngOnInit() {
 this.createForm();
 this.getInvoice();
  }

}
