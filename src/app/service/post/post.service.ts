import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post} from '../../model/Post';
import {RequestOptions} from "../../model/RequestOptions";
import {environment} from "../../../environments/environment";

const API_URL= `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {
  }

  findAllPost(): Observable<Post[]> {
    return this.http.get<Post[]>('http://localhost:8080/posts');
  }

  findPostById(id):Observable<Post>{
    return this.http.get<Post>(`http://localhost:8080/posts/${id}`);
  }

  editPost(id, post):Observable<Post>{
    return this.http.post<Post>(`http://localhost:8080/posts/${id}`,post);
  }

  findAllPostPublic(): Observable<Post[]> {
    return this.http.get<Post[]>('http://localhost:8080/posts/findStatus/1');
  }

  findAllPostByUserId(idUser: any): Observable<Post[]> {
    return this.http.get<Post[]>(`http://localhost:8080/posts/users/${idUser}`);
  }

  deletePost(id:number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/posts/${id}`);
  }

  changePostPublic(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/posts/changePostsPublic/${id}`)
  }



  createPostFormData(post?: any): Observable<any> {
    let headers = new HttpHeaders({ 'enctype': 'multipart/form-data'});
    return this.http.post('http://localhost:8080/posts/', post , {headers});
  }








  private createRequestOptions(
    options?: RequestOptions,
  ) {
    const requestOptions = {
      headers: null,
      params: null,
      observe: 'response' as any,
      reportProgress: false as any,
      responseType: 'json' as any,
    };

      if (options.hideLoading) {
        requestOptions.headers = new HttpHeaders({ ignoreLoadingBar: 'true' });
      }
      requestOptions.reportProgress = options.reportProgress;
      requestOptions.responseType = options.responseType;



    return requestOptions;
  }

}
