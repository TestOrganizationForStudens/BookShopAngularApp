import { Component,OnInit } from '@angular/core';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { sha256, sha224 } from 'js-sha256';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { RequestAuthentication } from '../RequestAuthentication';
import { Input } from '@angular/core';
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

  constructor(private http:HttpClient,private userService: UsersService ,private router:Router) {

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
    console.log(resp.jwt);
    this.getUser(auxReqAuth.userName);
    this.router.navigate(["/"]).then(() => {
      window.location.reload();
    });
    }, err=>{
    this.errorString=err.error;
    console.log(err);
  });


  

  // this.route.navigate(['']);

 //this.http.post(this.URL);
}
facebookLogIn()
{
  
  return new Promise<fb.StatusResponse>(resolve => FB.login(resolve));

}



 getUser(userName: string){
  this.userService.findUserByUserName(userName).subscribe(
    resp=>{
      sessionStorage.setItem("user", JSON.stringify(resp));
    },
      err=>console.log(err)
  );
}
 resetRequestAuthentication(){
  this.requestAuthentication={
    userName:"", password:""}
}




}
