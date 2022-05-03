import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouteValues } from '../constants';
import { NewsService } from '../news.service';
import { User, UserCredentialsDto } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../app.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  routerRegisterLink: string = '/' + RouteValues.REGISTER;

  constructor(private router: Router,
    private newsService: NewsService) { }

  ngOnInit(): void {
    this.initLoginFormGroup();
  }

  initLoginFormGroup(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    })
  }

  onLogin(): void {
    let user: UserCredentialsDto = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value
    }

    this.newsService.login(user).subscribe(
      (res: any) => {
        // console.log(res.id);

        localStorage['userId'] = res.id;
        this.router.navigate([RouteValues.NEWS]);
      },
      (err) => {
        console.log(err.message);

      }
    );
  }

}
