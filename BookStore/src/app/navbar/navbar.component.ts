import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class NavbarComponent implements OnInit {
  private user: User;
  indexSearch:number=0;
  stringToUseBase: string = 'http://localhost:8000/api/product/all';
  stringToUse: string = 'http://localhost:8000/api/product/all';
  readonly URL = 'http://localhost:8000/api/product/all';
  readonly URL2 = 'https://jsonplaceholder.typicode.com/posts';
  readonly URLS = {
    0: "http://localhost:8000/api/product/findByPrice?price=",
    1: 'http://localhost:8000/api/product/findByPriceThatAreCheaper?price=',
    2: "http://localhost:8000/api/product/findByPriceThatAreExpensive?price=",
    3: "http://localhost:8000/api/product/publishingHouse?publishHouse=",
    4: "http://localhost:8000/api/product/findByYear?year=",
    5: "http://localhost:8000/api/product/findByProductName?productName=",
    6: "http://localhost:8000/api/product/findByCategory?category=",
    7: "http://localhost:8000/api/product/findByAuthor?author="
  }


  constructor(private userService: UsersService,private router: Router, private http: HttpClient) {  this.user = {
    id: 0, firstName: "", lastName: "", userName: "",
    email: "", address: "", phone: "", cardNumber: "",
    password: "", userRole: null, listOfOrder: null
  } 
  this.readUserData();


}
  displayStringFirstNameLastName: string = "Hi, Alex";
  ngOnInit(): void {
  }
 toProductName() {
    this.stringToUseBase = this.URLS[5];
    this.indexSearch=5;
    var obj = document.getElementById("filterButton");
    if (obj) {
      obj.style.width = "100px";
      obj.innerText = "Product Name";
    }
  }

  toCategory() {
    console.log("merge categoria");
    this.stringToUseBase = this.URLS[6];
    this.indexSearch=6;
    var obj = document.getElementById("filterButton");
    if (obj) {
      obj.style.width = "100px";
      obj.innerText = "Category";
    }
  }

  toAuthor() {
    console.log("merge autorul");
    this.indexSearch=7;
    this.stringToUseBase = this.URLS[7];
    var obj = document.getElementById("filterButton");
    if (obj) {
      obj.style.width = "100px";
      obj.innerText = "Author";
    }
  }
  redirectUser()
  {
   console.log("here");
  // if(this.user.userRole)
  this.router.navigate(["/account/"+this.user.id]);

  }

  toPublish() {
    console.log("merge publish");
    this.stringToUseBase = this.URLS[3];
    this.indexSearch=3;
    var obj = document.getElementById("filterButton");
    if (obj) {
      obj.style.width = "130px";
      obj.innerText = "Publishing House";
    }
  }

  toYear() {
    console.log("merge  anul");
    this.stringToUseBase = this.URLS[4];
    this.indexSearch=4;
    var obj = document.getElementById("filterButton");
    if (obj) {
      obj.style.width = "100px";
      obj.innerText = "Year";
    }
  }


  toPrice() {
    console.log("merge  pretul");
    this.stringToUseBase = this.URLS[0];
    this.indexSearch=0;
    var obj = document.getElementById("filterButton");
    if (obj) {
      obj.style.width = "100px";
      obj.innerText = "Exact Price";
    }
  }

  toPrice2() {
    console.log("merge  mai putin decat pretul");
    this.stringToUseBase = this.URLS[1];
    this.indexSearch=1;
    var obj = document.getElementById("filterButton");
    if (obj) {
      obj.style.width = "130px";
      obj.innerText = "Lower than price";
    }
  }

  toPrice3() {
    console.log("merge  mai mult decat pretul");
    this.stringToUseBase = this.URLS[2];
    this.indexSearch=2;
    var obj = document.getElementById("filterButton");
    if (obj) {
      obj.style.width = "130px";
      obj.innerText = "Higher than price";
    }
  }


  searchengine(Item: any) {
    this.router.navigate(["/home/"+Item["search string"]+"/"+ this.indexSearch]);

  }
  
  logOutFunction(): void {
    this.userService.logOut();
    this.router.navigate(["/"]).then(() => {
      window.location.reload();
    });
  }

  private readUserData(): void {
    let user = sessionStorage.getItem("user");
   


    if (user) {
      this.user=JSON.parse(user);
      let firstName: User = JSON.parse(user).first_name;
      let lastName: User = JSON.parse(user).last_name;
      this.displayStringFirstNameLastName = `HI, ${firstName} ${lastName}`;
    } else {
      this.displayStringFirstNameLastName = "";
    }
  }


}
