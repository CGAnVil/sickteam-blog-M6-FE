import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TokenService} from '../../service/auth/token.service';
import {UserService} from "../../service/user/user.service";
import {AuthService} from "../../service/auth/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  checkLogin = false;
  nameLogin!: string | null;
  roleLogin!: any;
  currentUser: any;
  constructor(private tokenService: TokenService,
              private router: Router,
              private userService: UserService,
              private authenticationService: AuthService) { }


  ngOnInit(): void {
    this.authenticationService.currentUserSubject.subscribe(user =>{
      this.currentUser = user;
      if(user == null){
        this.checkLogin = false;
      }else {
        this.roleLogin = localStorage.getItem('roleLogin');
        this.checkLogin = true;
      }
      this.userService.findUserById(user.id).subscribe(user1 =>{
        this.nameLogin = user1.fullName
      });
    })
  }

  logout() {
    this.authenticationService.logout();
  }
}
