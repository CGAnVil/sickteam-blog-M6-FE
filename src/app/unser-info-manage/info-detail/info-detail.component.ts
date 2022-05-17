import {Component, OnInit} from '@angular/core';
import {User} from "../../model/user";
import {UserService} from "../../service/user/user.service";

@Component({
  selector: 'app-info-detail',
  templateUrl: './info-detail.component.html',
  styleUrls: ['./info-detail.component.css']
})
export class InfoDetailComponent implements OnInit {

  user: User;

  constructor() {
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('userLogin'));
  }


}
