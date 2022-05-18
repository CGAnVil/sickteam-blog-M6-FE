import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../../model/user';
import {Post} from '../../model/Post';
import {MatTableDataSource} from '@angular/material';
import {PostService} from '../../service/post/post.service';
import {UserService} from '../../service/user/user.service';
import {Router} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';


@Component({
  selector: 'app-post-manager',
  templateUrl: './post-manager.component.html',
  styleUrls: ['./post-manager.component.css']
})
export class PostManagerComponent implements OnInit {
  idLogin!: any;
  user!: User;

  nameLogin!: any;

  posts!: Post[];
  post!: Post;

  displayedColumns: string[] = ['id', 'avatarPost', 'title', 'edit' ,'action'];
  dataSource!: MatTableDataSource<any>;


  // @ts-ignore
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private postService: PostService,
              private userService: UserService,
              private router: Router
  ) {
  }

  ngOnInit() {
    this.idLogin = localStorage.getItem('idLogin');
    this.user = JSON.parse(<string> localStorage.getItem('userLogin'));
    this.findUser(this.user.id);
    console.log('id',this.user.id);
    this.findAllPostByUserId();
  }


  public findAllPostByUserId() {
    this.postService.findAllPostByUserId(this.user.id).subscribe({
      next: (result) => {
        this.posts = result;
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.dataSource);
      }, error: (err) => {
        // alert('Error while searching product')
      }
    });
  }


  deletePost(id: any) {
    this.postService.deletePost(id).subscribe(() => {
        this.findAllPostByUserId();

      }
    );
  }


  changePostPublic(id: any){
    this.postService.changePostPublic(id).subscribe(() => {
        this.findAllPostByUserId();

      }
    );
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  public findUser(isUser: any) {
    this.userService.findUserById(isUser).subscribe(data => {
      this.user = data;
      this.idLogin = data.id;
    });
  }

  public logout() {
    localStorage.removeItem('nameLogin');
    localStorage.removeItem('idLogin');
    localStorage.removeItem('roleLogin');
    this.router.navigate(['/login']);
  }


}
