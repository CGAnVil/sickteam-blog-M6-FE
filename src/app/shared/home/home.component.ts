import {Component, OnInit} from '@angular/core';
import {PostService} from "../../service/post/post.service";
import {Post} from "../../model/Post";
import {UserService} from "../../service/user/user.service";
import {User} from "../../model/user";

import {Router} from '@angular/router';
import {TokenService} from '../../service/auth/token.service';
import {CategoryService} from '../../service/category/category.service';
import {Category} from '../../model/Category';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  postsAction: Post[] = [];
  users: User[] = [];
  category: Category[]=[];

  nameLogin!: string | null;
  checkLogin = false;

  constructor(private postService: PostService,
              private router: Router,
              private userService: UserService,
              private tokenService: TokenService,
              private categoryService: CategoryService) {

  }

  ngOnInit() {
    this.getAllProductAction();
    this.getAllCategory();
  }


  getAllProductAction() {
    this.postService.findAllPostPublic().subscribe((postsFormBE) => {
      this.postsAction = postsFormBE;
    }, error => {
      console.log(error);
    });
  }

  getAllCategory(){
    this.categoryService.findAllCategory().subscribe((categoryBE) => {
      this.category = categoryBE;
    }, error =>  {
      console.log(error)
    })
  }

}
