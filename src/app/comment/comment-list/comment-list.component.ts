import { Component, OnInit } from '@angular/core';
import {CommentService} from '../../service/comment/comment.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  comments: Comment[] = [];

  constructor(private commentService: CommentService) { }

  ngOnInit() {
    this.getAllCommentByPostId(3);
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
