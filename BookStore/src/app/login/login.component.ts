import { Component,OnInit } from '@angular/core';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { sha256, sha224 } from 'js-sha256';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private http:HttpClient) { }
   readonly URL='http://localhost:8080/';

  loginMethod(Item:any)
{
   console.log(Item["Password"]);
   let hashPass=sha256(Item["Password"]);
   console.log(hashPass);




 //this.http.post(this.URL);
}
facebookLogIn()
{

console.log("facebbok");
var script = document.createElement('script');
script.src="https://connect.facebook.net/ro_RO/sdk.js#xfbml=1&version=v12.0&appId=3220700794679869&autoLogAppEvents=1" ;
script.crossOrigin='anonymous';
script.async=true;
script.defer=true;
script.nonce="ZzlS31zN";
document.body.append(script);
//script.textContent=" FB.login(function(response){});";

script.onload=function() {
   
 
    alert("hello ba");


};






}
twitterLogIn(){

  console.log("twitter");

}

GmailLogIn()
{

  console.log("gmail");

}





  ngOnInit(): void {
  }
}
