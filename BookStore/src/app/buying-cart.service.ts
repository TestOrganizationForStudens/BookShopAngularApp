import { Injectable } from '@angular/core';
import { Product } from './product';
import { ProductWrapper } from './product-wrapper';
@Injectable(
{ providedIn: 'root'
})
export class BuyingCartService {
 products:ProductWrapper[] 
 
 static instance: BuyingCartService;
private constructor() { 
    console.log("new buying cart");
this.products=[];

  }

static getInstance()
{
     if(!this.instance)
{
  this.instance=new BuyingCartService();
   return this.instance
}else
  return this.instance

}


 addProduct(prod:Product)
 {

let amount=1;
for(let prodW of this.products)
{
   if(prodW["product"]["id"]==prod.id)
     amount++;
}
if(amount>1)
{
 var index=this.products.findIndex(prod1=>prod1.product.id==prod.id);
 this.products[index].quantity=amount;
}
else
this.products.push({product:prod,quantity:1});



 }

 deleteProduct(ProdId:number)
 {
  var index=this.products.map(e=>e.product.id).indexOf(ProdId);

  this.products.splice(index,1);
 }


 modifyAmount(ProdId:number,amount:number)
 {
  var index=this.products.findIndex(prod1=>prod1.product.id==ProdId);

   console.log(ProdId," index:",index,"amount:",amount);
  
  if(amount>0 && index>=0)
  this.products[index].quantity=amount;
  else
  if(amount==0)
  this.products.splice(index,1);

 }
 totalPrice()
 {
   var total=0.0;
  for(let prodW of this.products)
  {
   total+=prodW.quantity*prodW.product.price;

 }
    return total;
  }
}
