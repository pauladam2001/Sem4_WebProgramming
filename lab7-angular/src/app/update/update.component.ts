import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RouteValues } from '../constants';
import { News } from '../news';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['../app.component.css']
})
export class UpdateComponent implements OnInit {

  singleNews: News = { title: '', content: '', producer: '', category: '', date: '', user_id: 0 };

  newsToUpdateTitle = localStorage['newsTitle'];

  constructor(private router: Router,
    private newsService: NewsService) { }

  ngOnInit(): void {
  }

  updateNews(f: NgForm) {
    console.log(this.singleNews);
    console.log(this.newsToUpdateTitle);

    this.newsService.update(this.singleNews, this.newsToUpdateTitle).subscribe(
      (res) => {
        // console.log(res);

        f.reset();
        this.router.navigate([RouteValues.NEWS]);
      },
      (err) => {
        console.log(err.message);

      }
    );
  }

}
