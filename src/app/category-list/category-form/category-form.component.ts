import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from '../../models/Category.model';
import { CategoriesService} from '../../services/categories.service';


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  categoryForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private categoryService: CategoriesService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.categoryForm = this.formBuilder.group({
      category: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSaveCategory() {
    const category = this.categoryForm.get('category').value;
    const description = this.categoryForm.get('description').value;
  

    const newCategory = new Category(category, description);

    this.categoryService.createNewCategory(newCategory);

    this.router.navigate(['/categories'])
  }


  onBack() {
    this.router.navigate(['/categories']);
  }

}
