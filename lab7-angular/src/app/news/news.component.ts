import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RouteValues } from '../constants';
import { News } from '../news';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['../app.component.css']
})
export class NewsComponent implements OnInit {

  newsArray: News[] = [];
  singleNews: News = { title: '', content: '', producer: '', category: '', date: '', user_id: 0 };
  datesArray: Array<string> = [];
  categoriesArray: Array<string> = [];

  error = '';
  lastFilter: string = '';

  selectedOptionCategory: string = 'Sport';
  selectedOptionDate: string = '2022-04-04';

  isLoggedIn: boolean = false;
  loggedInUserId: number = 0;

  routerLoginLink: string = '/' + RouteValues.LOGIN;
  routerAddLink: string = '/' + RouteValues.ADD;
  routerUpdateLink: string = '/' + RouteValues.UPDATE;


  constructor(private newsService: NewsService) { }

  checkBelongsToUser(newsUserId: number): boolean {
    if (this.loggedInUserId != 0 && this.loggedInUserId == newsUserId) {
      return true;
    } else {
      return false;
    }
  }

  logOutUser(): void {
    this.isLoggedIn = false;
    this.loggedInUserId = 0;
    localStorage['userId'] = null;
    this.newsService.logout();
  }

  putNewsTitleInStorage(newsTitle: string): void {
    localStorage['newsTitle'] = newsTitle;
  }

  ngOnInit(): void {
    this.getNews();
    this.getDates();
    this.getCategories();
  }

  getNews(): void {
    this.newsService.getAll().subscribe(
      (data: News[]) => {
        this.newsArray = data;
        this.loggedInUserId = localStorage['userId'];
        // console.log(localStorage['userId']);

        if (localStorage['userId']) {
          this.isLoggedIn = true;
        }

      },
      (err) => {
        this.error = err.message;
      }
    );
  }

  getDates(): void {
    this.newsService.getDates().subscribe(
      (data: Array<string>) => {
        this.datesArray = data;
      },
      (err) => {
        this.error = err.message;
      }
    );
  }

  filterByCategory() {
    // console.log(this.selectedOptionCategory);


    this.newsService.filterByCategory(this.selectedOptionCategory).subscribe(
      (data: News[]) => {
        this.newsArray = data;
        this.lastFilter = 'Category filter';
      },
      (err) => {
        this.error = err.message;
      }
    );
  }

  filterByDate() {
    // console.log(this.selectedOptionDate);

    this.newsService.filterByDate(this.selectedOptionDate).subscribe(
      (data: News[]) => {
        this.newsArray = data;
        this.lastFilter = 'Date filter';
      },
      (err) => {
        this.error = err.message;
      }
    );
  }

  getCategories(): void {
    this.newsService.getCategories().subscribe(
      (data: Array<string>) => {
        this.categoriesArray = data;
      },
      (err) => {
        this.error = err.message;
      }
    );
  }
}
