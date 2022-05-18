import {Component, OnInit} from '@angular/core';
import {PostService} from "../../service/post/post.service";
import {Post} from "../../model/Post";
import {UserService} from "../../service/user/user.service";
import {User} from "../../model/user";
import {Router} from '@angular/router';
import {TokenService} from '../../service/auth/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  postsAction: Post[] = [];
  users: User[] = [];
  nameLogin!: string | null;
  checkLogin = false;

  constructor(private postService: PostService,
              private router: Router,
              private userService: UserService,
              private tokenService: TokenService) {
  }

  ngOnInit() {
    this.getAllProductAction();
  }


  getAllProductAction() {
    this.postService.findAllPostPublic().subscribe((postsFormBE) => {
      this.postsAction = postsFormBE;
    }, error => {
      console.log(error);
    });
  }

}
