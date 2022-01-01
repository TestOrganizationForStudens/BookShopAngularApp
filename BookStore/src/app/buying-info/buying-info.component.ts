import { Component, OnInit } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-buying-info',
  templateUrl: './buying-info.component.html',
  styleUrls: ['./buying-info.component.css']
})
export class BuyingInfoComponent implements OnInit {
  user: User; 
  constructor() {

    this.user={
      id: 0, firstName: "", lastName: "", userName: "",
      email: "", address: "", phone: "", cardNumber: "",
      password: "", userRole: null, listOfOrder: null}
   }

  ngOnInit(): void {

  }
  buyMethod()
  {


  }
}
