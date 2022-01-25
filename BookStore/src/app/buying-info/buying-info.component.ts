import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BuyingCartService } from '../buying-cart.service';
import { Order } from '../Order';
import { User } from '../user';
import {ProductOrder} from '../productOrder'
import { HttpClient } from '@angular/common/http';
import { User2 } from '../user2';
import { Order2 } from '../order2';

@Component({
  selector: 'app-buying-info',
  templateUrl: './buying-info.component.html',
  styleUrls: ['./buying-info.component.css']
})
export class BuyingInfoComponent implements OnInit {
  user: any; 
  user2:User2;
  order:Order;
  url1='http://localhost:8000/api/order/add';
  constructor(private http:HttpClient,private cart:BuyingCartService, private router: Router) {
  
    this.user={
      id: 0, firstName: "", lastName: "", userName: "",
      email: "", address: "", phone: "", cardNumber: "",
      password: "", userRole: null, listOfOrder: null}

      this.user2={firstName: "", lastName: "", userName: "",
      email: "", address: "", phone: "", cardNumber: "",
      password: "", userRole: null, listOfOrder: null}


      this.order={
        id:0,
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
    this.printPerosnalInfo();

  }

  printPerosnalInfo()
  {
      
  
          
           console.log("buyer:",this.user);
           if(this.user){
          
        
          
            var first=<HTMLInputElement>document.getElementById("firstName");
            var last=<HTMLInputElement>document.getElementById("lastName");
  
            var username=<HTMLInputElement>document.getElementById("userName");
            var email=<HTMLInputElement>document.getElementById("email");
            var address=<HTMLInputElement>document.getElementById("address");
            var phone=<HTMLInputElement>document.getElementById("phone");
            var card=<HTMLInputElement>document.getElementById("cardNumber");
           
        if(this.user)
      {
         console.log(" here user:",this.user);
       

         if (first)
         {
          console.log("first:",this.user["first_name"]);
         first.value  = this.user["first_name"];
         
  
         }
        
  
         if (last)
         {
           last.value  =  this.user["last_name"];
      
  
         }
          
         if (username)
         {
           username.value  = this.user["user_name"].toString();
         
  
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
           card.value  = this.user["card_number"].toString();
       
         }
  
     }
  }
  }





  buyMethod()
  {    
      let productOrderList1:ProductOrder[]=[];
           var date:Date=new Date;

      var order2:Order2={
        dateTime: date,
        price: this.cart.totalPrice(),
        productOrderList:[]};  
      
       for(let prodW of this.cart.products)
    {
    

       var prod:ProductOrder= {
        order:  order2,
        product:prodW.product ,
        amount: prodW.quantity,
        }
        
        productOrderList1.push(prod);
      }
  
     // order2["productOrderList"]= productOrderList1;
       console.log(productOrderList1);

       this.user={id:this.user["id_user"],firstName: this.user["first_name"], 
       lastName: this.user["last_name"], userName:this.user["user_name"],
       email:this.user["email"] , address: this.user["adress"], phone: this.user["phone"], cardNumber: this.user["card_number"],
       password: this.user[""], userRole:  this.user["userRole"], listOfOrder: null}

       var order4={
        dateTime: date,
        userData: this.user,
        price: this.cart.totalPrice(),
        productOrderList:productOrderList1 };  


       //this.cart.products=[];


     this.http.post(this.url1,order4).subscribe(  
       resp=>{console.log(resp),
         alert("Order was accepted, thank you for your purchase");
         this.router.navigate(["/home"]);
         this.cart.products=[];
         ;},
      err=>{
       alert(err);
       console.log(err);
     } );
 



    

  }
}
