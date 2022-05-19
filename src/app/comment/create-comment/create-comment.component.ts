import {Component, OnInit} from '@angular/core';
import {Post} from '../../model/Post';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {PostService} from '../../service/post/post.service';
import {CommentService} from '../../service/comment/comment.service';
import {Comment} from '../../model/comment';
import {FormControl, FormGroup} from '@angular/forms';
import {User} from '../../model/user';
import {UserService} from '../../service/user/user.service';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit {
  post: Post;

  comments: Comment[] = [];

  idLogin!: any;

  user!: User;

  idPost: any;

  comment: Comment = {
    userCommentPost: null,
    postCommentPost: null,
    commentPost: null
  };

  commentForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    content: new FormControl(''),
    userCommentPost: new FormControl(''),
    postCommentPost: new FormControl(''),
    commentPost: new FormControl(null)
  });

  constructor(private route: ActivatedRoute,
              private postService: PostService,
              private commentService: CommentService,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private router: Router) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.idPost = +paramMap.get('id');
      this.getPostById(this.idPost);
    });
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('userLogin'));
    this.idLogin = (this.user.id);
    this.findUser(this.user.id);
  }

  getPostById(id) {
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

  public findUser(isUser: any) {
    this.userService.findUserById(isUser).subscribe(data => {
      this.user = data;
      this.idLogin = data.id;
    });
  }

  createComment() {
    this.comment = this.commentForm.value;
    this.comment.userCommentPost = {
      id: this.idLogin
    };
    this.comment.postCommentPost = {
      id: this.idPost
    };
    if (this.idLogin != null) {
      this.commentService.saveCommentPost(this.comment).subscribe(() => {
        console.log('Create comment success');
        this.router.navigateByUrl(`posts/details/${this.idPost}`);
      }, error => {
        console.log('Create comment fail');
      });
    } else {
      console.log("Chua login");
    }
  }
}
