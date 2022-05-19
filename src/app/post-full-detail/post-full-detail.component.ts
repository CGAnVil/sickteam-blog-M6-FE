import { Component, OnInit } from '@angular/core';
import {Post} from "../model/Post";
import {ActivatedRoute} from "@angular/router";
import {PostService} from "../service/post/post.service";


import {Comment} from '../model/comment';
import {CommentService} from '../service/comment/comment.service';
import {CategoryService} from '../service/category/category.service';
import {Category} from '../model/Category';


@Component({
  selector: 'app-post-full-detail',
  templateUrl: './post-full-detail.component.html',
  styleUrls: ['./post-full-detail.component.css']
})
export class PostFullDetailComponent implements OnInit {


  post: Post;

  comments: Comment[] = [];
  category: Category[] = [];

  constructor(private route: ActivatedRoute,
              private postService:PostService,
              private commentService: CommentService,private categoryService: CategoryService) { }


  ngOnInit() {
    this.getPostById();
    this.getAllCategory();
  }

  getPostById(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.postService.findPostById(id).subscribe((postFormBE) =>{
      this.post = postFormBE;
      this.getAllCommentByPostId(id);
    }, error =>{
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


  getAllCommentByPostId(id: number) {
    this.commentService.getAllCommentByPostId(id).subscribe(listComment => {
      this.comments = listComment;
      console.log("Get list comment success");

    }, error => {
      console.log("Get list comment fail!");
    })
  }

}
