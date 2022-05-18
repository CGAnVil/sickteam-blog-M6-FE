import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TokenService} from '../../service/auth/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  checkLogin = false;
  nameLogin!: string | null;
  roleLogin!: any;

  constructor(private tokenService: TokenService,
              private router: Router) { }


  ngOnInit(): void {
    this.nameLogin = localStorage.getItem('nameLogin');
    this.roleLogin = localStorage.getItem('roleLogin');
    if (this.nameLogin) {
      this.checkLogin = true;
    } else {
      this.checkLogin = false;
    }
  }

  logout() {
    this.checkLogin = false;
    this.nameLogin = null;
    localStorage.removeItem('nameLogin');
    localStorage.removeItem('idLogin');
    localStorage.removeItem('roleLogin');
    localStorage.removeItem('userLogin');
    this.router.navigate(['/']);
  }
}
