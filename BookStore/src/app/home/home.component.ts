import { Component, OnInit } from '@angular/core';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { User } from '../user';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { BuyingCartService } from '../buying-cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})




export class HomeComponent  implements OnInit{
  private user: User;
 ;
  displayStringFirstNameLastName: string="Hi, Alex";

  constructor(private userService: UsersService, private router: Router,private http:HttpClient) {
    this.user={
      id: 0, firstName: "", lastName: "", userName: "",
    email: "", address: "", phone: "", cardNumber: "",
    password: "", userRole: null, listOfOrder: null
    }
    this.readUserData();
  

  }

  logOutFunction():void{
    this.userService.logOut();
    this.router.navigate(["/"]).then(() => {
      window.location.reload();
    });
  }


  private readUserData():void{
    let user=sessionStorage.getItem("user");
    if(user){
      let firstName: User=JSON.parse(user).firstName;
      let lastName: User=JSON.parse(user).lastName;
      this.displayStringFirstNameLastName=`HI, ${firstName} ${lastName}`;
    }else{
      this.displayStringFirstNameLastName="";
    }
  }

   readonly URL='http://localhost:8080/api/product/';
   readonly URL2='https://jsonplaceholder.typicode.com/posts';
   readonly URLS={0:"http://localhost:8080/api/product/findByPrice?price=",
    1:'http://localhost:8080/api/product/findByPriceThatAreCheaper?price=',
    2:"http://localhost:8080/api/product/findByPriceThatAreExpensive?price=",
    3:"http://localhost:8080/api/product/publishingHouse?publishHouse=",
    4:"http://localhost:8080/api/product/findByYear?year=",
    5:"http://localhost:8080/api/product/findByProductName?productName=",
    6:"http://localhost:8080/api/product/findByCategory?category=",
    7:"http://localhost:8080/api/product/findByAuthor?author="
}

  stringToUseBase:string='http://localhost:8080/api/product/all';
  stringToUse:string='http://localhost:8080/api/product/all';
  products:any;
  books:any;
  books2:any;
  logedIn:any;
  
  toProductName(){
    this.stringToUseBase=this.URLS[5];
    var obj=document.getElementById("filterButton");
    if(obj){
      obj.style.width="100px";
      obj.innerText="Product Name";
    }
  }

  toCategory(){
    console.log("merge categoria");
    this.stringToUseBase=this.URLS[6];
    var obj=document.getElementById("filterButton");
    if(obj){
      obj.style.width="100px";
      obj.innerText="Category";
    }
  }

  toAuthor(){
  console.log("merge autorul");
  this.stringToUseBase=this.URLS[7];
  var obj=document.getElementById("filterButton");
  if(obj){
   obj.style.width="100px";
   obj.innerText="Author";
  }
 }
   
 
 toPublish(){
    console.log("merge publish");
    this.stringToUseBase=this.URLS[3];
    var obj=document.getElementById("filterButton");
    if(obj){
     obj.style.width="130px";
     obj.innerText="Publishing House";
    }
  }
  
  toYear(){
    console.log("merge  anul");
    this.stringToUseBase=this.URLS[4];
    var obj=document.getElementById("filterButton");
    if(obj){
     obj.style.width="100px";
     obj.innerText="Year";
    }
  }
    

  toPrice(){
    console.log("merge  pretul");
    this.stringToUseBase=this.URLS[0];
    var obj=document.getElementById("filterButton");
    if(obj){
     obj.style.width="100px";
     obj.innerText="Exact Price";
    }
  }

  toPrice2(){
    console.log("merge  mai putin decat pretul");
    this.stringToUseBase=this.URLS[1];
    var obj=document.getElementById("filterButton");
    if(obj){
      obj.style.width="130px";
      obj.innerText="Lower than price";
    }
  }

  toPrice3(){
    console.log("merge  mai mult decat pretul");
    this.stringToUseBase=this.URLS[2];
    var obj=document.getElementById("filterButton");
    if(obj){
      obj.style.width="130px";
      obj.innerText="Higher than price";
    }
  }

 doImages(location:string){
   //testing repository: "assets/books/more_books/books.json"
    this.http.get<[]>(location).subscribe(data =>{
        var workDiv=document.getElementById("productSpace");
        var sheet = document.createElement('style');
        sheet.innerHTML ="#productSpace{margin:auto}  #productSpace img {display: inline; vertical-align: middle;padding-right: 20px;padding-bottom: 20px;}";
        document.body.appendChild(sheet);
        let messageForProdcuts=document.createElement("p");
        messageForProdcuts.textContent="Here are some of the most bought items";
        if(workDiv!=null)
          workDiv.appendChild(messageForProdcuts);

        let links=[];
        let sources=[];
        this.books2=data;
        for(let book of this.books2 ){
         // console.log(book);
          links.push("https://localhost:4200/product/"+book['id']);
          sources.push(book["image"]);
        }
        
        for(var i = 0; i < sources.length; i++){
          let image=document.createElement("img");
          image.setAttribute("src",sources[i]);
          image.setAttribute('height', '100px');
          image.setAttribute('width', '100px');
          
          if(i<links.length){
            let link=document.createElement("a");
            link.setAttribute("href",links[i]); 
          
            if(workDiv!=null){
              link.appendChild(image);
              workDiv.appendChild(link);
            }
          }else{
            if(workDiv!=null){
              workDiv.appendChild(image);
            }
          }
          
          if((i+1)%10==0){
            var br = document.createElement("br");
            if(workDiv!=null)
              workDiv.appendChild(br);
            }
          }
    });
  }

  getRandomImage(){
    console.warn("I am feeling lucky");
    let length=this.books2.length;
    console.log(length);
    let index=Math.floor(Math.random() * (length) ) + 1;
    var src;
    var linkSite;
    src=this.books2[index]["image"];
    linkSite="https://localhost:4200/product/"+this.books2[index]["id"];
    var image=document.getElementById("luckyone");
    var link=document.getElementById("linkTolucky");
  
    if(image && link && src && linkSite){
      image.setAttribute("src",src);
      image.setAttribute('height', '200px');
      image.setAttribute('width', '120px');
      link.setAttribute("href",linkSite);
    }
  }

  ngOnInit(){
    this.logedIn=false;
    this.doImages(this.URL);
  }

  changeImg(){ (document.getElementById("mainimg") as HTMLImageElement).src="assets/Sales.jpg";}

  changeImg2(){ (document.getElementById("mainimg") as HTMLImageElement).src="assets/download.jpg";}

  searchengine(Item:any){
    this.stringToUse=this.stringToUseBase+Item["search string"];
    console.warn(this.stringToUse);
   this.doImages(this.stringToUse);  
  }
}