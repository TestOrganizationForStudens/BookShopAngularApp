import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isJSDocLinkLike, updateSpreadAssignment } from 'typescript';
import { Order } from '../Order';
import { Product } from '../product';
import { ProductSiteComponent } from '../product-site/product-site.component';
import { User } from '../user';
import { UsersService } from '../users.service';

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
  constructor(private userService:UsersService,private _Activatedroute: ActivatedRoute, private router: Router, private http: HttpClient) { }

  private user1: any;
  private orders: any = [];
  //lists of products
  private wishList: any;
  private recomandings: any;
  private id: any;



  ngOnInit(): void {
    this.printPerosnalInfo();
    this.makeDemoWishList();


  }
  printPerosnalInfo() {
    this._Activatedroute.paramMap.subscribe(params => {
      this.id = params.get('id');

      if (this.id)
        this.http.get<[]>(this.URL2 + this.id).subscribe(data => {


          let user: User;
          this.user1 = data;

          user = this.user1;
          console.log(user);



          this.http.get<[]>(this.URL4 + user).subscribe(data => {
            this.orders = [];
            this.orders = data;
            let order: Order;
            for (order of this.orders) {
              this.orders.push(order);

            }
            this.printOrders();
          });

          var id = document.getElementById("id");
          var first = document.getElementById("prenume");
          var last = document.getElementById("nume");
          var username = document.getElementById("username");
          var email = document.getElementById("email");
          var address = document.getElementById("adresa");
          var phone = document.getElementById("telefon");
          var card = document.getElementById("card");

          if (user) {
            if (id)
              id.textContent = id.textContent + " " + user["id"].toString();

            if (first)
              first.textContent = first.textContent + " " + user["firstName"].toString();

            if (last)
              last.textContent = last.textContent + " " + user["lastName"].toString();
            if (username)
              username.textContent = username.textContent + " " + user["userName"].toString();
            if (email)
              email.textContent = email.textContent + " " + user["email"].toString();
            if (address)
              address.textContent = address.textContent + " " + user["address"];
            if (phone)
              phone.textContent = phone.textContent + " " + user["phone"].toString();
            if (card)
              card.textContent = card.textContent + " " + user["cardNumber"].toString();
          }
        });
    });


  }

  makeDemoWishList()
{
   this.http.get<[]>(this.URL).subscribe(data=>{

            var prods=data;
            this.wishList=[];
              var i=0;
            for(let prod of prods)
         {    
           i++;
                if(i%10==0)
            this.wishList.push(prod);

         }

        this. printWishList();

   });


}



   printWishList()
  {       console.log("wish a better life");
      let prod:Product;

      var wishdiv= document.getElementById("wish");

      if(this.wishList)

    for(prod of this.wishList)
   {            
         if(wishdiv)
           {

                         var link=document.createElement("input");
                         link.value="/product/"+prod.id;
                         link.id="img"+prod.id;
                         link.addEventListener("clcik",this.findImage.bind(this));
                         link.addEventListener("dbclick",this.passToProduct.bind(this));
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
    {
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



}

}