import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
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
  private update_admin=true;









  constructor(private userService:UsersService,private _Activatedroute:ActivatedRoute,private router: Router,private http:HttpClient) { }
  readonly URL='http://localhost:8000/api/product/all';
  readonly URL2='http://localhost:8080/api/user/findById?id=';
  readonly URL4='http://localhost:8000/api/user';
  readonly URL3='http://localhost:8000/api/order/';
  readonly URL5='http://localhost:8000/api/product/changeall';
  readonly URL6='http://localhost:8000/api/order/changeall';
  private clicked_line="";
  ngOnInit(): void {
  this.readUserData();
  this.printPerosnalInfo();
    this.http.get<[]>(this.URL).subscribe(data =>{
     
      var books=data;
      let book:Product ;
      this.products=[];
      for(book of books)
       this.products.push(book);

      this.printProducts();
  });
    this.http.get<[]>(this.URL4).subscribe(data =>{
     console.log("users:",data);
      var users1=data;
      let user:any;
      this.users=[];
      for(user of users1)
       this.users.push(user);

      this.printUsers();
  });

  this.http.get<[]>(this.URL3).subscribe(data =>{
     
   var orders1=data;
   let order;
   this.orders=[];
   for(order of orders1)
    this.orders.push(order);

    this.printOrders();
});



}
private IndexToFilter=0;
private URLF={
"0": "findByPrice?price=",
"1": 'indByPriceThatAreCheaper?price=',
"2": "findByPriceThatAreExpensive?price=",
"3": "publishingHouse?publishHouse=",
"4": "findByYear?year=",
"5": "findByProductName?productName=",
"6": "findByCategory?category=",
"7": "findByAuthor?author=",
"8":"findByUserName?user=",
"9":"findByUsername?user=",
"10":"Date?date=",
"11":"findByPrice?price=",
"12":"findByPriceThatAreExpensive?price=",
"13":"findByPriceThatAreCheaper?price=",
"14":"findByAmount?amount=",
"15":"findByAmountThatAreLess?amount=",
"16":"findByAmountThatAreMore?amount=",
"17":"findByProductId?id=",
"18":"",
"19":"",
"20":"",
"21":"",
"22":"",
"23":"",
"24":"",
"25":"",
"26":"",
"27":"",
"28":"",
"29":"",
"30":"",



}

backToAllProducts()
{
  this.http.get<[]>(this.URL).subscribe(data =>{
     
    var books=data;
    let book:Product ;
    this.products=[];
    for(book of books)
     this.products.push(book);

    this.printProducts();
});


}

backToAllUsers()
{

  this.http.get<[]>(this.URL4).subscribe(data =>{
    console.log("users:",data);
     var users1=data;
     let user:any;
     this.users=[];
     for(user of users1)
      this.users.push(user);

     this.printUsers();
 });
  
}
backToAllOrders()
{

  this.http.get<[]>(this.URL3).subscribe(data =>{
     
    var orders1=data;
    let order;
    this.orders=[];
    for(order of orders1)
     this.orders.push(order);
 
     this.printOrders();
 });

  
}









toAllProduct()
{
var btn=document.getElementById("productquery")
if(btn)
btn.style.display="block";

}

toAllOrders()
{ var btn=document.getElementById( "orderquery" )
if(btn)
btn.style.display="block";
  
}
toProductName(){this.IndexToFilter=5;this.toAllProduct();
  
  var obj = document.getElementById("filterButton3");
  if (obj) {
    obj.style.width = "100px";
    obj.innerText = "Product Name";
  }
  
  
  
  ;}
toCategory(){this.IndexToFilter=6;this.toAllProduct();
  var obj = document.getElementById("filterButton3");
  if (obj) {
    obj.style.width = "100px";
    obj.innerText = "Category";
  }
  
  
  
  ;}
toAuthor(){this.IndexToFilter=7;this.toAllProduct();
  
  var obj = document.getElementById("filterButton3");
  if (obj) {
    obj.style.width = "100px";
    obj.innerText = "Author";
  }
  
  ;}
toPublish(){this.IndexToFilter=3;this.toAllProduct();
  var obj = document.getElementById("filterButton3");
  if (obj) {
    obj.style.width = "100px";
    obj.innerText = "Publisher";
  }
  
  ;}
toYear(){this.IndexToFilter=4;this.toAllProduct();
  var obj = document.getElementById("filterButton3");
  if (obj) {
    obj.style.width = "100px";
    obj.innerText = "Year";
  }
  
  ;}
toPrice(){this.IndexToFilter=0;this.toAllProduct();
  var obj = document.getElementById("filterButton3");
  if (obj) {
    obj.style.width = "100px";
    obj.innerText = "Equal Price";
  }
  ;}
toPrice2(){this.IndexToFilter=1;this.toAllProduct();
  var obj = document.getElementById("filterButton3");
  if (obj) {
    obj.style.width = "100px";
    obj.innerText = "Lower than Price";
  }
  ;}
toPrice3(){this.IndexToFilter=2;this.toAllProduct();
  var obj = document.getElementById("filterButton3");
  if (obj) {
    obj.style.width = "100px";
    obj.innerText = "More than Price";
  }
  ;}
toOrderTime(){this.IndexToFilter=10;
  var obj = document.getElementById("filterButton2");
  var obj2 = document.getElementById("datePicher");
   if(obj2)
   obj2.style.display="block";
  if (obj) {
    obj.style.width = "100px";
    obj.innerText = "Date";

}}

toOrderUsername(){this.IndexToFilter=9;this.toAllOrders();
  var obj = document.getElementById("filterButton2");
  if (obj) {
    obj.style.width = "100px";
    obj.innerText = "Username";

}
}
toOrderUserName(){this.IndexToFilter=8;this.toAllOrders();
  var obj = document.getElementById("filterButton2");
  if (obj) {
    obj.style.width = "100px";
    obj.innerText = "User Name";

}
}
toOrderPrice(){this.IndexToFilter=11;this.toAllOrders();
  var obj = document.getElementById("filterButton2");
  if (obj) {
    obj.style.width = "100px";
    obj.innerText = "Total Price";

}
}
toOrderPrice2(){this.IndexToFilter=12;this.toAllOrders();
  var obj = document.getElementById("filterButton2");
  if (obj) {
    obj.style.width = "100px";
    obj.innerText = "Total < Price";

}
}
toOrderPrice3(){this.IndexToFilter=13;this.toAllOrders();
  var obj = document.getElementById("filterButton2");
  if (obj) {
    obj.style.width = "100px";
    obj.innerText = "Total > Price";

}
}
toOrderProduct(){this.IndexToFilter=17;this.toAllOrders();
  var obj = document.getElementById("filterButton2");
  if (obj) {
    obj.style.width = "100px";
    obj.innerText = "By Product Id";

}
}
toOrderAmount(){this.IndexToFilter=14;this.toAllOrders();
  var obj = document.getElementById("filterButton2");
  if (obj) {
    obj.style.width = "100px";
    obj.innerText = "By Amount";

}

}
toOrderAmount2(){this.IndexToFilter=15;this.toAllOrders();
  var obj = document.getElementById("filterButton2");
  if (obj) {
    obj.style.width = "100px";
    obj.innerText = "Less than Amount";

}

}
toOrderAmount3(){this.IndexToFilter=16;this.toAllOrders();
  var obj = document.getElementById("filterButton2");
  if (obj) {
    obj.style.width = "100px";
    obj.innerText = "More than Amount";

}

}

filter_engine()
{ 
var query="";
var stringBase=" ";
var extra=" ";
if(this.IndexToFilter<8)
{
  stringBase="http://localhost:8000/api/product/";
   extra=" ";
   var queryField=<HTMLInputElement>document.getElementById("productquery");
 


   if(queryField)
    query=queryField.value;
  this.products=[];
  switch(this.IndexToFilter){
  case 0: extra=this.URLF["0"];
   break;
   case 1: extra=this.URLF["1"];
   break;
   case 2: extra=this.URLF["2"];
   break;
   case 3: extra=this.URLF["3"];
   break;
   case 4: extra=this.URLF["4"];
   break;
   case 5: extra=this.URLF["5"];
   break;
   case 6: extra=this.URLF["6"];
   break;
   case 7: extra=this.URLF["7"];
   break;
  }

  this.http.get(stringBase+extra+query).subscribe(data=>
    {this.products=data;
    this.printProducts();
    var btn=document.getElementById("productquery")
       if(btn)
      btn.style.display="none";
    }
    
    );

}else
if(this.IndexToFilter<18)
{
  var queryField=<HTMLInputElement>document.getElementById("orderquery");
  if(queryField)
   query=queryField.value;
   var dateField=<HTMLInputElement>document.getElementById("datePicher");
  switch(this.IndexToFilter){
    case 8: extra=this.URLF["8"];
     break;
     case 9: extra=this.URLF["9"];
     break;
     case 10: extra=this.URLF["10"];
     query=dateField.value;
     break;
     case 11: extra=this.URLF["11"];
     break;
     case 12: extra=this.URLF["12"];
     break;
     case 13: extra=this.URLF["13"];
     break;
     case 14: extra=this.URLF["14"];
     break;
     case 15: extra=this.URLF["15"];
     break;
     case 16: extra=this.URLF["16"];
     break;
     case 17: extra=this.URLF["17"];
     break;
    }
  
  stringBase="http://localhost:8000/api/order/";
  this.orders=[];
 
  this.http.get(stringBase+extra+query).subscribe(data=>{
    
    this.orders=data
    this.printOrders();
    var btn=document.getElementById("orderquery")
    if(btn)
   btn.style.display="none";
   var btn2=document.getElementById("datePicher")
   if(btn2)
  btn2.style.display="none";



  }
    
    );


}else
{
  var queryField=<HTMLInputElement>document.getElementById("userquery");
  if(queryField)
   query=queryField.value;

  stringBase="http://localhost:8000/api/user/";


}


  




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
        inp.value=user["id_user"].toString();
      if(i==1)
         inp.value=user["first_name"];
        
      if(i==2)
         inp.value=user["last_name"];
      if(i==3)
         inp.value=user["user_name"];
      if(i==4)
         inp.value=user["email"];
      if(i==5)
         inp.value=user["address"];
      if(i==6)
         inp.value=user["phone"];
      if(i==7)
         inp.value=user["card_number"];
 
         elem.appendChild(inp);
         line.appendChild(elem);
 
     }
   
    tableToUpdate.appendChild(line);
 }




}}



private readUserData(): void {


  this.admin = sessionStorage.getItem("user");
  this.admin=JSON.parse(this.admin);
}

printPerosnalInfo()
{
    

        
         console.log("admin:",this.admin);
         if(this.admin){
        
      
          

          var id=<HTMLInputElement>document.getElementById("idAdmin_inp");

          var first=<HTMLInputElement>document.getElementById("firstnameAdmin_inp");
          var last=<HTMLInputElement>document.getElementById("lastNameAdmin_inp");

          var username=<HTMLInputElement>document.getElementById("usernameAdmin_inp");
          var email=<HTMLInputElement>document.getElementById("emailAdmin_inp");
          var address=<HTMLInputElement>document.getElementById("addressAdmin_inp");
          var phone=<HTMLInputElement>document.getElementById("phoneAdmin_inp");
          var card=<HTMLInputElement>document.getElementById("cardAdmin_inp");
         
      if(this.admin)
    {
       console.log(" here user:",this.admin);
     
       if (id)
       {

         id.value =  this.admin["id_user"].toString();
         id.readOnly=true;

       }
       

       if (first)
       {
     
       first.value  = this.admin["first_name"].toString();
       first.readOnly=true;

       }
      

       if (last)
       {
         last.value  =  this.admin["last_name"].toString();
         last.readOnly=true;

       }
        
       if (username)
       {
         username.value  = this.admin["user_name"].toString();
         username.readOnly=true;

       }
     
       if (email)
       {
         email.value  = this.admin["email"].toString();
         email.readOnly=true;

       }
    
       if (address)
       {

         address.value =  this.admin["address"];
         address.readOnly=true;
       }
       
       if (phone)
     {
       phone.value  =  this.admin["phone"].toString();
       phone.readOnly=true;

     }
       
       if (card)
       {
         card.value  = this.admin["card_number"].toString();
         card.readOnly=true;
       }

   }
}
}


filterOrder()
{



}

filterProducts()
{



}
filterUsers()
{



}

keep_only_k(name_header:string,k:number)
{
  var header=<HTMLTableRowElement>document.getElementById(name_header);
  var cl=k+1;
   var cells=header.cells;
   while(cells[cl]){
    header.deleteCell(cl);
    cells=header.cells;
   }

 
 console.log("header transformed",header);
}






printOrders()
{
   var tableToUpdate=document.getElementById("orderTable");
   var header=document.getElementById("orderTitle");
   this.keep_only_k("orderTitle",4);
   var max_number_product=0;
   var local_number_product=0;
   var j=0;
   if(tableToUpdate)
{ 
   var tableTitle=document.getElementById("orderTitle");
   tableToUpdate.innerHTML="";
   if(tableTitle)
   tableToUpdate.appendChild(tableTitle);

   for(let order of this.orders)
   {    
    local_number_product=0;
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
          
         inp.value=order["id_order"];
         inp.readOnly=true;
        }
      if(i==1)
         inp.value=order["user"]["user_name"];
      if(i==2)
         inp.value=order["user"]["first_name"]+" "+order["user"]["last_name"];
      if(i==3)
      inp.value=order["date_time"]
      if(i==4)
         inp.value=order["price"];

         if(i<=4)
         { 
         elem.appendChild(inp);
         line.appendChild(elem);
         }
      if(i==5)
        {   
         var productList:[];
         productList=order["product_order_list"];
         if(productList)
      for(let productOrder of productList)
    {
         local_number_product++;
         var elem1=document.createElement("td");
         var inp1=document.createElement("input");
         if(productOrder["product"]["id_product"])
         inp1.value = productOrder["product"]["id_product"];
         else
         inp1.value =productOrder["product"];
         
         elem1.appendChild(inp1);
         line.appendChild(elem1);

         var elem2=document.createElement("td");
         var inp2=document.createElement("input");
         inp2.value=productOrder["product"]["product_name"];
         elem2.appendChild(inp2);
         line.appendChild(elem2);


         var elem3=document.createElement("td");
         var inp3=document.createElement("input");
         inp3.value=productOrder["amount"];
         elem3.appendChild(inp3);
         line.appendChild(elem3);

    
      }

        }



         
 
       }
      if(local_number_product>max_number_product)
         max_number_product=local_number_product;
    tableToUpdate.appendChild(line);
 }

console.log("max",max_number_product);
for(let i=0;i<max_number_product;i++)
if(header)
{
  var prodId=document.createElement("th");
   prodId.textContent="Product Id";

   header.appendChild(prodId);

   var prodName=document.createElement("th");
   prodName.textContent="Product Name";
 
   header.appendChild(prodName);

   var prodAmount=document.createElement("th");
   prodAmount.textContent="Product amount";
   header.appendChild(prodAmount);

   var elm=document.getElementById('the_body');
   if(elm)
   elm.style.backgroundImage =  "C:/Users/Sandu/git/BookShopAngularApp/BookStore/src/assets/admin.jpg";


 }








}
}
addAdmin()
{

this.router.navigate(["/signinadmin"]);

  
}
modify_admin_data()
{ 
   
var id=<HTMLInputElement>document.getElementById("idAdmin_inp");
var first=<HTMLInputElement>document.getElementById("firstnameAdmin_inp");
var last=<HTMLInputElement>document.getElementById("lastNameAdmin_inp");

var username=<HTMLInputElement>document.getElementById("usernameAdmin_inp");
var email=<HTMLInputElement>document.getElementById("emailAdmin_inp");
var address=<HTMLInputElement>document.getElementById("addressAdmin_inp");
var phone=<HTMLInputElement>document.getElementById("phoneAdmin_inp");
var card=<HTMLInputElement>document.getElementById("cardAdmin_inp");

   var btn=document.getElementById("mdf1");
   if(btn)
   if(this.update_admin)
  {
   btn.textContent="submit data";
   this.update_admin=false;


  } else
  { console.log("here to update",this.admin);
    this.admin["first_name"]=first.value;
    this.admin["last_name"]=last.value;
    this.admin["email"]= email.value;
    this.admin["user_name"]= username.value;
    this.admin["phone"]= phone.value ;
    this.admin["card_number"]= card.value ;

    this.http.put("http://localhost:8000/api/user/update",this.admin).subscribe
   (data=>{
     
     console.log(data)
     
     sessionStorage.setItem("user",JSON.stringify(this.admin));
   }
    );




    btn.textContent="modifica date";
   this.update_admin=true;

  }
   console.log("admin",this.admin);
  if (first)
  {

  first.value=this.admin["first_name"].toString(); ;
  first.readOnly=!first.readOnly;

  }
 

  if (last)
  {
    last.value  =  this.admin["last_name"].toString();
    last.readOnly=! last.readOnly;

  }
   
  if (username)
  {
    username.value  = this.admin["user_name"].toString();
    username.readOnly=!username.readOnly;

  }

  if (email)
  {
    email.value  = this.admin["email"].toString();
    email.readOnly=!email.readOnly;
    

  }

  if (address)
  {

    address.value =  this.admin["address"];
    address.readOnly=!address.readOnly;
  }
  
  if (phone)
{
  phone.value  =  this.admin["phone"].toString();
  phone.readOnly=!phone.readOnly;

}
  
  if (card)
  {
    card.value  = this.admin["card_number"];
    card.readOnly=!card.readOnly;
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
      inp.value=product["id_product"].toString();
      inp.readOnly=true;
     }
   
     if(i==1)
        inp.value=product["category"];
     if(i==2)
        inp.value=product["product_name"];
     if(i==3)
        inp.value=product["author"];
     if(i==4)
        inp.value=product["publishing_house"];
     if(i==5)
        inp.value=product["year"];
     if(i==6)
        inp.value=product["price"];
     if(i==7)
        inp.value=product["in_store"];
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
  var URLDeleteP="http://localhost:8000/api/product/delete";
  console.log("delete product "+this.clicked_line);
  var tableToUpdate=<HTMLTableElement>document.getElementById("productTable");

  var rowTodelete=document.getElementById(this.clicked_line);
  if(tableToUpdate && rowTodelete)
  {
    var ID=(<HTMLInputElement>rowTodelete.children[1].firstChild).value;
    console.log("children1",ID,"and:",this.products);
    var index=this.products.findIndex((obj: { id_product: number; })=>obj.id_product==parseInt(ID));
    if(index)
    {
     var product=this.products[index];

     this.http.post(URLDeleteP,product).subscribe(data=>
      {
        console.log("delete succesfull",data);
       this.products.splice(index,1);
       this.printProducts();


      });

    }
   }




}



 URLDelete="http://localhost:8000/api/order/delete";

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
       var index=this.orders.findIndex((obj: { id_order: number; })=>obj.id_order=id);
          console.log("orders",this.orders[index]);
          this.http.post(this.URLDelete,this.orders[index]).subscribe(data=>
           {
             console.log("delete succesfull",data);
            this.orders.splice(index,1);
            this.printOrders();


           });
        
        }
      }
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
   console.log("update the database",this.products);
   console.log("update the database",this.orders);
 //this.http.post(this.URL,this.users);
 this.http.put(this.URL5,this.products).subscribe(data=>
  console.log("update the database finish",data)
  );

 this.http.put(this.URL6,this.orders).subscribe(data=>
  console.log("update the database finish orders",data)
  );


}


modifyProduct()
{
var newProducts:any=[];



var tableToUpdate=<HTMLTableElement>document.getElementById("productTable");
let index_row=0;
for(let i in tableToUpdate.rows)
{
 let row=tableToUpdate.rows[i];
  index_row++;

  let cl=0;



  var product={
    id_product: 0,
    product_name: "",
    category: "",
    author: "",
    publishing_house: "",
    year: 2022,
    price: 1,
    description: "",
    image: "",
    in_store: 1,
    product_orders_list:[]
  
  };

 
 for (let j in row.cells) 
 {    
  index_row
    cl++;
  if(index_row>1)
  if(row.cells[j].tagName=="TD")
  {   

     var inp=<HTMLInputElement>(row.cells[j].firstElementChild)
  
     
         if(cl==1)
         {
          var inp2=<HTMLImageElement>(row.cells[j].firstElementChild)
         product.image=inp2.src;

         }
       
         if(cl==2)
          product.id_product=parseInt(inp.value);
         if(cl==3)
         product.category=inp.value;
         if(cl==4)
         product.product_name=inp.value;
         if(cl==5)
         product.author=inp.value;
         if(cl==6)
         product.publishing_house=inp.value;
         if(cl==7)
         product.year=parseInt(inp.value);
         if(cl==8)
         product.price=parseInt(inp.value);
         if(cl==9)
         product.in_store=parseInt(inp.value);
         if(cl==10)
         product.description=inp.value;

        
   }
  

  
  }  
  if(index_row>1)
  {
      newProducts.push(product);

      console.log("j=",product);
  }
      
  ;}

  newProducts.pop();
  newProducts.pop();
  newProducts.pop();

  this.products= newProducts;
  this.printProducts();
  
  }



modifyUser()
{

  console.log("modify product "+this.clicked_line);
       

}

modifyOrder()
{
  var newOrders:any=[];
  console.log("modify order "+this.clicked_line);
       
  var tableToUpdate=<HTMLTableElement>document.getElementById("orderTable");


  let index_row=0;
  for(let i in tableToUpdate.rows)
  {
   let row=tableToUpdate.rows[i];
    index_row++;
  
    let cl=0;
    var order={
      id_order:0,
      date_time: new Date,
      user: this.admin,
      price: 0,
      product_order_list: []

    };
 

   for (let j in row.cells) 
   {    
    

      cl++;
    if(index_row>1)
    if(row.cells[j].tagName=="TD")
    {   
  
       var inp=<HTMLInputElement>(row.cells[j].firstElementChild)
    
       
           if(cl==1)
           {
             var id=parseInt(inp.value);
             if(id)
             {
             order=this.orders.filter((obj: { [x: string]: number; })=>{return obj["id_order"]===id})[0];

             }
  
           }
              else
           if(cl==2)
           {
            if(order["user"]["user_name"])
            order["user"]["user_name"]=inp.value;

           }else
            
           if(cl==3)
           {
           if(order["user"]["first_name"])
           { order["user"]["first_name"] =inp.value.split(" ")[0];
            order["user"]["last_name"] =inp.value.split(" ")[1];
           }
          }
          else
           if(cl==4)
           order["date_time"]=new Date(inp.value);
          else
           if(cl==5)
           order.price=parseInt(inp.value);
         
  
          
     }
    
  
    
    }  
    if(index_row>1)
    {
        newOrders.push(order);
  
        console.log("j=",order);
    }

}
newOrders.pop();
newOrders.pop();
newOrders.pop();

console.log( newOrders);
this.orders=[];
for(let ino of newOrders)
this.orders.push(ino);

}

addProduct()
{
 console.log("add product");
this.router.navigate(["/addproduct"]);

}

}

