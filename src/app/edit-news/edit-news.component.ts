import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NewsService} from "../news.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.css']
})
export class EditNewsComponent implements OnInit {
  news: any = {};
  angForms: FormGroup;

  constructor(private route: ActivatedRoute, private services: NewsService, private router: Router, private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.angForms = this.fb.group({
      title: ['', Validators.required],
      textarea: ['', Validators.required]
    });
  }

  updateNews(title,textarea) {
    this.route.params.subscribe(params => {
      this.services.updateNews(title, textarea, params['id']);
    });
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.services.editNews(params['id']).subscribe(res => {
        this.news = res;
        console.log(params['id'],'url id');
      });
    });

  }
}

