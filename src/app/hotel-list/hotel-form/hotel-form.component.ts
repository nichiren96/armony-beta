import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Hotel } from '../../models/Hotel.model';
import { HotelsService } from '../../services/hotels.service';


@Component({
  selector: 'app-hotel-form',
  templateUrl: './hotel-form.component.html',
  styleUrls: ['./hotel-form.component.css']
})
export class HotelFormComponent implements OnInit {

  hotelForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private hotelService: HotelsService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.hotelForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      class: ['', Validators.required],
      city: ['', Validators.required],
      description: ['', Validators.required],
      logo:['', Validators.required]
    });
  }

  onSaveHotel() {
    const name = this.hotelForm.get('name').value;
    const phone = this.hotelForm.get('phone').value;
    const classe = this.hotelForm.get('class').value;
    const city = this.hotelForm.get('city').value;
    const description = this.hotelForm.get('description').value;
    const logo = this.hotelForm.get('logo').value;

    const newHotel = new Hotel(name, city, logo, phone, description, classe);

    this.hotelService.createNewHotel(newHotel);

    this.router.navigate(['/hotels'])
  }


  onBack() {
    this.router.navigate(['/hotels']);
  }


}
