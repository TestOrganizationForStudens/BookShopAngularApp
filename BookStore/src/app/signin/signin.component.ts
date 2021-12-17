import { Component, OnInit } from '@angular/core';
import { HttpClientModule ,HttpClient} from '@angular/common/http';
import { sha256, sha224 } from 'js-sha256';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private http:HttpClient,private route:Router) { 


    
  }

 readonly URL='http://localhost:8080/api/user';

  signInMethod(Item:any)
  {
   
/*

    var newPas=sha256(Item["password"]);
    var newPasCheck=sha256(Item["checkPassword"]);
    Item["password"]=newPas;
    Item["checkPassword"]=newPasCheck;
  if( Item["firstName"]==='' || Item["lastname"]==='' ||
  Item["email"]==='' || Item["address"]==='' || 
  Item["phone"]==='' || Item["cardNumber"]==='' || 
  Item["password"]==='' || Item["checkPassword"]==='' )
  alert("submit esuat campuri goale");
   else
   */
 //if(newPas=== newPasCheck)
{



    console.log(Item);


  var sendObject={ password: Item["newPassword"],firstName:Item["firstName"],       
  lastName:Item["lastName"], email: Item["email"],address:Item["address"],
  phone:Item["phone"],cardNumber: Item["cardNumber"],role: Item["role"],
  userName:Item["userName"]};


  var sendObject1={ password: "newPassword",firstName:"firstName",       
  lastName:"lastName", email: "email@hmail.com",address:"address",
  phone:"077448992",cardNumber:"1234567890123456",role: "User",
  userName:"userName"};






    try{this.http.post(this.URL,sendObject1).subscribe(data =>console.log("raspunsul este ",data) );
   }catch(err)
   {
    alert(err);
    //this.route.navigate(['sigin']);
   }


    alert("submit reusit");

   // this.route.navigate(['login']);
  
  }
 // else
  //alert("submit esuat parolele nu se potrivesc");
}
  ngOnInit(): void {
  }

}
