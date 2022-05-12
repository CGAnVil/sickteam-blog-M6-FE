import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../model/user';
import {JwtRespone} from '../../model/jwt-respone';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) { }

  findAllPost(): Observable<User[]> {
    return this.httpClient.get<User[]>('http://localhost:8080/user/post/users');
  }
  findUserByFullName(fullName: string): Observable<User> {
    return this.httpClient.get<User>(`http://localhost:8080/user/post/users/${fullName}`);
  }

  changeProfile(user: any): Observable<JwtRespone> {
    return this.httpClient.put<JwtRespone>(`http://localhost:8080/api/auth/changeProfile`, user);
  }
  changePassword(user: any): Observable<JwtRespone>{
    return this.httpClient.put<JwtRespone>(`http://localhost:8080/api/auth/changePassword`, user);
  }
  changeAvatar(user: any): Observable<JwtRespone> {
    return this.httpClient.put<JwtRespone>(`http://localhost:8080/api/auth/changeAvatar`, user);
  }
}
