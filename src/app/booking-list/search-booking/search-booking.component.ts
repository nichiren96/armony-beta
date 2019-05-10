import { Component, OnInit } from '@angular/core';
import { Booking } from '../../models/Booking.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookingsService } from '../../services/bookings.service';

@Component({
  selector: 'app-search-booking',
  templateUrl: './search-booking.component.html',
  styleUrls: ['./search-booking.component.css']
})
export class SearchBookingComponent implements OnInit {

  bookingSearchForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private bookingService: BookingsService,) { }

  ngOnInit() {

    this.initForm();
  }

  initForm() {
    this.bookingSearchForm = this.formBuilder.group({

      person: ['', Validators.required],
      check_in: ['', Validators.required],
      check_out: ['', Validators.required],
 
    });
  }

  onSearchBooking() {
    console.log('OK')
  }

  onBack() {
    console.log();
  }
  

}
