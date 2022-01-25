import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isJSDocLinkLike, updateSpreadAssignment } from 'typescript';
import { Order } from '../Order';
import { Product } from '../product';
import { ProductSiteComponent } from '../product-site/product-site.component';
import { User } from '../user';
import { UsersService } from '../users.service';
import { WishListService } from '../wish-list.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  readonly URL = 'http://localhost:8000/api/product/all';
  readonly URL2 = 'http://localhost:8000/api/user/';
  readonly URL3 = 'http://localhost:8000/api/order/';
  readonly URL4 = 'http://localhost:8080/api/order/findByUserData?user=';
  constructor(private WishHelper:WishListService,private userService:UsersService,private _Activatedroute: ActivatedRoute, private router: Router, private http: HttpClient) { }

  private user: any;
  private orders: any = [];
  //lists of products
  private recomandings: any;
  private id: any;
  private Clicked_wish:any;
  private readUserData(): void {


    this.user = sessionStorage.getItem("user");
    this.user=JSON.parse(this.user);
  }


  ngOnInit(): void {
    this.readUserData();
    this.printPerosnalInfo();
    this.makeDemoWishList();


  }
  printPerosnalInfo() {


        this.http.get<[]>(this.URL3 ).subscribe(data => {

            let orders1 = [];
            this.orders = [];
            orders1 = data;
            let order: any;

            for (order of orders1)
           {
          
         if(order.user.id_user==this.user.id_user)
         this.orders.push(order);

          }

            this.printOrders();
          });

          var id =<HTMLInputElement> document.getElementById("id_inp");
          var first =<HTMLInputElement> document.getElementById("prenume_inp");
          var last =<HTMLInputElement> document.getElementById("nume_inp");
          var username =<HTMLInputElement> document.getElementById("username_inp");
          var email =<HTMLInputElement> document.getElementById("email_inp");
          var address =<HTMLInputElement> document.getElementById("adresa_inp");
          var phone =<HTMLInputElement> document.getElementById("telefon_inp");
          var card =<HTMLInputElement> document.getElementById("card_inp");

          if (this.user) {
            if (id)
            {

              id.value =  this.user["id_user"].toString();
              id.readOnly=true;

            }
            

            if (first)
            {
          
            first.value  = this.user["first_name"].toString();
            first.readOnly=true;

            }
           

            if (last)
            {
              last.value  =  this.user["last_name"].toString();
              last.readOnly=true;

            }
             
            if (username)
            {
              username.value  = this.user["user_name"].toString();
              username.readOnly=true;

            }
          
            if (email)
            {
              email.value  = this.user["email"].toString();
              email.readOnly=true;

            }
         
            if (address)
            {

              address.value =  this.user["address"];
              address.readOnly=true;
            }
            
            if (phone)
          {
            phone.value  =  this.user["phone"].toString();
            phone.readOnly=true;

          }
            
            if (card)
            {
              card.value  = this.user["card_number"].toString();
              card.readOnly=true;
            }
         
          }
        }
    


  makeDemoWishList()
{
   this.http.get<[]>(this.URL).subscribe(data=>{

            var prods=data;
            //this.wishList=[];
              var i=0;
            for(let prod of prods)
         {    
           i++;
                if(i%10==0)
                {

                 var prod2={id:prod["id_product"],author:prod["author"],category:prod["category"],
                 description:prod["description"],productName:prod["product_name"],price:prod["price"],image:prod["image"],
                 publishingHouse:prod["publishing_house"],year:prod["year"],inStore:prod["in_store"],productOrdersList:[]}

                  this.WishHelper.addProduct(prod2);
               }

                }
            


        this. printWishList();

   });


}



   printWishList()
  {       console.log("wish a better life");
      let prod:any;

      var wishdiv= document.getElementById("wish");

      if(this.WishHelper.wish)

    for(prod of this.WishHelper.wish)
   {            
         if(wishdiv)
           {
                         var wraper=document.createElement("figure");

                         var link=document.createElement("input");
                         link.value="/product/"+prod.id;
                         link.id="img"+prod.id;

                         wraper.addEventListener("click",this.findImage.bind(this));
                         wraper.addEventListener("dblclick",this.passToProduct.bind(this));
                         link.setAttribute("type","image");
                         link.setAttribute("src",prod.image);
                         link.setAttribute('height', '100px');
                         link.setAttribute('width', '100px');
                         link.setAttribute('width', '100px');
                         link.setAttribute( "padding-right","20px");
                         link.setAttribute( "padding-bottom","20px");

                         wraper.appendChild(link);
                         var figcap=document.createElement("figcaption");
                         figcap.innerText=prod["productName"];
                         figcap.setAttribute("word-break","break-all");
                         figcap.setAttribute("width","100px");
                         figcap.setAttribute("text-align","center");
                         figcap.style.color="white";
                         wraper.appendChild(figcap);
                         wishdiv.appendChild(wraper);






           }

   }


   }

   passToProduct(event:any)
   {
    console.log("intra acolo");
    var element= <HTMLInputElement>event.target;
    if(element)
    {
  
      var path= element.value;
      this.router.navigate([path]);
    }
    

   }
   findImage(event:any)
   {
     console.log("intra aici");
    var element= <HTMLInputElement>event.target;
    if(element)
    {  this.Clicked_wish=element.id;
       console.log("image passed was",element.id);


   }
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
    }


  printOrders()
  {  console.log("print orders");
     var tableToUpdate=document.getElementById("orderTable");
     var header=document.getElementById("orderTitle");
     this.keep_only_k("orderTitle",2
     );
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
       console.log("order:",order);
      local_number_product=0;
      var line=document.createElement("tr");
      line.id="orderline"+j;
      j++;
        for(let i=0;i<4;i++)
       {
      
        var elem=document.createElement("td");
        var inp=document.createElement("input");
  
        if(i==0)
          {
           inp.value=order["id_order"].toString();
           inp.readOnly=true;
          }
        if(i==1)
           inp.value=order["date_time"]
        if(i==2)
           inp.value=order["price"]
           if(i<=2)
           { 
           elem.appendChild(inp);
           line.appendChild(elem);
           }
        if(i==3)
          {   
  
          var productList=order["product_order_list"];
          console.log("prod-order:",productList);
           if(productList)
        for(let productOrder of productList)
      {
         console.log("orders:",productOrder)
           local_number_product++;
           var elem1=document.createElement("td");
           var inp1=document.createElement("input");
        
           inp1.value = productOrder["product"]["id_product"];
           
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
     prodId.style.color="yellow";
     header.appendChild(prodId);
  
     var prodName=document.createElement("th");
     prodName.textContent="Product Name";
     prodName.style.color="yellow";
     header.appendChild(prodName);
    
     var prodAmount=document.createElement("th");
     prodAmount.textContent="Product amount";
     prodAmount.style.color="yellow";
     header.appendChild(prodAmount);
    
  
   }
  
  
  
  
  
  
  
  
  }
  }

deleteFromWishList()
{
  var element;

if(this.Clicked_wish)
 element=document.getElementById(this.Clicked_wish);
 if( element)
 {

  var parent=element.parentElement;
  if(parent)
{
  parent.removeChild(element);

}

 }


}
filterOrder()
{



}

print_Recomandations()
{



}

private IndexToFilter=0;
private URLF={
  "0":"findByUserName?user=",
  "1":"findByUsername?user=",
  "2":"Date?date=",
  "3":"findByPrice?price=",
  "4":"findByPriceThatAreExpensive?price=",
  "5":"findByPriceThatAreCheaper?price=",
  "6":"findByAmount?amount=",
  "7":"findByAmountThatAreLess?amount=",
  "8":"findByAmountThatAreMore?amount=",
  "9":"findByProductId?id=",


}

backToAllOrders()
{
  var stringBase="http://localhost:8000/api/order/";
  this.http.get(stringBase).subscribe(data=>{
    
  
    this.orders = [];
    var orders1:any = data;
    let order: any;

    for (order of orders1)
   {
  
 if(order.user.id_user==this.user.id_user)
 this.orders.push(order);

     }



    this.printOrders();
    var btn=document.getElementById("orderquery")
    if(btn)
   btn.style.display="none";
  });


}
toAllOrders()
{ var btn=document.getElementById( "orderquery" )
if(btn)
btn.style.display="block";
  
}

toOrderTime(){this.IndexToFilter=2;this.toAllOrders();
  var obj = document.getElementById("filterButton2");
  if (obj) {
    obj.style.width = "100px";
    obj.innerText = "Date";

}

}
toOrderUsername(){this.IndexToFilter=1;this.toAllOrders();
  var obj = document.getElementById("filterButton2");
  if (obj) {
    obj.style.width = "100px";
    obj.innerText = "Username";

}


}
toOrderUserName(){this.IndexToFilter=0;this.toAllOrders();
  var obj = document.getElementById("filterButton2");
  if (obj) {
    obj.style.width = "100px";
    obj.innerText = "User Name";

}

}
toOrderPrice(){this.IndexToFilter=3;this.toAllOrders();
  var obj = document.getElementById("filterButton2");
  if (obj) {
    obj.style.width = "100px";
    obj.innerText = "Total Price";

}

}
toOrderPrice2(){this.IndexToFilter=4;this.toAllOrders();
  var obj = document.getElementById("filterButton2");
  if (obj) {
    obj.style.width = "100px";
    obj.innerText = "Total < Price";

}

}
toOrderPrice3(){this.IndexToFilter=5;this.toAllOrders();
  var obj = document.getElementById("filterButton2");
  if (obj) {
    obj.style.width = "100px";
    obj.innerText = "Total > Price";

}
}
toOrderProduct(){this.IndexToFilter=9;this.toAllOrders();
  var obj = document.getElementById("filterButton2");
  if (obj) {
    obj.style.width = "100px";
    obj.innerText = "By Product Id";

}

}
toOrderAmount(){this.IndexToFilter=6;this.toAllOrders();
  var obj = document.getElementById("filterButton2");
  if (obj) {
    obj.style.width = "100px";
    obj.innerText = "By Amount";

}

}



toOrderAmount2(){this.IndexToFilter=7;this.toAllOrders();
  var obj = document.getElementById("filterButton2");
  if (obj) {
    obj.style.width = "100px";
    obj.innerText = "Less than Amount";

}

}
toOrderAmount3(){this.IndexToFilter=8;this.toAllOrders();
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
  var stringBase="http://localhost:8000/api/order/";
  var queryField=<HTMLInputElement>document.getElementById("orderquery");
  if(queryField)
   query=queryField.value;

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
     case 8: extra=this.URLF["8"];
     break;
     case 9: extra=this.URLF["9"];
     break;
    }

    this.http.get(stringBase+extra+query).subscribe(data=>{
    
  
      this.orders = [];
      var orders1:any = data;
      let order: any;

      for (order of orders1)
     {
    
   if(order.user.id_user==this.user.id_user)
   this.orders.push(order);

    }



      this.printOrders();
      var btn=document.getElementById("orderquery")
      if(btn)
     btn.style.display="none";
    }
      
      );


}
}