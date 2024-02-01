import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, GuardsCheckEnd, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blog-post.model';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category-model';
import { UpdateBlogPost } from '../models/update-blog-post.model';

@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrls: ['./edit-blogpost.component.css']
})
export class EditBlogpostComponent implements OnInit,OnDestroy {

  id: string | null = null;
  model?: BlogPost;
  categories$? : Observable<Category[]>;
  selectedCategories?: string[];

  routeSubscription?: Subscription;
  updateBlogPostSubsscription?: Subscription;
  getBlogPostSubscription?: Subscription;
  
  constructor(private route: ActivatedRoute,
    private blogPostService: BlogPostService,
    private categoryService: CategoryService,
    private router: Router) {}

  ngOnInit(): void {

    this.categories$ = this.categoryService.getAllCategories();
    this.routeParams();
  }

  routeParams() {
    this.routeSubscription =this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        //Get BlogPost From API
        if (this.id)
        {
          this.getBlogPostSubscription = this.blogPostService.getBlogPostsById(this.id).subscribe({
            next: (response) => {
              this.model = response; 
              this.selectedCategories = response.categories.map(x => x.id) 
            }
          })
        }
      }
    });
  }

  onFormSubmit(): void {
    //Convert This Model To Request Object
    if(this.model && this.id ) {
      var updateBlogPost: UpdateBlogPost = {
        author: this.model.author,
        content: this.model.content,
        shortDescription: this.model.shortDescription,
        featuredImageUrl: this.model.featuredImageUrl,
        isVisible: this.model.isVisible,
        publishedDate: this.model.publishedDate,
        title: this.model.title,
        urlHandle: this.model.urlHandle,
        categories: this.selectedCategories ?? []
      };

      this.updateBlogPostSubsscription = this.blogPostService.updateBlogPost(this.id, updateBlogPost).subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/blogpost')
        }
      })
    }
    
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe(); 
    this.updateBlogPostSubsscription?.unsubscribe();
    this.getBlogPostSubscription?.unsubscribe();
  } 


}
