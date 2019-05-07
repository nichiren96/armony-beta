import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Hotel } from '../../models/Hotel.model';
import { HotelsService } from '../../services/hotels.service';

@Component({
  selector: 'app-single-hotel',
  templateUrl: './single-hotel.component.html',
  styleUrls: ['./single-hotel.component.css']
})
export class SingleHotelComponent implements OnInit {

  hotelForm: FormGroup;
  hotel: Hotel;
  hotel_id: number;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private hotelService: HotelsService,
              private router: Router) { }


  

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.hotel_id = this.route.snapshot.params['id'];
    this.hotelService.getSingleHotel(+id).then(
      (hotel: Hotel) => {
        this.hotel = hotel;
      }
    );
    this.initForm();
  }

  initForm() {
    this.hotelForm = this.formBuilder.group({
      name: ['', Validators.required],
      city: ['', Validators.required],
      description: ['', Validators.required],
      logo: ['', Validators.required],
      phone: ['', Validators.required],
      classe: ['', Validators.required],   
        
    });
  }

  onUpdateHotel() {
    const name = this.hotelForm.get('name').value;
    const city = this.hotelForm.get('city').value;
    const description = this.hotelForm.get('description').value;
    const classe = this.hotelForm.get('classe').value;
    const phone = this.hotelForm.get('phone').value;
    const logo = this.hotelForm.get('logo').value;
    

    const hotel = new Hotel(name, city, logo, phone, description, classe);

    this.hotelService.updateHotel(hotel, this.hotel_id);

    this.router.navigate(['/hotels'])
  }


  onBack() {
    this.router.navigate(['/hotels']);
  }


}
