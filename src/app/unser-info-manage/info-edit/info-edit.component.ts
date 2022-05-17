import {Component, OnInit} from '@angular/core';
import {User} from "../../model/user";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../../service/user/user.service";

@Component({
  selector: 'app-info-edit',
  templateUrl: './info-edit.component.html',
  styleUrls: ['./info-edit.component.css']
})
export class InfoEditComponent implements OnInit {

  user: User

  formEditUser: FormGroup;
  fb: FormBuilder;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('userLogin'));

    this.formEditUser = this.fb.group({
      fullName: [''],
      email: [''],
      address: [''],
      phone: [''],
      avatar: [''],
    })
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formEditUser.get('avatar').setValue(file);
      console.log(file);
    }
  }

  getUserInfo(){
    this.user = JSON.parse(localStorage.getItem('userLogin'));
  }

  editInfoUser() {
    const formData: FormData = new FormData();
    formData.append('fullName', this.formEditUser.get('name').value);
    formData.append('email', this.formEditUser.get('email').value);
    formData.append('address', this.formEditUser.get('address').value);
    formData.append('phone', this.formEditUser.get('phone').value);
    formData.append('avatar', this.formEditUser.get('avatar').value);

    this.userService.editProfile(this.user.id, formData).subscribe(()=>{
      alert("Chinh sua thanh cong");
    })

  }
}
