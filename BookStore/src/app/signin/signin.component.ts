import { Component, OnInit } from '@angular/core';
import { HttpClientModule ,HttpClient} from '@angular/common/http';
import { sha256, sha224 } from 'js-sha256';
import { Router } from '@angular/router';
import { User } from '../user';
import { Role } from '../role';
import { UsersService } from '../users.service';
import { Input } from '@angular/core';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  user: User; 
  role: Role;
 @Input() errorString: string="";
  readonly URL='http://localhost:8000/api/user';
  constructor(private http:HttpClient,private route:Router,private userService: UsersService) { 
    this.user={
      id: 0, firstName: "", lastName: "", userName: "",
      email: "", address: "", phone: "", cardNumber: "",
      password: "", userRole: null, listOfOrder: null}
    
      this.role={
        id:0, role: "ROLE_USER", userRoles: null}
    }

    
  
  signInMethod()
  {
    this.user.password=sha256(this.user.password);
    this.userService.addUsers(this.user, this.role).subscribe(
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
