import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product';
import { ProductSiteComponent } from '../product-site/product-site.component';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
   product:Product;

  constructor(private http:HttpClient,private router:Router ) { 

    this.product={id:0,author:"",category:"",description:"",productName:"",price:0,image:"",
    publishingHouse:"",year:2022,inStore:1,productOrdersList:[]
  }



  }
  URL="http://localhost:8000/api/product/add/";

  ngOnInit(): void {
  }

  addProductMethod(addProduct1:any)
{

  this.product.author=addProduct1.author.value;
  this.product.category=addProduct1.category.value;
  this.product.description=addProduct1.description.value;
  this.product.productName=addProduct1.productName.value;
  this.product.price=parseInt(addProduct1.price.value);
  this.product.image=addProduct1.image.value;
  this.product.publishingHouse=addProduct1.publishingHouse.value;
  this.product.year=parseInt(addProduct1.year.value);
  this.product.inStore=10;

  console.log(this.product);
this.http.post(this.URL,this.product).subscribe( data=>
{ 
  console.log("added new product");
  this.router.navigate(["/home"]);

});

}



}
