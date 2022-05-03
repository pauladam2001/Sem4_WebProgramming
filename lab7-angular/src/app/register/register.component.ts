import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouteValues } from '../constants';
import { NewsService } from '../news.service';
import { RegisterUser, UserCredentialsDto } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../app.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup
  routerLoginLink: string = '/' + RouteValues.LOGIN;

  constructor(private router: Router,
    private newsService: NewsService) { }

  ngOnInit(): void {
    this.initRegisterFormGroup();
  }

  initRegisterFormGroup(): void {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      confirm_password: new FormControl('', [Validators.required, Validators.minLength(4)])
    })
  }

  onRegister(): void {
    let user: RegisterUser = {
      username: this.registerForm.get('username')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      confirm_password: this.registerForm.get('confirm_password')?.value
    }

    // console.log(user);


    this.newsService.register(user).subscribe(
      (res: any) => {
        console.log(res);

        this.router.navigate([RouteValues.LOGIN]);
      },
      (err) => {
        console.log(err.message);

      }
    )
  }
}
