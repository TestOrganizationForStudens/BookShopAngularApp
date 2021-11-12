import { Component,OnInit } from '@angular/core';
import { HttpClientModule,HttpClient } from '@angular/common/http';

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
 console.warn(Item);
 this.http.post(this.URL,Item);
}



  ngOnInit(): void {
  }
}
