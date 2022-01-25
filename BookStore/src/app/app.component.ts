import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template:  
  ` <router-outlet></router-outlet>
  `,

  styles: []
})
export class AppComponent implements OnInit{
  readonly ROOT_URL='';

constructor(private http:HttpClientModule,private router:Router){
 this.router.navigate(["/home"]);


  
}
ngOnInit(): void {
  this.router.navigate(["/home"]);

}



  title = 'app';
}
