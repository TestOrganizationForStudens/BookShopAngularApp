import { Component, OnInit } from '@angular/core';
import { HttpClientModule ,HttpClient} from '@angular/common/http';
import { sha256, sha224 } from 'js-sha256';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private http:HttpClient) { 


    
  }

 readonly URL='http://localhost:8080/api/user';

  signInMethod(Item:any)
  {
    console.warn(Item.lname);

    var newPas=sha256(Item["newPassword"]);
    var newPasCheck=sha256(Item["checkPassword"]);
    Item["newPassword"]=newPas;
    Item["checkPassword"]=newPasCheck;

    this.http.post(this.URL,Item);
  
  }
  ngOnInit(): void {
  }

}
