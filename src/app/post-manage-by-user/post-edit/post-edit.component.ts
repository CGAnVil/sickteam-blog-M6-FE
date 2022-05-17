import { Component, OnInit } from '@angular/core';
import {Post} from "../../model/Post";
import {PostService} from "../../service/post/post.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../model/user";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Status} from "../../model/Status";
import {Category} from "../../model/Category";
import {CategoryService} from "../../service/category/category.service";
import {StatusService} from "../../service/status/status.service";
import {UserService} from "../../service/user/user.service";
import {AuthService} from "../../service/auth/auth.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  post: Post
  idLogin!: any;
  user!: User;

  formPostEdit: FormGroup;
  status: Status[];
  categories: Category[];

  constructor(
    private postService: PostService,
    private userService: UserService,
    private statusService: StatusService,
    private fb: FormBuilder,
    private auth: AuthService,
    private Http:HttpClient,
    private router:Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.getPostById()
  }

  getPostById(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.postService.findPostById(id).subscribe((postFormBE) =>{
      this.post = postFormBE;
    }, error =>{
      console.log(error);
    });
  }
  getAllStatus() {
    this.statusService.findAllStatus().subscribe((statusFormBE) => {
      this.status = statusFormBE;
    }, error => {
      console.log(error);
    });
  }


  getAllCategory(){
    this.categoryService.findAllCategory().subscribe((categoriesFormBE) => {
      this.categories = categoriesFormBE;
    }, error => {
      console.log(error);
    })
  }

  public findUser(isUser: any) {
    this.userService.findUserById(isUser).subscribe(data => {
      this.user = data;
      this.idLogin = data.id;
    });
  }

  editPost() {

  }
}
