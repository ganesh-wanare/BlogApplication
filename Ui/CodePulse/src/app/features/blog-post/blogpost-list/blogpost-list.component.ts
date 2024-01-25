import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../services/blog-post.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css']
})
export class BlogpostListComponent implements OnInit {

//Onservable to use in html async pipe
  blogPosts$?: Observable<BlogPost[]>;

  ngOnInit(): void { 
    this.blogPosts$ = this.blogPostService.getAllBlogPosts();
  }

  constructor(private blogPostService: BlogPostService) { }

  // getAllBlogPostsData(): void {
  //   this.blogPostService.getAllBlogPosts().subscribe({
  //     next: (response) => {
  //       this.blogPosts$ = response;
  //     }
  //   });
  // }

}
