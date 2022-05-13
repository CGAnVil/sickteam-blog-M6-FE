import {Component, OnInit} from '@angular/core';
import {PostService} from "../../service/post/post.service";
import {Post} from "../../model/Post";
import {UserService} from "../../service/user/user.service";
import {User} from "../../model/user";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  postsAction: Post[] = [];
  users: User[] = [];

  constructor(private postService: PostService) {
  }

  ngOnInit() {
    this.getAllProductAction();
  }


  getAllProductAction() {
    this.postService.findAllPostAction().subscribe((postsFormBE) => {
      this.postsAction = postsFormBE;
    }, error => {
      console.log(error);
    });
  }

}
