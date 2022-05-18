import {Component, OnInit} from '@angular/core';
import {PostService} from "../../service/post/post.service";
import {Post} from "../../model/Post";
import {UserService} from "../../service/user/user.service";
import {User} from "../../model/user";
import {Category} from '../../model/Category';
import {CategoryService} from '../../service/category/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  postsAction: Post[] = [];
  users: User[] = [];
  category: Category[] = [];

  constructor(private postService: PostService,
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
