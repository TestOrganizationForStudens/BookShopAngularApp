import { Component,OnInit } from '@angular/core';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { sha256, sha224 } from 'js-sha256';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private http:HttpClient,private route:Router) { }
   readonly URL='http://localhost:8080/api/user/';

  loginMethod(Item:any)
{
   //console.log(Item["Password"]);
   let hashPass=sha256(Item["Password"]);
   console.log(hashPass);

 
 this.http.get<any>(this.URL).subscribe(data=>{
 let users=data;
 let existsHere=false;
 let existsHere2=false;
 console.log(data);
 for(let user of users){

  if( user["email"]===Item["Username"])
       existsHere=true;
 }
  if(existsHere)
  {
    for(let user of users){

      if( user["password"]===Item["Password"])
           existsHere2=true;
     }


  }
  else
   alert("emailul nu exista");

  if(existsHere2)
   this.route.navigate(['']);
   else
   alert("passwordul nu e corect");

 });

  

  // this.route.navigate(['']);

 //this.http.post(this.URL);
}
facebookLogIn()
{
  
  return new Promise<fb.StatusResponse>(resolve => FB.login(resolve));

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
