import { Component, OnInit } from '@angular/core';
import { HttpClientModule ,HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private http:HttpClient) { 


    
  }

 readonly URL='http://localhost:8080/';

  signInMethod(Item:any)
  {
    console.warn(Item.lname);
    this.http.post(this.URL,Item);
  
  }
  ngOnInit(): void {
  }

}
