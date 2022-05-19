import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserStatus} from '../../model/user-status';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private httpClient:HttpClient) { }

  findAllStatus(): Observable<UserStatus[]> {
     return this.httpClient.get<UserStatus[]>('http://localhost:8080/posts/status');
  }

}
