import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../Order';
import { Product } from '../product';
import { ProductSiteComponent } from '../product-site/product-site.component';
import { User } from '../user';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {


  private products:any;
  private users:any;
  private admin:any;
  private orders:any;
  private id:any;

  constructor(private _Activatedroute:ActivatedRoute,private router: Router,private http:HttpClient) { }
  readonly URL='http://localhost:8080/api/product/';
  readonly URL2='http://localhost:8080/api/user/';
  readonly URL3='http://localhost:8080/api/order/';
  private clicked_line="";
  ngOnInit(): void {
  this.printPerosnalInfo();
    this.http.get<[]>(this.URL).subscribe(data =>{
     
      var books=data;
      let book:Product ;
      this.products=[];
      for(book of books)
       this.products.push(book);

      this.printProducts();
  });
    this.http.get<[]>(this.URL2).subscribe(data =>{
     
      var users1=data;
      let user:User ;
      this.users=[];
      for(user of users1)
       this.users.push(user);

      this.printUsers();
  });

  this.http.get<[]>(this.URL3).subscribe(data =>{
     
   var orders1=data;
   let order:Order ;
   this.orders=[];
   for(order of orders1)
    this.orders.push(order);

    this.printOrders();
});



}
printUsers()
{
   var tableToUpdate=document.getElementById("userTable");
   if(tableToUpdate)
   for(let user of this.users)
   {
    var line=document.createElement("tr");
 

      for(let i=0;i<8;i++)
     {
      var elem=document.createElement("td");
      var inp=document.createElement("input");
      if(i==0)
        inp.value=user["id"].toString();
      if(i==1)
         inp.value=user["firstName"];
        
      if(i==2)
         inp.value=user["lastName"];
      if(i==3)
         inp.value=user["userName"];
      if(i==4)
         inp.value=user["email"];
      if(i==5)
         inp.value=user["address"];
      if(i==6)
         inp.value=user["phone"];
      if(i==7)
         inp.value=user["cardNumber"];
 
         elem.appendChild(inp);
         line.appendChild(elem);
 
     }
   
    tableToUpdate.appendChild(line);
 }




}
printPerosnalInfo()
{
   this._Activatedroute.paramMap.subscribe(params => { 
      this.id = params.get('id'); 

      if(this.id)
      this.http.get<[]>(this.URL2+this.id).subscribe(data =>{

       

         let user:User;
          this.admin=data;
          
          user=this.admin;
          

          var id=document.getElementById("idAdmin");
          var first=document.getElementById("firstNameAdmin");
          var last=document.getElementById("lastNameAdmin");
          var username=document.getElementById("usernameAdmin");
          var email=document.getElementById("emailAdmin");
          var address=document.getElementById("addressAdmin");
          var phone=document.getElementById("phoneAdmin");
          var card=document.getElementById("cardAdmin");
         
      if(user)
    {
       if(id)
       id.textContent=id.textContent+" "+user["id"].toString();

       if(first)
       first.textContent=first.textContent+" "+user["firstName"].toString();

       if(last)
       last.textContent=last.textContent+" "+user["lastName"].toString();
      if(username)
      username.textContent=username.textContent+" "+user["userName"].toString();
      if(email)
      email.textContent=email.textContent+" "+user["email"].toString();
       if(address)
       address.textContent=address.textContent+" "+user["address"];
       if(phone)
       phone.textContent=phone.textContent+" "+user["phone"].toString();
       if(card)
       card.textContent=card.textContent+" "+user["cardNumber"].toString();
    }});   });


}


printOrders()
{
   var tableToUpdate=document.getElementById("orderTable");
   var header=document.getElementById("orderTitle");
   if(tableToUpdate)
   for(let order of this.orders)
   {    
    var line=document.createElement("tr");
      for(let i=0;i<6;i++)
     {
        
      var elem=document.createElement("td");
      var inp=document.createElement("input");

      if(i==0)
        inp.value=order["id"].toString();
      if(i==1)
         inp.value=order["userData"]["userName"];
      if(i==2)
         inp.value=order["userData"]["lastName"]+" "+order["userData"]["firstName"];
      if(i==3)
      inp.value=order["dateTime"].toString();
      if(i==4)
         inp.value=order["price"];

         if(i<=4)
         { 
         elem.appendChild(inp);
         line.appendChild(elem);
         }
      if(i==5)
        {   

        var productList=this.orders["productOrderList"];
         if(productList)
      for(let productOrder of productList)
    {
          
         var elem1=document.createElement("td");
         var inp1=document.createElement("input");
         inp1.value=productOrder["product"]["id"];
         elem1.appendChild(inp1);
         line.appendChild(elem1);

         var elem2=document.createElement("td");
         var inp2=document.createElement("input");
         inp2.value=productOrder["product"]["productName"];
         elem2.appendChild(inp2);
         line.appendChild(elem2);


         var elem3=document.createElement("td");
         var inp3=document.createElement("input");
         inp3.value=productOrder["amount"];
         elem3.appendChild(inp3);
         line.appendChild(elem3);

        if(header){
         var prodId=document.createElement("th");
          prodId.textContent="Product Id";
    
          header.appendChild(prodId);

          var prodName=document.createElement("th");
          prodName.textContent="Product Name";
        
          header.appendChild(prodName);

          var prodAmount=document.createElement("th");
          prodAmount.textContent="Product amount";
          header.appendChild(prodAmount);


        }
      }

        }



         
 
     }
   
    tableToUpdate.appendChild(line);
 }

}




printProducts()
{
   console.log("print products",this.products);
  var tableToUpdate=document.getElementById("productTable");
  if(tableToUpdate)
{

  for(let product of this.products)
  {
   var line=document.createElement("tr");

    var elem1=document.createElement("td");
    var image=document.createElement("img");


     image.setAttribute("src",product["image"]);
     image.height=50;
     image.width=50;
     elem1.appendChild(image);
     line.appendChild(elem1);

     for(let i=0;i<9;i++)
    {
     var elem=document.createElement("td");
     var inp=document.createElement("input");
     if(i==0)
       inp.value=product["id"].toString();
     if(i==1)
        inp.value=product["category"];
     if(i==2)
        inp.value=product["productName"];
     if(i==3)
        inp.value=product["author"];
     if(i==4)
        inp.value=product["publishingHouse"];
     if(i==5)
        inp.value=product["year"];
     if(i==6)
        inp.value=product["price"];
     if(i==7)
        inp.value=product["inStore"];
     if(i==8)
        inp.value=product["description"];

        elem.appendChild(inp);
        line.appendChild(elem);

    }
  
   tableToUpdate.appendChild(line);
}
}

}}





