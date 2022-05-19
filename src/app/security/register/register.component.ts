import { Component, OnInit } from '@angular/core';
import {SignUpForm} from '../../model/sign-up-form';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../service/auth/auth.service';
import {ToastService} from "../../toast/toast.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  checkPass = false;
  status = 'Điền thông tin đăng ký';
  form: any = {};
  signUpForm!: SignUpForm;
  hide = true;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  error1: any = {
    message: 'Người dùng đã tồn tại, vui lòng nhập người dùng khác'
  };
  error2: any = {
    message: 'Email đã tồn tại, vui lòng nhập email khác'
  };
  success: any = {
    message: 'Success'
  };
  checkSuccess: boolean = false;


  constructor(private router: Router,
              private authService: AuthService,
              private toastService: ToastService) { }

  ngOnInit(): void {

  }

  ngSubmit() {
    this.signUpForm = new SignUpForm(
      this.form.fullName,
      this.form.username,
      this.form.email,
      this.form.password,
      this.form.rePassword
    );
    this.authService.signUp(this.signUpForm).subscribe(data => {
      console.log('data = ', data);
      if (JSON.stringify(data) === JSON.stringify(this.error1)) {
        this.status = 'Tên người dùng đã tồn tại! Vui lòng thử lại!';
      }
      if (this.form.password !== this.form.rePassword) {
        this.checkPass = false;
        this.status = 'Mật khẩu không hợp lệ';
      }
      if (JSON.stringify(data) === JSON.stringify(this.error2)) {
        this.status = 'Email đã tồn tại! Vui lòng thử lại!';

      }
      if (JSON.stringify(data) === JSON.stringify(this.success)) {
        this.toastService.showMessageSuccess('success', 'Đăng ký tài khoản thành công');
        this.status = 'Tạo tài khoản người dùng thành công!';
        this.checkSuccess = true;
        this.router.navigate(['/login']);
      }

    });


  }

  public checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true});
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
  }
}
