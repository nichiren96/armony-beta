import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Fare } from '../../models/Fare.model';
import { FaresService } from '../../services/fares.service';


@Component({
  selector: 'app-single-fare',
  templateUrl: './single-fare.component.html',
  styleUrls: ['./single-fare.component.css']
})
export class SingleFareComponent implements OnInit {

  fareForm: FormGroup;
  fare: Fare;
  fare_id: number;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private fareService: FaresService,
    private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.fare_id = this.route.snapshot.params['id'];
    this.fareService.getSingleFare(+id).then(
      (fare: Fare) => {
        this.fare = fare;
      }
    );
    this.initForm();
  }

  initForm() {
    this.fareForm = this.formBuilder.group({
      fare: ['', Validators.required],
      fare_number: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      classe: ['', Validators.required],
      description: ['', Validators.required],
    
    });
  }

  onUpdateFare() {
    const fare_label = this.fareForm.get('fare').value;
    const fare_number = this.fareForm.get('fare_number').value;
    const price = this.fareForm.get('price').value;
    const category = this.fareForm.get('category').value;
    const classe = this.fareForm.get('classe').value;
    const description = this.fareForm.get('description').value;

    const fare = new Fare(fare_number, classe, category, price);

    if (fare_label != '') {
      fare.fare = fare_label;
    }

    if (description != '') {
      fare.description = description;
    }

    this.fareService.updateFare(fare, this.fare_id);

    this.router.navigate(['/fares'])
  }


  onBack() {
    this.router.navigate(['/fares']);
  }


}
