import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFullDetailComponent } from './post-full-detail.component';

describe('PostFullDetailComponent', () => {
  let component: PostFullDetailComponent;
  let fixture: ComponentFixture<PostFullDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostFullDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostFullDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
