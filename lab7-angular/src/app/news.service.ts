import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { News } from './news';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterUser, User, UserCredentialsDto } from './user';


@Injectable({
  providedIn: 'root'
})
export class NewsService {

  baseUrl = 'http://localhost/lab7-angular/backend/api/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",
      // 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    }), responseType: 'text' as 'json'
  };

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.baseUrl}list.php`, { responseType: "json" }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  getDates() {
    return this.http.get(`${this.baseUrl}dates.php`, { responseType: "json" }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  getCategories() {
    return this.http.get(`${this.baseUrl}categories.php`, { responseType: "json" }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  store(news: News) {
    return this.http.post(`${this.baseUrl}store.php`, { data: news, isLoggedIn: localStorage['userId'] }, this.httpOptions).pipe(
      map((res: any) => {
        // console.log(res);

        return res['data'];
      })
    );
  }

  update(news: News, oldTitle: string) {
    return this.http.post(`${this.baseUrl}update.php`, { data: news, oldTitle: oldTitle, isLoggedIn: localStorage['userId'] }, this.httpOptions).pipe(  // doesn't work with put
      map((res: any) => {
        // console.log(res);

        return 'dummy';
      })
    );
  }

  filterByCategory(selectedOptionCategory: string) {
    return this.http.get(`${this.baseUrl}listCategories.php?category=${selectedOptionCategory}`, { responseType: "json" }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  filterByDate(selectedOptionDate: string) {
    return this.http.get(`${this.baseUrl}listDates.php?date=${selectedOptionDate}`, { responseType: "json" }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  login(user: UserCredentialsDto): Observable<User> {
    // console.log(user);

    return this.http.post(`${this.baseUrl}login.php`, { data: user }, { responseType: "json" }).pipe(
      map((res: any) => {
        // console.log(res);

        return res;
      })
    );
  }

  logout() {
    return this.http.post(`${this.baseUrl}logout.php`, { responseType: "json" })
  }

  register(user: RegisterUser): Observable<RegisterUser> {
    return this.http.post(`${this.baseUrl}register.php`, { data: user }, this.httpOptions).pipe(
      map((res: any) => {
        return res;
      })
    )
  }
}
