import { Component, OnInit } from '@angular/core';
import {Post} from "../model/Post";
import {ActivatedRoute} from "@angular/router";
import {PostService} from "../service/post/post.service";

@Component({
  selector: 'app-post-full-detail',
  templateUrl: './post-full-detail.component.html',
  styleUrls: ['./post-full-detail.component.css']
})
export class PostFullDetailComponent implements OnInit {

  post: Post

  constructor(private route: ActivatedRoute,
              private postService:PostService) { }

  ngOnInit() {
    this.getPostById();
  }

  getPostById(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.postService.findPostById(id).subscribe((postFormBE) =>{
      this.post = postFormBE;
    }, error =>{
      console.log(error);
    });
  }

}
