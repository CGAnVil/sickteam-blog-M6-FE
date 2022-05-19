import {Component, OnInit} from '@angular/core';
import {User} from "../../model/user";
import {UserService} from "../../service/user/user.service";


@Component({
  selector: 'app-info-detail',
  templateUrl: './info-detail.component.html',
  styleUrls: ['./info-detail.component.css']
})
export class InfoDetailComponent implements OnInit {

  user!: User;
  idLogin: any;


  constructor(private userService: UserService) {
  }

  ngOnInit() {
  const id = this.findUser();
  this.userService.findUserById(id);
  }

  public findUser(): number{
    this.user = JSON.parse(<string> localStorage.getItem('userLogin'));
    this.idLogin = this.user.id;
    return this.user.id;
  }


}
