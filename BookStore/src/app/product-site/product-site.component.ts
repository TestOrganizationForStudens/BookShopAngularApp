import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule,HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-site',
  templateUrl: './product-site.component.html',
  styleUrls: ['./product-site.component.css']
})
export class ProductSiteComponent implements OnInit {

 UserInfo:any
  id:any
  readonly URL:string='http://localhost:8080/api/product/'

  constructor(private _Activatedroute:ActivatedRoute,
    private http:HttpClient ) { }

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