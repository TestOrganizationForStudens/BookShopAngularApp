import { Component, OnInit } from '@angular/core';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {
  constructor(private http:HttpClient) { }
   readonly URL='Access-Control-Allow-Origin: http://localhost:8080/api/product/';
   readonly URL2='https://jsonplaceholder.typicode.com/posts';
 products:any;
 

changeImg()
{
 (document.getElementById("mainimg") as HTMLImageElement).src="assets/Sales.jpg";



}
changeImg2()
{
 (document.getElementById("mainimg") as HTMLImageElement).src="assets/download.jpg";
 


}




  searchengine(Item:any)
{


console.warn(Item);
//this.http.post(this.URL,Item);
this.products=this.http.get(this.URL);
console.warn(this.products);

}

  title = 'Pizza2';
}
