import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post} from '../../model/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient) {
  }

  findAllPost(): Observable<Post[]> {
    return this.httpClient.get<Post[]>('http://localhost:8080/posts');
  }

  findAllPostPublic(): Observable<Post[]> {
    return this.httpClient.get<Post[]>('http://localhost:8080/posts/findStatus/1');
  }

  findAllPostByUserId(idUser:any):Observable<Post[]>{
    return this.httpClient.get<Post[]>(`http://localhost:8080/posts/users/${idUser}`)
  }
}
