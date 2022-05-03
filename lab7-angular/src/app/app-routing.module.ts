import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NewsComponent } from './news/news.component';
import { RouterModule, Routes } from '@angular/router';
import { RouteValues } from './constants';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
    { path: RouteValues.REGISTER, component: RegisterComponent },
    { path: RouteValues.LOGIN, component: LoginComponent },
    { path: RouteValues.NEWS, component: NewsComponent },
    { path: RouteValues.ADD, component: AddComponent },
    { path: RouteValues.UPDATE, component: UpdateComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }