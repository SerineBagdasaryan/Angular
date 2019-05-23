import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NewsService} from "../news.service";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  public data: Object;

  constructor(private route: ActivatedRoute,private services: NewsService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.services.viewNews(params['id']).subscribe(res => {
        this.data = res;
        console.log(params['id'],'url id');
      });
    });
  }

}
