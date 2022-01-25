import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { sha256 } from 'js-sha256';
import { Role } from '../role';
import { User } from '../user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-sign-in-admin',
  templateUrl: './sign-in-admin.component.html',
  styleUrls: ['./sign-in-admin.component.css']
})
export class SignInAdminComponent implements OnInit {
  user: User; 
  role: Role;
 @Input() errorString: string="";
  readonly URL='http://localhost:8080/api/user';
  constructor(private http:HttpClient,private route:Router,private userService: UsersService) { 
    this.user={
      id: 0, firstName: "", lastName: "", userName: "",
      email: "", address: "", phone: "", cardNumber: "",
      password: "", userRole: null, listOfOrder: null}
    
      this.role={
        id:0, role: "ROLE_ADMIN", userRoles:null}
    }

    
  
  signInMethod()
  {
    this.user.password=sha256(this.user.password);
    this.userService.addAdmin(this.user, this.role).subscribe(
      resp=>console.log(resp),
      err=>{
        this.errorString=err.error
        console.log(err)
      }
    );
}
  ngOnInit(): void {
  }

}



