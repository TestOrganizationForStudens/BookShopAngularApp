import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-personal-acount',
  templateUrl: './personal-acount.component.html',
  styleUrls: ['./personal-acount.component.css']
})
export class PersonalAcountComponent implements OnInit {
   private id:number;
  constructor(private router:Router,private _Activatedroute:ActivatedRoute) { 
    this.id=0;
    this._Activatedroute.paramMap.subscribe(params => { 
               var id1=params.get('id'); 
      if(id1)
   {
    this.id=parseInt(id1);

   } 

  });

  }



  ngOnInit(): void {



  }

  goToUser()
  {

    this.router.navigate(["/user/"+this.id]);

  }
  goToAdmin()
  {

    this.router.navigate(["/admin/"+this.id]);


  }



  

}
