import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Post} from '../../model/Post';
import {Status} from '../../model/Status';
import {User} from '../../model/user';
import {PostService} from '../../service/post/post.service';
import {UserService} from '../../service/user/user.service';
import {StatusService} from '../../service/status/status.service';
import {AuthService} from '../../service/auth/auth.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Category} from '../../model/Category';
import {CategoryService} from '../../service/category/category.service';


declare var CKEDITOR: any;
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  idLogin!: any;
  user!: User;
  content!: string;


  formPostCreate!: FormGroup
  posts!: Post[];
  status!: Status[];
  categories!: Category[];



  constructor(private postService: PostService,
              private userService: UserService,
              private statusService: StatusService,
              private fb: FormBuilder,
              private auth: AuthService,
              private Http: HttpClient,
              private router: Router,
              private categoryService: CategoryService
              ) { }

  ngOnInit() {
    this.getAllStatus();
    this.getAllCategory();
    this.formPostCreate = this.fb.group({
      title: [''],
      description: [''],
      content: [''],
      category: [''],
      status: [''],
      avatarPost: [''],
      user:[''],
    })
    CKEDITOR.replace('contentCreate');

    this.idLogin = localStorage.getItem('idLogin');
    this.user = JSON.parse(<string> localStorage.getItem('userLogin'));
    this.findUser(this.user.id);

  }


  createPost(){
    const formData: FormData = new FormData();
    formData.append('title',this.formPostCreate.get('title').value);
    formData.append('description',this.formPostCreate.get('description').value);
    formData.append('content',CKEDITOR.instances['contentCreate'].getData());
    formData.append('category',this.formPostCreate.get('category').value);
    formData.append('status',this.formPostCreate.get('status').value);
    formData.append('avatarPost',this.formPostCreate.get('avatarPost').value);
    formData.append('user',this.idLogin);


    this.postService.createPostFormData(formData).subscribe( () =>  {
      alert('thanh cong');
      // this.router.navigateByUrl('/user');
    });
    console.log(formData.getAll('name'));
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formPostCreate.get('avatarPost').setValue(file);
      console.log(file);
    }
  }

  getAllStatus() {
    this.statusService.findAllStatus().subscribe((statusFormBE) => {
      this.status = statusFormBE;
    }, error => {
      console.log(error);
    });
  }


  getAllCategory(){
    this.categoryService.findAllCategory().subscribe((categoriesFormBE) => {
      this.categories = categoriesFormBE;
    }, error => {
      console.log(error);
    })
  }

  public findUser(isUser: any) {
    this.userService.findUserById(isUser).subscribe(data => {
      this.user = data;
      this.idLogin = data.id;
    });
  }

}
