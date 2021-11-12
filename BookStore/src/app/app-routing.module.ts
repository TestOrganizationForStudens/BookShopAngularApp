import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { PersonalAcountComponent } from './personal-acount/personal-acount.component';
import { BuyinCartComponent } from './buyin-cart/buyin-cart.component';

const routes: Routes = [
{
path:'',
component:HomeComponent
},
{
  path: 'login',
  component: LoginComponent
},

{
  path: 'cart',
  component: BuyinCartComponent
},

{
  path: 'sigin',
  component: SigninComponent 
},
{
  path:'account',
  component: PersonalAcountComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
