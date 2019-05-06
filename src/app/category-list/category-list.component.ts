import { Component, OnInit } from '@angular/core';
import { Category } from '../models/Category.model';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../services/categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[];
  categoriesSubscription: Subscription;

  constructor(private categoryService: CategoriesService, private router: Router) { }

  ngOnInit() {
    this.categoriesSubscription = this.categoryService.categoriesSubject.subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      }
    );
    this.categoryService.getCategories();
    this.categoryService.emitCategories();
  }

  onNewCategory() {
    this.router.navigate(['/categories', 'new']);
  }

  onDeleteCategory(category: Category) {
    this.categoryService.removeCategory(category);
  }

  onViewCategory(id: number) {
    this.router.navigate(['/categories', 'view', id]);
  }

  ngOnDestroy() {
    this.categoriesSubscription.unsubscribe();
  }

}
