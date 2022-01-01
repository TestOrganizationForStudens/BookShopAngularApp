import { HttpClient } from '@angular/common/http';
import { Component, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectableObservable } from 'rxjs';
import { BuyingCartService } from '../buying-cart.service';
import { Product } from '../product';
import { ProductSiteComponent } from '../product-site/product-site.component';
@Component({
  selector: 'app-buyin-cart',
  templateUrl: './buyin-cart.component.html',
  styleUrls: ['./buyin-cart.component.css']
})
export class BuyinCartComponent implements OnInit {
 

  readonly URL='http://localhost:8080/api/product/';


  constructor(private cart:BuyingCartService, private router: Router,private http:HttpClient) { }


 private clicked_line="";
 private totalPrice=0;
 findLine(event:any)
 {
  var target=event.target;

  var elem=<Element>event.target;
  var parent=elem.parentElement?.parentElement;

if(parent)
{

console.log("line that was clicked was "+ parent.id);
this.clicked_line=parent.id;
} 

 
}




printProducts()
{
   
 var tableToUpdate=document.getElementById("tableProducts");
  if(tableToUpdate)
 {  let i=0;
   this.totalPrice=0;
  for(let product of this.cart.products)
  {  

    var line=document.createElement("tr");
    line.setAttribute("id","line"+i);

     var quantity=0;
    for(let product3 of this.cart.products)
         {
           if(product.id==product3.id)
               quantity++;
         }

         i++;
                  

     var elem1=document.createElement("td");
     var elem2=document.createElement("td");
     var elem3=document.createElement("td");
     var elem4=document.createElement("td");
     var elem5=document.createElement("td");


     var inp1=document.createElement("input");
     var inp2=document.createElement("input");
     var inp3=document.createElement("input");
     var inp4=document.createElement("input");
     var inp5=document.createElement("input");


     elem1.addEventListener("click",this.findLine);
      
     inp1.value=product.id.toString();
     inp2.value=product.productName;
     inp4.value=product.price.toString();
     inp3.value=quantity.toString();
     this.totalPrice+=quantity*product.price;
     inp5.value=(quantity*product.price).toString();

  
    elem1.appendChild(inp1);
    elem2.appendChild(inp2);
    elem3.appendChild(inp3);
    elem4.appendChild(inp4);
    elem5.appendChild(inp5);

     line.appendChild(elem1);
     line.appendChild(elem2);
     line.appendChild(elem3);
     line.appendChild(elem4);
     line.appendChild(elem5);




    tableToUpdate.appendChild(line);
  }
     var line=document.createElement("tr");
     var elem1=document.createElement("td");
     var elem2=document.createElement("td");
     var elem3=document.createElement("td");
     var elem4=document.createElement("td");
      elem1.textContent=" ";
      elem2.textContent=" ";
      elem3.textContent=" ";
      elem4.textContent=this.totalPrice.toString();
     line.appendChild(elem1);
     line.appendChild(elem2);
     line.appendChild(elem3);
     line.appendChild(elem4);
     tableToUpdate.appendChild(line);



}
}


delete_product()
{
console.log("delete product "+this.clicked_line);

}
modify_product()
{
  console.log("modify product "+this.clicked_line);


}
  ngOnInit(): void {
 
/*
  this.http.get<[]>(this.URL).subscribe(data =>{

    var books=data;
    let book:Product ;
    for(book of books)
  {  

   this.cart.products.push(book);
  }
  this.printProducts();


    }
  );

  
*/


  console.log(this.cart.products);
 
 }

 }

