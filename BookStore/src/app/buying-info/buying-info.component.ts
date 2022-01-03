import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-buying-info',
  templateUrl: './buying-info.component.html',
  styleUrls: ['./buying-info.component.css']
})
export class BuyingInfoComponent implements OnInit {
  user: User; 
  constructor(private router: Router) {

    this.user={
      id: 0, firstName: "", lastName: "", userName: "",
      email: "", address: "", phone: "", cardNumber: "",
      password: "", userRole: null, listOfOrder: null}
   }

  ngOnInit(): void {

  }
  buyMethod()
  { alert.bind("comanda finalizata");
    this.router.navigate(["/"]) ;

  }
}
