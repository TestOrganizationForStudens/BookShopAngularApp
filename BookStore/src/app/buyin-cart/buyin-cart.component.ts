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
 

  readonly URL='http://localhost:8000/api/product/';


  constructor(private cart:BuyingCartService, private router: Router,private http:HttpClient) {
    
   }

 private totalPrice=0;
 private clicked_line:any;

 findLine(event:any)
 {
  var target=event.target;

  var elem=<Element>event.target;
  var parent=elem.parentElement?.parentElement;

if(parent)
{

console.log("line that was clicked was "+ parent.id);
this.clicked_line=parent.id;
console.log("line that was clicked was "+ this.clicked_line);
} 

 
}




printProducts()
{

  var tableToUpdate=<HTMLTableElement>document.getElementById("tableProducts");

  if(tableToUpdate)
 {  
  var tableHeader=tableToUpdate.firstChild;
  console.log("header",tableHeader);
  if(tableHeader)
  { 
   
     tableToUpdate.appendChild(tableHeader);
  }
 
  tableToUpdate.innerHTML="";
  if(tableHeader)
  { 
       console.log(tableHeader);
     tableToUpdate.appendChild(tableHeader);
  }
 


  let i=0;
   this.totalPrice=0;
  for(let product of this.cart.products)
  {  

    var line=document.createElement("tr");

    line.addEventListener("click",this.findLine.bind(this));
 

    line.setAttribute("id","line"+i);

     
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
     
     inp3.id="quantityField "+line.id;



     var quantity=product["quantity"];
     inp1.value=product["product"].id.toString();
     inp2.value=product["product"].productName;
     inp4.value=product["product"].price.toString();
     inp3.value=quantity.toString();



     this.totalPrice+=quantity*product["product"].price;
     inp5.value=(quantity*product["product"].price).toString();


     inp1.readOnly=true;
     inp2.readOnly=true;
     inp4.readOnly=true;
     inp5.readOnly=true;


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

      line.id="total";
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
  this.totalPrice=0;
  var tableToUpdate=<HTMLTableElement>document.getElementById("tableProducts");

  var rowTodelete=document.getElementById(this.clicked_line);

  if(tableToUpdate && rowTodelete)
  {
    let prodin=<HTMLInputElement>(rowTodelete.firstChild?.firstChild);
    let prodid=parseInt(prodin.value);
    this.cart.deleteProduct(prodid);
    console.log("this cart:",this.cart.products);
}
this.printProducts();
}
modify_product()
{

  this.totalPrice=0;
  console.log("modify product "+this.clicked_line);

  var tableToUpdate=<HTMLTableElement>document.getElementById("tableProducts");
  var rowTodelete=document.getElementById(this.clicked_line);

  if(tableToUpdate && rowTodelete)
  {
    let prodin=<HTMLInputElement>(rowTodelete.firstChild?.firstChild);
    let prodid=parseInt(prodin.value);

     var inp=<HTMLInputElement>document.getElementById("quantityField "+this.clicked_line);



     if(inp)
   {
        var amount= parseInt(inp.value);

        this.cart.modifyAmount(prodid,amount);

   }

   this.printProducts();

  }
      
    

}
  ngOnInit(): void {
    console.log("cart");

  this.printProducts();
  console.log(this.cart.products);

 
 }

 }

