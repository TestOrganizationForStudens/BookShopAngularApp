import { Injectable } from '@angular/core';
import { Product } from './product';
@Injectable({
  providedIn: 'root'
})
export class BuyingCartService {
 products:Product[]
  constructor() { 
    console.log("new buying cart");
this.products=[];
  }
 addProduct(prod:Product)
 {
 this.products.push(prod);
 }

 deleteProduct(ProdId:number)
 {
 // var prod1=this.products.find();
 // var index=this.products.indexOf(prod1);

 //this.products.splice(index,1);
 }



  }
