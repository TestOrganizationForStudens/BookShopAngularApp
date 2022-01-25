import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { PersonalAcountComponent } from './personal-acount/personal-acount.component';
import  {FormsModule} from '@angular/forms';
import { BuyinCartComponent } from './buyin-cart/buyin-cart.component'
import { InjectionToken } from '@angular/core';
import {APP_INITIALIZER}from '@angular/core';
import { ProductSiteComponent } from './product-site/product-site.component';
import { UserPageComponent } from './user-page/user-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { BuyingInfoComponent  } from './buying-info/buying-info.component';
import { BuyingCartService } from './buying-cart.service';
import { AddproductComponent } from './addproduct/addproduct.component';
import { SignInAdminComponent } from './sign-in-admin/sign-in-admin.component';
import { NavbarComponent } from './navbar/navbar.component';
function initializeApp(): Promise<void> {
  var script= document.createElement('script');
   script.src="https://connect.facebook.net/en_US/sdk.js";
   document.body.appendChild(script);

  return new Promise((resolve, reject) => {
    console.log("Buna dimineata");
    window["fbAsyncInit"]=function() {
      console.log("Buna seara");
      FB.init({ 
        appId: "216725267251875",
        status: true, 
        cookie: true, 
        xfbml: true,
        version: 'v8.0'
      });
      console.log("merge");

  
  };

   resolve();
  }
  );





}






@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SigninComponent,
    PersonalAcountComponent,
    BuyinCartComponent,
    ProductSiteComponent,
    UserPageComponent,
    AdminPageComponent,
    BuyingInfoComponent,
    AddproductComponent,
    SignInAdminComponent,
    NavbarComponent,

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],


  providers: [{
    provide: APP_INITIALIZER,
    useFactory: () => initializeApp,
    multi: true
   }
],
  bootstrap: [AppComponent]
})
export class AppModule {}
