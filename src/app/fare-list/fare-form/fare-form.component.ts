import { Component, OnInit } from '@angular/core';
import { Fare } from '../../models/Fare.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FaresService } from '../../services/fares.service';
import { Category } from '../../models/Category.model';
import { CategoriesService } from '../../services/categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fare-form',
  templateUrl: './fare-form.component.html',
  styleUrls: ['./fare-form.component.css']
})
export class FareFormComponent implements OnInit {

  fareForm: FormGroup;
  fares: Fare[];
  faresSubscription: Subscription;

  categories: Category[];
  categoriesSubscription: Subscription;


  
  constructor(private formBuilder: FormBuilder,
    private fareService: FaresService,
    private categoryService: CategoriesService,
    private router: Router) { }

    ngOnInit() {

      this.categoriesSubscription = this.categoryService.categoriesSubject.subscribe(
        (categories: Category[]) => {
          this.categories = categories;
        }
      );
  
      this.categoryService.getCategories();
      this.categoryService.emitCategories();

      this.initForm();
    }

    initForm() {
      this.fareForm = this.formBuilder.group({
        category: ['', Validators.required],
        classe: ['', Validators.required],
        price: ['', Validators.required],
        fare:  [''],
        description:  ['']
       
      });
    }

    onSaveFare() {

      const category = this.fareForm.get('category').value;
      const classe= this.fareForm.get('classe').value;
      const price = this.fareForm.get('price').value;
      const fare = this.fareForm.get('fare').value;
      const description = this.fareForm.get('description').value;

      const fare_number = Date.now().toString().substring(4);
    
  
      const newFare = new Fare(fare_number, classe, category, price);
      if (fare != '') {
        newFare.fare = fare;
      }

      if (description != '') {
        newFare.description = description;
      }
      
      this.fareService.createNewFare(newFare);
      this.router.navigate(['/fares'])
    }
  
    onBack() {
      this.router.navigate(['/fares']);
    }

}
