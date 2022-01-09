import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../Order';
import { Product } from '../product';
import { ProductSiteComponent } from '../product-site/product-site.component';
import { User } from '../user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {


  private products:any;
  private users:any;
  private admin:any;
  private orders:any=[];
  private id:any;










  constructor(private userService:UsersService,private _Activatedroute:ActivatedRoute,private router: Router,private http:HttpClient) { }
  readonly URL='http://localhost:8080/api/product/all';
  readonly URL2='http://localhost:8080/api/user/findById?id=';
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
   var j=0;
   if(tableToUpdate)
   {
      var tableTitle=document.getElementById("userTitle");
      tableToUpdate.innerHTML="";
      if(tableTitle)
      tableToUpdate.appendChild(tableTitle);


   for(let user of this.users)
   {
    var line=document.createElement("tr");
    line.addEventListener("click",this.findLine.bind(this));
      line.id="userline"+j;
        j++;
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




}}







printPerosnalInfo()
{
   this._Activatedroute.paramMap.subscribe(params => { 
      this.id = params.get('id'); 

      if(this.id)
      this.http.get<[]>(this.URL2+this.id).subscribe(data =>{

         let user:User;
          this.admin=data;
          
          user=this.admin;
          

          var id=<HTMLInputElement>document.getElementById("idAdmin_inp");
          var first=<HTMLInputElement>document.getElementById("firstNameAdmin_inp");
          var last=<HTMLInputElement>document.getElementById("lastNameAdmin_inp");
          var username=<HTMLInputElement>document.getElementById("usernameAdmin_inp");
          var email=<HTMLInputElement>document.getElementById("emailAdmin_inp");
          var address=<HTMLInputElement>document.getElementById("addressAdmin_inp");
          var phone=<HTMLInputElement>document.getElementById("phoneAdmin_inp");
          var card=<HTMLInputElement>document.getElementById("cardAdmin_inp");
         
      if(user)
    {
       if(id)
       id.value=user["id"].toString();

       if(first)
       first.value=user["firstName"].toString();

       if(last)
       last.textContent=user["lastName"].toString();
      if(username)
      username.value=user["userName"].toString();
      if(email)
      email.value=user["email"].toString();
       if(address)
       address.value=user["address"];
       if(phone)
       phone.value=user["phone"].toString();
       if(card)
       card.value=user["cardNumber"].toString();
    }});   });


}






printOrders()
{
   var tableToUpdate=document.getElementById("orderTable");
   var header=document.getElementById("orderTitle");


   var j=0;
   if(tableToUpdate)
{ 
   var tableTitle=document.getElementById("orderTitle");
   tableToUpdate.innerHTML="";
   if(tableTitle)
   tableToUpdate.appendChild(tableTitle);

   for(let order of this.orders)
   {    

    var line=document.createElement("tr");
    line.id="orderline"+j;
    line.addEventListener("click",this.findLine.bind(this));
    j++;
      for(let i=0;i<6;i++)
     {
        
      var elem=document.createElement("td");
      var inp=document.createElement("input");

      if(i==0)
        {
         inp.value=order["id"].toString();
         inp.readOnly=true;
        }
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
}



printProducts()
{
   console.log("print products",this.products);
  var tableToUpdate=document.getElementById("productTable");


  if(tableToUpdate)
{

   var tableTitle=document.getElementById("productTitle");
   tableToUpdate.innerHTML="";
   if(tableTitle)
   tableToUpdate.appendChild(tableTitle);





  var j=0;
  for(let product of this.products)
  {

   var line=document.createElement("tr");
   line.addEventListener("click",this.findLine.bind(this));
   line.id="productline"+j;
    j++;

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
     {
      inp.value=product["id"].toString();
      inp.readOnly=true;
     }
   
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

}

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


deleteProduct()
{
  console.log("delete product "+this.clicked_line);
  var tableToUpdate=<HTMLTableElement>document.getElementById("productTable");

  var rowTodelete=document.getElementById(this.clicked_line);
  if(tableToUpdate && rowTodelete)
  tableToUpdate?.removeChild(<Node>rowTodelete);

 for(let i in tableToUpdate.rows)
{
   let row=tableToUpdate.rows[i];
   let quantity;
   let price;
    let k=0;
    let cl=0;



   for (let j in row.cells) 
   {    
      cl++;
    
    if(row.cells[j].tagName=="TD")
    { 
          if(cl==3)
     { var inp=<HTMLInputElement>(row.cells[j].firstElementChild);
      if(inp)
           k=k+parseFloat(inp.value);
   
        console.log(row.cells[j]);
     }
    }
  

   }




}

}

deleteOrder()
{
  console.log("delete product "+this.clicked_line);
  var tableToUpdate=<HTMLTableElement>document.getElementById("orderTable");

  var rowTodelete=document.getElementById(this.clicked_line);
  if(tableToUpdate && rowTodelete)
  {

   var elm=rowTodelete.firstElementChild;
   if(elm){
      var elm2=<HTMLInputElement>(elm.firstElementChild);

       var id=parseInt(elm2.value);
       var index=this.orders.findIndex((order: { id: number; })=>order.id==id);
          console.log("orders",this.orders);

            this.orders.splice(index,1);
            console.log("orders2",this.orders);
            this.printOrders();
         }}
      }
deleteUser()
{
  console.log("delete user "+this.clicked_line);
  var tableToUpdate=<HTMLTableElement>document.getElementById("userTable");

  var rowTodelete=document.getElementById(this.clicked_line);
  if(tableToUpdate && rowTodelete)
  {
   var elm=rowTodelete.firstElementChild;
   if(elm){
      var elm2=<HTMLInputElement>(elm.firstElementChild);

       var id=parseInt(elm2.value);
       var index=this.users.findIndex((user1: { id: number; })=>user1.id==id);
            this.users.splice(index,1);
            this.printUsers();

   }
 



   tableToUpdate?.removeChild(<Node>rowTodelete);

  }


  





}

updateToDatabase()
{
   console.log("update the database");
 this.http.post(this.URL,this.users);
 this.http.post(this.URL2,this.products);
 this.http.post(this.URL3,this.orders);


}


modifyProduct()
{

  console.log("modify product "+this.clicked_line);
       

}

modifyUser()
{

  console.log("modify product "+this.clicked_line);
       

}

modifyOrder()
{

  console.log("modify product "+this.clicked_line);
       






  

}


addProduct()
{
 console.log("add product");
this.router.navigate(["/addproduct"]);

}

}

