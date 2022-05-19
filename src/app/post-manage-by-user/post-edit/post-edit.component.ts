import {Component, OnInit} from '@angular/core';
import {Post} from '../../model/Post';
import {PostService} from '../../service/post/post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../model/user';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {UserStatus} from '../../model/user-status';
import {Category} from '../../model/Category';
import {CategoryService} from '../../service/category/category.service';
import {StatusService} from '../../service/status/status.service';
import {UserService} from '../../service/user/user.service';
import {AuthService} from '../../service/auth/auth.service';
import {HttpClient} from '@angular/common/http';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ToastService} from "../../toast/toast.service";

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  post: Post;
  idLogin!: any;
  user!: User;

  formPostEdit: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    content: new FormControl(''),
    category: new FormControl(''),
    status: new FormControl(''),
    avatarPost: new FormControl('')
  });

  status: UserStatus[];
  categories: Category[];
  public Editor = ClassicEditor;

  constructor(
    private postService: PostService,
    private userService: UserService,
    private statusService: StatusService,
    private fb: FormBuilder,
    private auth: AuthService,
    private Http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private toastService: ToastService
  ) {
  }

  ngOnInit() {
    this.getPostById();
    this.getAllCategory();
    this.getAllStatus();
    this.user = JSON.parse(localStorage.getItem('userLogin'));
    this.idLogin = this.user.id;
  }

  getPostById() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.postService.findPostById(id).subscribe((postFormBE) => {
      this.post = postFormBE;
      this.formPostEdit.patchValue({
        title: this.post.title,
        description: this.post.description,
        content: this.post.content,
        category: this.post.category,
        status: this.post.status,
        avatarPost: this.post.avatarPost
      });

    }, error => {
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


  getAllCategory() {
    this.categoryService.findAllCategory().subscribe((categoriesFormBE) => {
      this.categories = categoriesFormBE;
    }, error => {
      console.log(error);
    });
  }

  public findUser(isUser: any) {
    this.userService.findUserById(isUser).subscribe(data => {
      this.user = data;
      this.idLogin = data.id;
    });
  }

  editPost() {
    const formData: FormData = new FormData();
    formData.append('title', this.formPostEdit.get('title').value);
    formData.append('description', this.formPostEdit.get('description').value);
    formData.append('content', '');
    formData.append('category', this.formPostEdit.get('category').value);
    formData.append('status', this.formPostEdit.get('status').value);
    formData.append('user', this.idLogin);
    const files = (document.getElementById('avatarPost') as HTMLInputElement).files;
    if (files.length > 0) {
      formData.append('avatarPost', files[0]);
    }

    this.postService.editPost(this.post.id, formData).subscribe(() => {
      this.toastService.showMessageSuccess('success','Chỉnh sửa bài viết thành công');
      this.router.navigateByUrl("/user");
    }, error => {
      this.toastService.showMessageSuccess('success','Chỉnh sửa bài viết thất bại');
      this.router.navigateByUrl("/user");
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formPostEdit.get('avatarPost').setValue(file);
      console.log(file);
    }

  }
}
