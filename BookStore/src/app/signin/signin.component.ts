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
   

    var newPas=sha256(Item["newPassword"]);
    var newPasCheck=sha256(Item["checkPassword"]);
    Item["newPassword"]=newPas;
    Item["checkPassword"]=newPasCheck;
    console.log(Item);

    this.http.post(this.URL,Item);
    alert("submit reusit");
    this.route.navigate(['login']);
  
  }
  ngOnInit(): void {
  }

}
