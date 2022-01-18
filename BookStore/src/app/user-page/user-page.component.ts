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
  readonly URL = 'http://localhost:8080/api/product/all';
  readonly URL2 = 'http://localhost:8080/api/user/';
  readonly URL3 = 'http://localhost:8080/api/order/';
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
            let order: Order;

            for (order of orders1)
           {
         if(order.userData.id==this.user.id)
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

              id.value =  this.user["id"].toString();
              id.readOnly=true;

            }
            

            if (first)
            {
          
            first.value  = this.user["firstName"].toString();
            first.readOnly=true;

            }
           

            if (last)
            {
              last.value  =  this.user["lastName"].toString();
              last.readOnly=true;

            }
             
            if (username)
            {
              username.value  = this.user["userName"].toString();
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
              card.value  = this.user["cardNumber"].toString();
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
            this.WishHelper.addProduct(prod);

         }

        this. printWishList();

   });


}



   printWishList()
  {       console.log("wish a better life");
      let prod:Product;

      var wishdiv= document.getElementById("wish");

      if(this.WishHelper.wish)

    for(prod of this.WishHelper.wish)
   {            
         if(wishdiv)
           {

                         var link=document.createElement("input");
                         link.value="/product/"+prod.id;
                         link.id="img"+prod.id;
                         link.addEventListener("click",this.findImage.bind(this));
                         link.addEventListener("dblclick",this.passToProduct.bind(this));
                         link.setAttribute("type","image");
                         link.setAttribute("src",prod.image);
                         link.setAttribute('height', '100px');
                         link.setAttribute('width', '100px');
                         link.setAttribute('width', '100px');
                         link.setAttribute( "vertical-align","middle");
                         link.setAttribute( "padding-right","20px");
                         link.setAttribute( "padding-bottom","20px");
                         wishdiv.appendChild(link);





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



  printOrders() {
    var tableToUpdate = document.getElementById("orderTable");
    var header = document.getElementById("orderTitle");
    if (tableToUpdate)
    {



    
      for (let order of this.orders) {

        var line = document.createElement("tr");
        for (let i = 0; i < 4; i++) {

          var elem = document.createElement("td");
          var inp = document.createElement("input");

          if (i == 0)
            inp.value = order["order"]["id"].toString();
          if (i == 1)
            inp.value = order["order"]["dateTime"].toString();
          if (i == 2)
            inp.value = order["order"]["price"];

          if (i <= 2) {
            elem.appendChild(inp);
            line.appendChild(elem);
          }
          if (i == 3) {

            var productList = this.orders["order"]["productOrderList"];
            if (productList)
              for (let productOrder of productList) {

                var elem1 = document.createElement("td");
                var inp1 = document.createElement("input");
                inp1.value = productOrder["product"]["id"];
                elem1.appendChild(inp1);
                line.appendChild(elem1);

                var elem2 = document.createElement("td");
                var inp2 = document.createElement("input");
                inp2.value = productOrder["product"]["productName"];
                elem2.appendChild(inp2);
                line.appendChild(elem2);


                var elem3 = document.createElement("td");
                var inp3 = document.createElement("input");
                inp3.value = productOrder["amount"];
                elem3.appendChild(inp3);
                line.appendChild(elem3);

                if (header) {
                  var prodId = document.createElement("th");
                  prodId.textContent = "Product Id";

                  header.appendChild(prodId);

                  var prodName = document.createElement("th");
                  prodName.textContent = "Product Name";

                  header.appendChild(prodName);

                  var prodAmount = document.createElement("th");
                  prodAmount.textContent = "Product amount";
                  header.appendChild(prodAmount);


                }
              }

          }





        }

        tableToUpdate.appendChild(line);
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

}