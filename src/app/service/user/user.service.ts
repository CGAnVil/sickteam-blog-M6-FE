import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../model/user';
import {JwtRespone} from '../../model/jwt-respone';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) {
  }

  findAllUser(): Observable<User[]> {
    return this.httpClient.get<User[]>('http://localhost:8080/users');
  }

  findUserById(idUser: any): Observable<User> {
    return this.httpClient.get<User>(`http://localhost:8080/users/${idUser}`);
  }
  editProfile(id, user): Observable<User> {
    return this.httpClient.post<User>(`http://localhost:8080/users/${id}`, user);
  }



}
