import { Component, OnInit } from '@angular/core';
import {PostService} from '../service/post/post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Category} from '../model/Category';
import {Post} from '../model/Post';
import {CategoryService} from '../service/category/category.service';

@Component({
  selector: 'app-post-detail-category',
  templateUrl: './post-detail-category.component.html',
  styleUrls: ['./post-detail-category.component.css']
})
export class PostDetailCategoryComponent implements OnInit {


  category: Category[] = [];

  post1: Post[] = [];


  constructor(private postService: PostService,
              private route: ActivatedRoute,
              private categoryService: CategoryService) { }

  ngOnInit() {
    this.getPostByCategory_id();
    this.getAllCategory();
  }

  getPostByCategory_id(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.postService.findAllPostCategory(id).subscribe((postFormBE) =>{
      this.post1 = postFormBE;
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
