import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailCategoryComponent } from './post-detail-category.component';

describe('PostDetailCategoryComponent', () => {
  let component: PostDetailCategoryComponent;
  let fixture: ComponentFixture<PostDetailCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostDetailCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostDetailCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
