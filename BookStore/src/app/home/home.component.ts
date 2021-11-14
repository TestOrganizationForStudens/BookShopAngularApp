import { Component, OnInit } from '@angular/core';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit{
  constructor(private http:HttpClient) { }
   readonly URL='Access-Control-Allow-Origin:http://localhost:8080/api/test/';
   readonly URL2='https://jsonplaceholder.typicode.com/posts';
 products:any;
 books:any;
  
 doImages()
  {

   
    this.http.get<[]>("assets/books/more_books/books.json").subscribe(data =>{
     
    this.books=data;
    //let  books=JSON.parse(data);
    //console.log(this.books);

    var workDiv=document.getElementById("productSpace");
    var sheet = document.createElement('style');
    sheet.innerHTML ="#productSpace{margin:auto}  #productSpace img {display: inline; vertical-align: middle;padding-right: 20px;padding-bottom: 20px;}";
    document.body.appendChild(sheet);

    let messageForProdcuts=document.createElement("p");
    messageForProdcuts.textContent="Here are some of the most bought items";
    if(workDiv!=null)
    workDiv.appendChild(messageForProdcuts);


   let links=["https://en.wikipedia.org/wiki/John_Boyne",
              "https://www.youtube.com/watch?v=s7L2PVdrb_8",
              "https://ro.wikipedia.org/wiki/Literatur%C4%83",
              "https://ro.wikipedia.org/wiki/Literatur%C4%83",
              "https://ro.wikipedia.org/wiki/Literatur%C4%83",
              "https://ro.wikipedia.org/wiki/Literatur%C4%83",
              "https://ro.wikipedia.org/wiki/Literatur%C4%83",
            ];
   let sources=[
   "data:image/jpeg;base64,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",
   "assets/books/got.jpg",
   "assets/books/images.jpg",
   "assets/books/images1.jpg",
   "assets/books/images2.jpg",
   "assets/books/images3.jpg",
   "assets/books/Ove.jpg",
   ];
    for(let book of this.books )
    {
     links.push(book["link"]);
     sources.push(book["imageLink"]);

    }



   for(var i = 0; i < sources.length; i++)
{

    let image=document.createElement("img");
     image.setAttribute("src",sources[i]);
     image.setAttribute('height', '100px');
     image.setAttribute('width', '100px');
     

     if(i<links.length)
     {
       let link=document.createElement("a");
       link.setAttribute("href",links[i]);
  
    
     if(workDiv!=null)
     {
       link.appendChild(image);
       workDiv.appendChild(link);
    
     }
    }
     else
     {
      if(workDiv!=null)
      {
      workDiv.appendChild(image);
      }

     }



     if((i+1)%10==0)
     {
     var br = document.createElement("br");
     if(workDiv!=null)
     workDiv.appendChild(br);
     }
    

    }


   let someArray = [1, "string", false];
 for (let entry of someArray)
 console.log(entry);
   });



 }

 getRandomImage()
 {
 console.log(this.books.length);
 console.warn("I am feeling lucky");
 let index=Math.floor(Math.random() * (100)) + 1;

console.warn(this.books[index]["imageLink"]);
var image=document.getElementById("luckyone");
var link=document.getElementById("linkTolucky");



if(image && link)
{
image.setAttribute("src",this.books[index]["imageLink"]);
image.setAttribute('height', '200px');
image.setAttribute('width', '120px');
link.setAttribute("href",this.books[index]["link"]);
}


 }

 ngOnInit()
 {

  this.doImages();


 }
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

let obj=this.http.get<any>( this.URL).subscribe();





}





  title = 'Pizza2';
}

