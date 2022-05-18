import { Component, OnInit } from '@angular/core';
import {Post} from "../model/Post";
import {ActivatedRoute} from "@angular/router";
import {PostService} from "../service/post/post.service";
import {Category} from '../model/Category';
import {CategoryService} from '../service/category/category.service';

@Component({
  selector: 'app-post-full-detail',
  templateUrl: './post-full-detail.component.html',
  styleUrls: ['./post-full-detail.component.css']
})
export class PostFullDetailComponent implements OnInit {

  category: Category[] = [];

  post: Post

  constructor(private route: ActivatedRoute,
              private postService:PostService,
              private categoryService: CategoryService) { }

  ngOnInit() {
    this.getPostById();
    this.getAllCategory();
  }

  getPostById(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.postService.findPostById(id).subscribe((postFormBE) =>{
      this.post = postFormBE;
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

}
