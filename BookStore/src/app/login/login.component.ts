import { Component,OnInit } from '@angular/core';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { sha256, sha224 } from 'js-sha256';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { RequestAuthentication } from '../RequestAuthentication';
import { Input } from '@angular/core';
import { WishListService } from '../wish-list.service';
import { User } from '../user';
import ConfettiGenerator from 'src/assets/confetti-js-master/src/confetti';
//declare var ConfettiGenerator:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
  
})
export class LoginComponent implements OnInit {


  ngOnInit() {

  }
  


  readonly URL='http://localhost:8080/api/user/';
  requestAuthentication: RequestAuthentication;
 @Input() errorString: string="";
 private user: User;
  constructor(private wishHelp:WishListService,private http:HttpClient,private userService: UsersService ,private router:Router) {
    this.user = {
      id: 0, firstName: "", lastName: "", userName: "",
      email: "", address: "", phone: "", cardNumber: "",
      password: "", userRole: null, listOfOrder: null
    }
  this.requestAuthentication={
        userName:"", password:""};

   }
  
   
  loginMethod()
{
  let auxReqAuth: RequestAuthentication={userName:"", password:""};
  auxReqAuth.userName=this.requestAuthentication.userName;
  auxReqAuth.password=this.requestAuthentication.password;
  this.resetRequestAuthentication();
  auxReqAuth.password=sha256(auxReqAuth.password);
  
  this.userService.authentificationUser(auxReqAuth).subscribe(resp=>{
    localStorage.setItem("token", resp.jwt);
    console.log("jwt:",resp.jwt);
    this.getUser(auxReqAuth.userName);
    alert("Logare Reusita");
    this.make_confetti();
  // this.wishHelp.wish=[];
    //this.router.navigate(["/home"]).then(() => {
   //  window.location.reload();});

    }, err=>{
    this.errorString=err.error;
    console.log(err);
  });


  

  // this.route.navigate(['']);

 //this.http.post(this.URL);
}
facebookLogIn()
{
FB.getLoginStatus(response=>{
if(response.status==='connected')
{
FB.api("/me?fields=name,id,email",function(response){
  
  let obj:any=response;
  console.log(obj["name"])})


}
else
FB.login( response=>console.log(response));

});


}



 getUser(userName: string){
  this.userService.findUserByUserName(userName).subscribe(
    resp=>{

      sessionStorage.setItem("user", JSON.stringify(resp));
          console.log(JSON.stringify(resp),"session:",sessionStorage);
    },
      err=>console.log(err)
  );
}
 resetRequestAuthentication(){
  this.requestAuthentication={
    userName:"", password:""}
}

make_confetti(){
  console.log("confetti")
  var canvas=document.createElement("canvas");
  var h1=document.createElement("h1");
  h1.innerText="Thank you for logging in!";

  canvas.id="my-canvas";
  var conf=document.getElementById("confetti");
 
 if(conf)
 {
   console.log("here");
  conf.appendChild(canvas);
  var confettiSettings = { target:canvas 
             ,  width:500,height:100};
  var confeti=ConfettiGenerator(confettiSettings);
  confeti.render();
  conf.appendChild(h1);

 }



}

}


