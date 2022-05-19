import {Component, OnInit} from '@angular/core';
import {Post} from '../model/Post';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {PostService} from '../service/post/post.service';
import {Comment} from '../model/comment';
import {CommentService} from '../service/comment/comment.service';

@Component({
  selector: 'app-post-full-detail',
  templateUrl: './post-full-detail.component.html',
  styleUrls: ['./post-full-detail.component.css']
})
export class PostFullDetailComponent implements OnInit {

  post: Post;

  idLogin?: any;

  userLogin?: any;

  idPost: any;

  comments: Comment[] = [];

  constructor(private route: ActivatedRoute,
              private postService: PostService,
              private commentService: CommentService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.idPost = +paramMap.get('id');
      this.userLogin = JSON.parse(localStorage.getItem('userLogin'));
      this.idLogin = this.userLogin.id;
    });
  }

  ngOnInit() {
    this.getPostById();
  }

  getPostById() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.postService.findPostById(id).subscribe((postFormBE) => {
      this.post = postFormBE;
      this.getAllCommentByPostId(id);
    }, error => {
      console.log(error);
    });
  }

  getAllCommentByPostId(id: number) {
    this.commentService.getAllCommentByPostId(id).subscribe(listComment => {
      this.comments = listComment;
      console.log('Get list comment success');
    }, error => {
      console.log('Get list comment fail!');
    });
  }

  deleteComment(id: number) {
    this.commentService.deleteCommentPost(id).subscribe(() => {
      console.log('Delete comment success');
      this.getPostById();
    }, error => {
      console.log('Delete comment fail');
    });
  }
}
