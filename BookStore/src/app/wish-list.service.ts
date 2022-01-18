import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  wish:Product[];
  constructor() { 
 this.wish=[];

  }


  addProduct(prod:Product)
  {
 
 let amount=1;
 for(let prodW of this.wish)
 {
    if(prodW["id"]==prod.id)
      amount++;
 }
 if(amount==1)
 this.wish.push(prod);
 
 
  }
 
  deleteProduct(ProdId:number)
  {
   var index=this.wish.map(e=>e.id).indexOf(ProdId);
 
   this.wish.splice(index,1);
  }
 



  

}
