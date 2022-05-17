import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Comment} from '../../model/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  getAllCommentByPostId(idPost: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/comments/${idPost}`);
  }

  getAllReplyComment(idPost: number, idComment: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`http://localhost:8080/comments/${idPost}/${idComment}`);
  }

  saveCommentPost(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`http://localhost:8080/comments`, comment);
  }

  updateCommentPost(id: number, newComment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`http://localhost:8080/comments/${id}`, newComment);
  }

  deleteCommentPost(id: number): Observable<Comment> {
    return this.http.delete<Comment>(`http://localhost:8080/comments/${id}`);
  }
}
