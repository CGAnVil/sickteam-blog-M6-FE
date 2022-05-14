import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../model/user';
import {JwtRespone} from '../../model/jwt-respone';
import {Post} from "../../model/Post";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) { }

  findAllUser(): Observable<User[]> {
    return this.httpClient.get<User[]>('http://localhost:8080/users');
  }

  findUserById(idUser: any): Observable<User> {
    return this.httpClient.get<User>(`http://localhost:8080/users/${idUser}`);
  }

  // changeProfile(user: any): Observable<JwtRespone> {
  //   return this.httpClient.put<JwtRespone>(`http://localhost:8080/api/auth/changeProfile`, user);
  // }
  // changePassword(user: any): Observable<JwtRespone> {
  //   return this.httpClient.put<JwtRespone>(`http://localhost:8080/api/auth/changePassword`, user);
  // }
  // changeAvatar(user: any): Observable<JwtRespone> {
  //   return this.httpClient.put<JwtRespone>(`http://localhost:8080/api/auth/changeAvatar`, user);
  // }
}
