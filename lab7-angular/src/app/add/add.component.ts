import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RouteValues } from '../constants';
import { News } from '../news';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['../app.component.css']
})
export class AddComponent implements OnInit {

  singleNews: News = { title: '', content: '', producer: '', category: '', date: '', user_id: 0 };

  constructor(private router: Router,
    private newsService: NewsService) { }

  ngOnInit(): void {
  }

  addNews(f: NgForm) {
    console.log(this.singleNews);

    this.newsService.store(this.singleNews).subscribe(
      (res: News) => {
        console.log(res);

        f.reset();
        this.router.navigate([RouteValues.NEWS]);
      },
      (err) => {
        console.log(err.message);

      }
    );
  }

}
