import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../../model/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  findAllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:8080/categories');
  }
}
