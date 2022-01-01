import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { PersonalAcountComponent } from './personal-acount/personal-acount.component';
import { BuyinCartComponent } from './buyin-cart/buyin-cart.component';
import { ProductSiteComponent } from './product-site/product-site.component';
import { UserPageComponent } from './user-page/user-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { BuyingCartService } from './buying-cart.service';
import { BuyingInfoComponent } from './buying-info/buying-info.component';
import { AppComponent } from './app.component';




const routes: Routes = [
{
path:'home',
component:HomeComponent
},
{
  path:'',
  component:AppComponent
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
},

{
  path:'product/:id',
  component:ProductSiteComponent 
}
,
{
  path:'user/:id',
  component:UserPageComponent
},
{
  path:'user',
  component:UserPageComponent
},

{
  path:'admin/:id',
  component:AdminPageComponent
},
{
  path:'admin',
  component:AdminPageComponent
},
{
  path:'buyinfo',
  component:BuyingInfoComponent
}


];








@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
