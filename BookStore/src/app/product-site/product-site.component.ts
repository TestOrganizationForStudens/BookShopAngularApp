import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import {BuyingCartService} from '../buying-cart.service';
import { Product } from '../product';
import { CompileShallowModuleMetadata } from '@angular/compiler';
@Component({
  selector: 'app-product-site',
  templateUrl: './product-site.component.html',
  styleUrls: ['./product-site.component.css']
})
export class ProductSiteComponent implements OnInit {

  UserInfo:any;
  product:Product

  id:any
  readonly URL:string='http://localhost:8080/api/product/'

  constructor(private _Activatedroute:ActivatedRoute,private cart:BuyingCartService,
    private http:HttpClient ) {
      this.product={id: 0,
        productName: " ",
        category: " ",
        author: " ",
        publishingHouse: " ",
        year: 2020,
        price: 1,
        description: " ",
        image: " ",
        inStore: " ",
        productOrdersList: []}

     }

addInCart()
{
  var page=document.getElementById("body");
  if(page)
    {
   var par= document.createElement("p");
    par.textContent="products:"+this.cart.products

    }
   console.log("se adauga in cos");
   console.log(this.product);
   this.cart.addProduct(this.product);
   console.log("products:",this.cart.products);
}




  ngOnInit(): void {
    console.log("here");
    this._Activatedroute.paramMap.subscribe(params => { 
      this.id = params.get('id'); 

      this.http.get<[]>(this.URL+this.id).subscribe(data =>{
      console.log(data);

  
 {  var title= document.getElementById("title");
    var author= document.getElementById("author");
    var img= document.getElementById("image");
    var cat=  document.getElementById("category");
    var year= document.getElementById("year");
    var publish=document.getElementById("publish");
    var price= document.getElementById("price");
    var description= document.getElementById("description:");
    this.UserInfo=data;
     

   this.product.productName=this.UserInfo['productName'];
   this.product.category=this.UserInfo['category'];
   this.product.author=this.UserInfo['author'];
   this.product.publishingHouse=this.UserInfo["productName"];
   this.product.year=this.UserInfo["year"];
   this.product.price=this.UserInfo["price"];
   this.product.description=this.UserInfo["description"];
   this.product.image=this.UserInfo["image"];
   this.product.inStore=this.UserInfo["inStore"];

     if(title)
    {
      title.innerText=this.UserInfo["productName"];
    }
    if(author)
    {
      author.innerText="de " + this.UserInfo["author"];

    }
    if(cat)
    {
      cat.innerText="Categorii:" + this.UserInfo["category"];
    }
    if(year)
    {
      year.innerText="Data Publicarii:" + this.UserInfo["year"];
    }
    if(publish)
    {
      publish.innerText="Editura:" + this.UserInfo["publishingHouse"];
    }
    if(price)
    {
      price.innerText="Pret:" + this.UserInfo["price"]+ " lei";
    }
    if(description)
    {
      description.innerText="Descriere:\n\n" + this.UserInfo["description"];
    }
   if(img)
   {

     img.setAttribute("src", this.UserInfo["image"]);
     
   }

  }




      


  });
   



  });}
}