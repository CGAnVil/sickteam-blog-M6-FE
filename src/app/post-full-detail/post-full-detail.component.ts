import {Component, OnInit} from '@angular/core';
import {Post} from '../model/Post';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {PostService} from '../service/post/post.service';
import {Comment} from '../model/comment';
import {CommentService} from '../service/comment/comment.service';
import {LikeService} from '../service/like/like.service';
import {Like} from '../model/like';

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

  totalLike: number;

  comments: Comment[] = [];

  like: Like = {
    userLike: null,
    postLike: null
  };

  constructor(private route: ActivatedRoute,
              private postService: PostService,
              private commentService: CommentService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private likeService: LikeService) {
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
      this.countLikeByIdPost(id);
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

  countLikeByIdPost(id: number) {
    this.likeService.countLikeByIdPost(id).subscribe((totalLike) => {
      this.totalLike = totalLike;
      console.log("Get total like success");
    }, error => {
      console.log("Get total like fail");
    })
  }

  likeUnlikePost(idPost: number, idUser: number) {
    // idPost = this.idPost;
    // idUser = this.idLogin;
    this.likeService.likeUnlikePost(idPost, idUser).subscribe((totalLikeBE) => {
      this.totalLike = totalLikeBE;
      console.log("Like unlike success");
    }, error => {
      console.log("Like unlike success");
    })
  }
}
