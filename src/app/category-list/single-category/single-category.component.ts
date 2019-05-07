import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../models/Category.model';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.css']
})
export class SingleCategoryComponent implements OnInit {

  categoryForm: FormGroup;
  category: Category;
  category_id: number;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private categoryService: CategoriesService,
    private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.category_id = this.route.snapshot.params['id'];
    this.categoryService.getSingleCategory(+id).then(
      (category: Category) => {
        this.category = category;
      }
    );
    this.initForm();
  }

  initForm() {
    this.categoryForm = this.formBuilder.group({
      label: ['', Validators.required],
      description: ['', Validators.required],
    
    });
  }

  onUpdateCategory() {
    const label = this.categoryForm.get('label').value;
    const description = this.categoryForm.get('description').value;
   

    const category = new Category(label, description)

    this.categoryService.updateCategory(category, this.category_id);

    this.router.navigate(['/categories'])
  }


  onBack() {
    this.router.navigate(['/categories']);
  }


}
