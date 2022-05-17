import {Component, OnInit} from '@angular/core';
import {User} from "../../model/user";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../../service/user/user.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-info-edit',
  templateUrl: './info-edit.component.html',
  styleUrls: ['./info-edit.component.css']
})
export class InfoEditComponent implements OnInit {

  user: User

  formEditUser: FormGroup = new FormGroup({
    fullName: new FormControl(''),
    email: new FormControl(''),
    address: new FormControl(''),
    phone: new FormControl(''),
    avatar: new FormControl(''),
  });


  constructor(private userService: UserService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getUserInfo();
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formEditUser.get('avatar').setValue(file);
      console.log(file);
    }
  }

  getUserInfo() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.findUserById(id).subscribe((userFormBe)=>{
      this.user = userFormBe;
      this.formEditUser.patchValue({
        fullName: this.user.fullName,
        email: this.user.email,
        address: this.user.address,
        phone: this.user.phone,
        avatar: this.user.avatar
      });
    },error => {
      console.log(error);
    })
  }

  editInfoUser() {
    const formData: FormData = new FormData();
    formData.append('fullName', this.formEditUser.get('fullName').value);
    formData.append('email', this.formEditUser.get('email').value);
    formData.append('address', this.formEditUser.get('address').value);
    formData.append('phone', this.formEditUser.get('phone').value);
    formData.append('avatar', this.formEditUser.get('avatar').value);

    this.userService.editProfile(this.user.id, formData).subscribe(() => {
      alert("Chinh sua thanh cong");
    })

  }
}
