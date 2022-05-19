import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Like} from '../../model/like';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private http: HttpClient) {
  }

  countLikeByIdPost(id: number): Observable<number> {
    return this.http.get<number>(`${API_URL}/likes/${id}`);
  }

  likeUnlikePost(idPost: number, idUser: number): Observable<number> {
    return this.http.get<number>(`${API_URL}/likes/${idPost}/${idUser}`);
  }
}
