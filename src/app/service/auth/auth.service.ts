import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {User} from '../../model/user';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {SignInForm} from '../../model/sign-in-form';
import {SignUpForm} from '../../model/sign-up-form';
import {JwtRespone} from '../../model/jwt-respone';
import {TokenService} from './token.service';
import {UserService} from '../user/user.service';
import {ResponeBody} from '../../model/respone-body';
import {ChangePassword} from '../../model/change-password';
import {SignInRequest} from '../../model/sign-in-request';
import {map} from "rxjs/operators";

export enum Role {
  Guess = 'GUESS',
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
  public currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  nameLogin!: string;
  role!: Role;
  name!: string;
  status = '';
  user!: User;
  idUser!: number;

  userCheck!: User;

  isLoggedIn = false;
  isLoginFailed = false;

  constructor(private httpClient: HttpClient,
              private router: Router,
              private tokenService: TokenService,
              private userService: UserService,
              ) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public signUp(signUp: SignUpForm): Observable<any> {
    return this.httpClient.post<any>(API_AUTH + '/register', signUp);
  }

  public signIn(signIn: SignInForm): Observable<JwtRespone> {
    return this.httpClient.post<JwtRespone>(API_AUTH + '/login', signIn)
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  public signInSocial(signIn: SignInRequest): Observable<JwtRespone> {
    return this.httpClient.post<JwtRespone>(API_AUTH + '/login-social', signIn);
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
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated() {
    // return true if the user enter correct user name and password
    return this.isLoggedIn;
  }

  findUserByUsername(username: string): Observable<User> {
    return this.httpClient.get<User>(`http://localhost:8080/api/auth/findUserByUsername/${username}`);
  }

  changePassword(user: ChangePassword): Observable<ResponeBody> {
    return this.httpClient.put<ResponeBody>(`http://localhost:8080/api/auth/changePassword`, user);
  }
}
