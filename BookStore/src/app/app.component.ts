import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  template:  
  ` <router-outlet></router-outlet>
  `,

  styles: []
})
export class AppComponent {
  readonly ROOT_URL='';

constructor(private http:HttpClientModule){




  
}
  title = 'app';
}
