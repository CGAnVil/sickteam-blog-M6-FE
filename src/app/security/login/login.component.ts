import { Component, OnInit } from '@angular/core';
import {SignInForm} from '../../model/sign-in-form';
import {User} from '../../model/user';
import {AuthService, Role} from '../../service/auth/auth.service';
import {TokenService} from '../../service/auth/token.service';
import {Router} from '@angular/router';
import {JwtRespone} from '../../model/jwt-respone';
import {SocialLoginService} from '../../service/login/social-login.service';

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
              private socialService: SocialLoginService) {
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

        if (user.status == 'block') {
          this.checkBlock = true;
          this.status = 'Tài khoản đã bị chặn';
          this.router.navigate(['/login']).then(() => {
            window.location.reload();
          })
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

}
