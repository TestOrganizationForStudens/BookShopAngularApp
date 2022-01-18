import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BuyingCartService } from '../buying-cart.service';
import { Order } from '../Order';
import { User } from '../user';
import {ProductOrder} from '../productOrder'

@Component({
  selector: 'app-buying-info',
  templateUrl: './buying-info.component.html',
  styleUrls: ['./buying-info.component.css']
})
export class BuyingInfoComponent implements OnInit {
  user: User; 
  order:Order;
  constructor(private cart:BuyingCartService, private router: Router) {

    this.user={
      id: 0, firstName: "", lastName: "", userName: "",
      email: "", address: "", phone: "", cardNumber: "",
      password: "", userRole: null, listOfOrder: null}

      this.order={id:0,
        dateTime: new Date,
        userData: this.user,
        price: this.cart.totalPrice(),
        productOrderList: []};



   }
  private readUserData(): void {
      let user = sessionStorage.getItem("user");
      if (user) {
        this.user=JSON.parse(user);

      }
    }


 
  ngOnInit(): void {

    this.readUserData();

  }

  printPerosnalInfo()
  {
      
  
          
           console.log("buyer:",this.user);
           if(this.user){
          
        
          
            var first=<HTMLInputElement>document.getElementById("firstname");
            var last=<HTMLInputElement>document.getElementById("lastName");
  
            var username=<HTMLInputElement>document.getElementById("username");
            var email=<HTMLInputElement>document.getElementById("email");
            var address=<HTMLInputElement>document.getElementById("address");
            var phone=<HTMLInputElement>document.getElementById("phone");
            var card=<HTMLInputElement>document.getElementById("cardNumber");
           
        if(this.user)
      {
         console.log(" here user:",this.user);
       

         if (first)
         {
       
         first.value  = this.user["firstName"].toString();
         
  
         }
        
  
         if (last)
         {
           last.value  =  this.user["lastName"].toString();
      
  
         }
          
         if (username)
         {
           username.value  = this.user["userName"].toString();
         
  
         }
       
         if (email)
         {
           email.value  = this.user["email"].toString();
        
  
         }
      
         if (address)
         {
  
           address.value =  this.user["address"];
   
         }
         
         if (phone)
       {
         phone.value  =  this.user["phone"].toString();
       
  
       }
         
         if (card)
         {
           card.value  = this.user["cardNumber"].toString();
       
         }
  
     }
  }
  }





  buyMethod()
  {    
      let productOrderList1:ProductOrder[]=[];


       for(let prodW of this.cart.products)
    {

       var prod:ProductOrder= {
        id: 0,
        order:  this.order,
        product:prodW.product ,
        amount: prodW.quantity,
        }
        
        productOrderList1.push(prod);
        
  
    }
   
    this.order={id:0,
      dateTime: new Date,
      userData: this.user,
      price: this.cart.totalPrice(),
      productOrderList:productOrderList1 };

 



    this.cart.products=[];
    alert.bind("comanda finalizata");
    this.router.navigate(["/"]) ;

  }
}
