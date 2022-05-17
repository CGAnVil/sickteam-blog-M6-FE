import { Component, OnInit } from '@angular/core';
import {PostService} from "../../service/post/post.service";
import {ActivatedRoute} from "@angular/router";
import {Post} from "../../model/Post";
import {error} from "protractor";

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
post: Post;
  constructor(
    private postService: PostService,
    private route: ActivatedRoute
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
}
