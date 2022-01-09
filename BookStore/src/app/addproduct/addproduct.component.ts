import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductSiteComponent } from '../product-site/product-site.component';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  constructor(private http:HttpClient ) { }
  URL="http://localhost:8080/api/product/add/";
  ngOnInit(): void {
  }

  addProductMethod(addProduct:any)
{

   let prod:Product;
   prod=addProduct;
  console.log(prod);
 this.http.post(this.URL,prod).subscribe( data=>
{ 
  console.log("added new product");

}
 );

}



}
