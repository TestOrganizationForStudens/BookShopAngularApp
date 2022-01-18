import { Component, Input, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { User } from '../user';
import { UsersService } from '../users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BuyingCartService } from '../buying-cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})




export class HomeComponent implements OnInit {
  private user: User;
  ;
  displayStringFirstNameLastName: string = "Hi, Alex";
   searchString=" ";

  constructor(private userService: UsersService, private router: Router, private http: HttpClient,private _Activatedroute:ActivatedRoute) {
   
    
   
    this.user = {
      id: 0, firstName: "", lastName: "", userName: "",
      email: "", address: "", phone: "", cardNumber: "",
      password: "", userRole: null, listOfOrder: null
    }
    this.readUserData();
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
      let firstName: User = JSON.parse(user).firstName;
      let lastName: User = JSON.parse(user).lastName;
      this.displayStringFirstNameLastName = `HI, ${firstName} ${lastName}`;
    } else {
      this.displayStringFirstNameLastName = "";
    }
  }

  readonly URL = 'http://localhost:8080/api/product/all';
  readonly URL2 = 'https://jsonplaceholder.typicode.com/posts';
  readonly URLS = {
    "0": "http://localhost:8080/api/product/findByPrice?price=",
    "1": 'http://localhost:8080/api/product/findByPriceThatAreCheaper?price=',
    "2": "http://localhost:8080/api/product/findByPriceThatAreExpensive?price=",
    "3": "http://localhost:8080/api/product/publishingHouse?publishHouse=",
    "4": "http://localhost:8080/api/product/findByYear?year=",
    "5": "http://localhost:8080/api/product/findByProductName?productName=",
    "6": "http://localhost:8080/api/product/findByCategory?category=",
    "7": "http://localhost:8080/api/product/findByAuthor?author="
  }

  stringToUseBase: string = 'http://localhost:8080/api/product/all';
  stringToUse: string = 'http://localhost:8080/api/product/all';
  products: any;
  books: any;
  books2: any;
  logedIn: any;

  toProductName() {
    this.stringToUseBase = this.URLS[5];
    var obj = document.getElementById("filterButton");
    if (obj) {
      obj.style.width = "100px";
      obj.innerText = "Product Name";
    }
  }

  toCategory() {
    console.log("merge categoria");
    this.stringToUseBase = this.URLS[6];
    var obj = document.getElementById("filterButton");
    if (obj) {
      obj.style.width = "100px";
      obj.innerText = "Category";
    }
  }

  toAuthor() {
    console.log("merge autorul");
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
    var obj = document.getElementById("filterButton");
    if (obj) {
      obj.style.width = "130px";
      obj.innerText = "Publishing House";
    }
  }

  toYear() {
    console.log("merge  anul");
    this.stringToUseBase = this.URLS[4];
    var obj = document.getElementById("filterButton");
    if (obj) {
      obj.style.width = "100px";
      obj.innerText = "Year";
    }
  }


  toPrice() {
    console.log("merge  pretul");
    this.stringToUseBase = this.URLS[0];
    var obj = document.getElementById("filterButton");
    if (obj) {
      obj.style.width = "100px";
      obj.innerText = "Exact Price";
    }
  }

  toPrice2() {
    console.log("merge  mai putin decat pretul");
    this.stringToUseBase = this.URLS[1];
    var obj = document.getElementById("filterButton");
    if (obj) {
      obj.style.width = "130px";
      obj.innerText = "Lower than price";
    }
  }

  toPrice3() {
    console.log("merge  mai mult decat pretul");
    this.stringToUseBase = this.URLS[2];
    var obj = document.getElementById("filterButton");
    if (obj) {
      obj.style.width = "130px";
      obj.innerText = "Higher than price";
    }
  }

  doImages(location: string,message:string='') {
    //testing repository: "assets/books/more_books/books.json"
    this.http.get<[]>(location, {
      headers: {
        Authorization: 'Bearer' + this.userService.getToken()
      }
    }
    ).subscribe(data => {
      var workDiv = document.getElementById("productSpace");
      var sheet = document.createElement('style');
      sheet.innerHTML = "#productSpace.input{width:100px,height:100px} #productSpace{margin:auto}  #productSpace input {display: inline; vertical-align: middle;padding-right: 20px;padding-bottom: 20px;}";
      document.body.appendChild(sheet);
      let messageForProdcuts = document.createElement("p");

      if(message=='')
      messageForProdcuts.textContent = "Here are some of the most bought items";
      else
      messageForProdcuts.textContent = message;

      if (workDiv != null)
        workDiv.appendChild(messageForProdcuts);

      let links = [];
      let sources = [];
      this.books2 = data;
      for (let book of this.books2) {
        // console.log(book);
          //"
        links.push("/product/" + book['id']);
        sources.push(book["image"]);
      }

      for (var i = 0; i < sources.length; i++) {
       
        if (i < links.length) {
          let link = document.createElement("input");
          link.setAttribute("type","image");
          link.setAttribute("src",sources[i]);
          link.setAttribute('height', '100px');
          link.setAttribute('width', '100px');
          link.setAttribute('width', '100px');
          link.setAttribute( "vertical-align","middle");
          link.setAttribute( "padding-right","20px");
          link.setAttribute( "padding-bottom","20px");
          
          link.value=links[i];
         // window.addEventListener("click",this.passToProduct.bind(this));
          link.addEventListener("dblclick",this.passToProduct.bind(this));



          if (workDiv != null) {
        
            workDiv.appendChild(link);
          }
        } else {
          if (workDiv != null) {
            let link = document.createElement("input");
            link.setAttribute("type","image");
            link.setAttribute("src",sources[i]);
            link.setAttribute('height', '100px');
            link.setAttribute('width', '100px');
            link.setAttribute('width', '100px');
            link.setAttribute( "vertical-align","middle");
            link.setAttribute( "padding-right","20px");
            link.setAttribute( "padding-bottom","20px");
            workDiv.appendChild(link);
          }
        }

        if ((i + 1) % 10 == 0) {
          var br = document.createElement("br");
          if (workDiv != null)
            workDiv.appendChild(br);
        }
      }
    });
  }
  passToProduct(event:any)
  { 
    var element= <HTMLInputElement>event.target;
    if(element)
    {
  
      var path= element.value;
      this.router.navigate([path]);
    }
    


  }
  getRandomImage() {
    console.warn("I am feeling lucky");

let length = this.books2.length;
    console.log(length);
    let index = Math.floor(Math.random() * (length)) + 1;
    var src;
    var linkSite;
    src = this.books2[index]["image"];
    linkSite = "/product/" + this.books2[index]["id"];

    let link = <HTMLInputElement> document.getElementById("linkTolucky");
    if(link)
    {
       link.setAttribute("src",src);
       link.setAttribute('height', '200px');
       link.setAttribute('width', '120px');
       link.value= linkSite ;
      
       link.addEventListener("click",this.passToProduct.bind(this));

    }
    

  
  }

  ngOnInit() {
    this.logedIn = false;
   
    this._Activatedroute.paramMap.subscribe(params => { 
      var str  = params.get('search');
      if(str)
     { this.searchString=str;
       console.log("string as query"+str);

         var tip  = params.get('type');
         if(tip)
         {
           var str2={"search string":str};
             console.log(tip);
             
             if(tip=="0")
         this.stringToUseBase=this.URLS[0];
              else
              if(tip=="1")
              this.stringToUseBase=this.URLS[1];
                   else
                   if(tip=="2")
                   this.stringToUseBase=this.URLS[2];
                        else

                        if(tip=="3")
                        this.stringToUseBase=this.URLS[3];
                             else
                             if(tip=="4")
                             this.stringToUseBase=this.URLS[4];
                                  else
                                  if(tip=="5")
                                  this.stringToUseBase=this.URLS[5];
                                       else
                                       if(tip=="6")
                                       this.stringToUseBase=this.URLS[6];
                                            else
                                            if(tip=="7")
                                            this.stringToUseBase=this.URLS[7];

         this.searchengine(str2);
       
         }
     }else
     this.doImages(this.URL);



 });
    console.log("home");
  }

  changeImg() { (document.getElementById("mainimg") as HTMLImageElement).src = "assets/Sales.jpg"; }

  changeImg2() { (document.getElementById("mainimg") as HTMLImageElement).src = "assets/download.jpg"; }

  searchengine(Item: any) {
    this.stringToUse = this.stringToUseBase + Item["search string"];
    console.warn(this.stringToUse);

    var workDiv = document.getElementById("productSpace");

    if (workDiv) {
      var workDivParent = workDiv.parentElement;

      if (workDivParent) {
        workDivParent.removeChild(workDiv);
        var newDiv = document.createElement("div");
        newDiv.id = "productSpace";
        workDivParent.appendChild(newDiv);

      }

    }
    this.doImages(this.stringToUse,"Results for the query: "+Item["search string"]+" are: ");
  }
}