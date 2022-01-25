import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';
import { Role } from './role';
import { RequestAuthentication } from './RequestAuthentication';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  readonly urlBase='http://localhost:8000';
  readonly apiUserServiceUrl= this.urlBase+"/api/user";
 // private LogedInUser:User;
  constructor(private http: HttpClient) { 



  }

  public getUsers():Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUserServiceUrl}/all`, {
      headers: {
        Authorization: 'Bearer '+this.getToken()
      }
    });
  }

  public addUsers(user: User, role: Role):Observable<User> {
    return this.http.post<User>(`${this.apiUserServiceUrl}/add`, user);
  }


  public addAdmin(user: User, role: Role):Observable<User> {
    return this.http.post<User>(`${this.apiUserServiceUrl}/addadmin`, user);
  }
  public authentificationUser(requestAuthentication:RequestAuthentication): Observable<any>{
   return this.http.post(`${this.apiUserServiceUrl}/login`, requestAuthentication);
  }

  public logOut(): void{
    localStorage.removeItem("token");
    sessionStorage.removeItem("user");
    this.http.get<any>("http://localhost:8080/logout");
  }

  public findUserById(id: number):Observable<User> {
    return this.http.get<User>(`${this.apiUserServiceUrl}/${id}`,  
    { headers: {
      Authorization: 'Bearer '+this.getToken()
    }});
  }

  public findUserByUserName(userName: string):Observable<User> {
    return this.http.get<User>(`${this.apiUserServiceUrl}/findUserByUserName?userName=${userName}`, {
      headers: {
        Authorization: 'Bearer '+this.getToken()
      }
    });
  }

  public getToken(){
    return localStorage.getItem('token');
  }
}

