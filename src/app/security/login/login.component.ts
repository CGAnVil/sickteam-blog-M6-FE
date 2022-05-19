import { Component, OnInit } from '@angular/core';
import {SignInForm} from '../../model/sign-in-form';
import {User} from '../../model/user';
import {AuthService, Role} from '../../service/auth/auth.service';
import {TokenService} from '../../service/auth/token.service';
import {Router} from '@angular/router';
import {SocialLoginService} from '../../service/login/social-login.service';
import {UserStatus} from './user-status.enum';
import {FacebookLoginProvider, GoogleLoginProvider, SocialUser} from 'angular-6-social-login';
import {JwtRespone} from '../../model/jwt-respone';
import * as firebase from 'firebase';
import {AngularFireAuth} from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  status = '';
  form: any = {};
  signInForm!: SignInForm;
  hide = true;
  isLoggedIn = false;
  isLoginFailed = false;
  role!: string;
  checkBlock = false;
  nameLogin!: string;
  error1: any = {
    message: 'notfounduser'
  };

  user!: User;

  constructor(private authService: AuthService,
              private tokenService: TokenService,
              private router: Router,
              private socialService: SocialLoginService,
              public afAuth: AngularFireAuth) {
  }

  roles: string[] = [];
  name!: string;

  ngOnInit(): void {
    // if (this.tokenService.getToken()) {
    //   this.isLoggedIn = true;
    //   this.roles = this.tokenService.getRoles();
    //   this.name = this.tokenService.getName();
    //
    // }
  }

  ngSubmit() {
    this.signInForm = new SignInForm(
      this.form.username,
      this.form.password
    );
    this.authService.findUserByUsername(this.form.username).subscribe(user => {
        console.log(user);
        if (JSON.stringify(user) == JSON.stringify(this.error1)) {
          this.status = 'Không tìm thấy tên người dùng';
        }
        console.log(user.status.name === UserStatus.ACTIVE);

        if (user.status.name === UserStatus.INACTIVE) {
          this.checkBlock = true;
          this.status = 'Tài khoản đã bị chặn';
          this.router.navigate(['/login']).then(() => {
            window.location.reload();
          });
        } else {
          this.authService.signIn(this.signInForm).subscribe(data => {
              console.log('data', data);
              if (data.token != undefined) {
                this.tokenService.setToken(data.token);
                this.tokenService.setName(data.fullName);
                this.name = this.tokenService.getName();
                this.tokenService.setRoles(data.roles);
                this.isLoginFailed = false;
                this.isLoggedIn = true;
                this.nameLogin = data.fullName;
                for (let i = 0; i < data.roles.length; i++) {
                  if (data.roles[i]['authority'] === 'ADMIN') {
                    this.role = Role.Admin;
                  } else if (data.roles[i]['authority'] === 'USER') {
                    this.role = Role.User;
                  }
                }
                this.user = user;
                console.log('thong tin user: ', user);
                localStorage.setItem("userLogin", JSON.stringify(this.user));
                localStorage.setItem("nameLogin", this.nameLogin);
                localStorage.setItem("roleLogin", this.role);
                this.router.navigate(['']).then(() => {
                  window.location.reload();
                });

              } else {
                this.isLoggedIn = false;
                this.isLoginFailed = true;
                console.log('loginFailed', this.isLoginFailed);
                console.log('isLoggedIn', this.isLoggedIn);
                this.status = 'Đăng nhập thất bại! Vui lòng thử lại!';
              }
            }, error => {
              console.log('error', error);
              this.status = "Người dùng hoặc mật khẩu không đúng"
              this.isLoginFailed = true;
            }
          )
        }

      }
    );

  }


  public checkBlockLogin(username: any) {

  }

  public findUserByUsername(username: any) {

  }

  // response;
  // socialusers = new SocialUser();
  //
  // login() {
  //   // this.auth.signInWithPopup();
  //   this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(result => {
  //     // The firebase.User instance:
  //     const user = result.user;
  //     // The Facebook firebase.auth.AuthCredential containing the Facebook
  //     // access token:
  //     const credential = result.credential;
  //     console.log(user);
  //     console.log(credential);
  //     this.authService.signInSocial({type: 'google', email: user.email}).subscribe(resp => {
  //       console.log(resp, 'resp');
  //       if (resp.token != undefined) {
  //         this.tokenService.setToken(resp.token);
  //         this.tokenService.setName(resp.fullName);
  //         this.name = this.tokenService.getName();
  //         this.tokenService.setRoles(resp.roles);
  //         this.isLoginFailed = false;
  //         this.isLoggedIn = true;
  //         this.nameLogin = resp.fullName;
  //         for (let i = 0; i < resp.roles.length; i++) {
  //           if (resp.roles[i]['authority'] === 'ADMIN') {
  //             this.role = Role.Admin;
  //           } else if (resp.roles[i]['authority'] === 'USER') {
  //             this.role = Role.User;
  //           }
  //         }
  //         localStorage.setItem("userLogin", JSON.stringify(this.user));
  //         localStorage.setItem("nameLogin", this.nameLogin);
  //         localStorage.setItem("roleLogin", this.role);
  //         this.router.navigate(['']).then(() => {
  //           window.location.reload();
  //         });
  //
  //       }
  //       localStorage.setItem('socialusers', JSON.stringify(resp));
  //       this.router.navigate(['']).then(() => {
  //         window.location.reload();
  //       });
  //     });
  //   }, error => {
  //     // The provider's account email, can be used in case of
  //     // auth/account-exists-with-different-credential to fetch the providers
  //     // linked to the email:
  //     var email = error.email;
  //     // The provider's credential:
  //     var credential = error.credential;
  //     // In case of auth/account-exists-with-different-credential error,
  //     // you can fetch the providers using this:
  //     // if (error.code === 'auth/account-exists-with-different-credential') {
  //     //   this.afAuth.auth.fetchSignInMethodsForEmail(email).then(function(providers) {
  //     //     // The returned 'providers' is a list of the available providers
  //     //     // linked to the email address. Please refer to the guide for a more
  //     //     // complete explanation on how to recover from this error.
  //     //   });
  //     // }
  //   });
  // }
  //
  // public socialSignIn(socialProvider: string) {
  //   console.log(socialProvider)
  //   let socialPlatformProvider;
  //   if (socialProvider === 'facebook') {
  //     socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
  //   } else if (socialProvider === 'google') {
  //     socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
  //   }
  //
  //   this.authService.signIn(socialPlatformProvider).subscribe(socialusers => {
  //     console.log(socialProvider, socialusers);
  //     console.log(socialusers);
  //     this.Savesresponse(socialusers);
  //
  //   });
  // }
  //
  // Savesresponse(socialusers: JwtRespone) {
  //
  //   this.socialService.Savesresponse(socialusers).subscribe((res: any) => {
  //     debugger;
  //     console.log(res);
  //     this.socialusers=res;
  //     this.response = res.userDetail;
  //     localStorage.setItem('socialusers', JSON.stringify( this.socialusers));
  //     console.log(localStorage.setItem('socialusers', JSON.stringify(this.socialusers)));
  //     this.router.navigate([``]);
  //   })
  // }

}
