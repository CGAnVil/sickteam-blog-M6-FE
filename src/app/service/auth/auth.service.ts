import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {User} from '../../model/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {SignInForm} from '../../model/sign-in-form';
import {SignUpForm} from '../../model/sign-up-form';
import {JwtRespone} from '../../model/jwt-respone';
import {TokenService} from './token.service';
import {UserService} from '../user/user.service';
import {ResponseBody} from '../../shared/model/response-body';
import {ChangePassword} from '../../model/change-password';

export enum Role {
  Guess= 'GUESS',
  User = 'USER',
  Admin = 'ADMIN'
}
const API_AUTH = environment.apiAuth;
const TOKEN_KEY = 'Token_Key';
const NAME_KEY = 'Name_Key';
const ROLE_KEY = 'Role_Key';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  nameLogin!: string;
  role!: Role;
  name!: string;
  status = '';
  user!: User;
  idUser!: number;

  userCheck!: User;

  isLoggedIn = false;
  isLoginFailed = false;
  httpOptions: any;

  constructor(private httpClient: HttpClient,
              private router: Router,
              private tokenService: TokenService,
              private userService: UserService,
              private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  public signUp(signUp: SignUpForm): Observable<any> {
    return this.httpClient.post<any>(API_AUTH + '/register', signUp);
  }

  public signIn(signIn: SignInForm): Observable<JwtRespone> {
    return this.httpClient.post<JwtRespone>(API_AUTH + '/login', signIn);
  }

  public loggined() {
    const token = sessionStorage.getItem(TOKEN_KEY);
    const username = sessionStorage.getItem(NAME_KEY);
    const authority = sessionStorage.getItem(ROLE_KEY);
    if (username && token && authority) {
      return true;
    }
    return false;
  }

  public login(): void {
    this.router.navigate(['/login']);
  }

  public onSubmit(signIn: SignInForm) {



  }


  logout() {
    this.router.navigate(['/login']);
  }

  isAuthenticated() {
    // return true if the user enter correct user name and password
    return this.isLoggedIn;
  }
  findUserByUsername(username: any) {
    return this.httpClient.get<any>(`http://localhost:8080/api/auth/findUserByUsername/${username}`);
  }

  // verify(code: string): Observable<any> {
  //   console.log(code);
  //   return this.http.post(API_AUTH + 'verify', {
  //     code : code
  //   }, this.httpOptions);
  // }
  //
  // verifyPassword(code: string): Observable<any> {
  //   return this.http.post(API_AUTH + 'verify-password', {
  //     code : code
  //   }, this.httpOptions);
  // }
  //
  // resetPassword(username: string): Observable<any> {
  //   return this.http.post(API_AUTH + 'reset-password', {
  //     username : username,
  //   }, this.httpOptions);
  // }
  //
  // doResetPassword(password: string, code: string): Observable<any> {
  //   return this.http.post(API_AUTH + 'do-reset-password', {
  //     password : password,
  //     code : code
  //   }, this.httpOptions);
  // }

  changePassword(user: ChangePassword): Observable<ResponseBody> {
    return this.httpClient.put<ResponseBody>(`http://localhost:8080/api/auth/changePassword`, user);
  }
}

