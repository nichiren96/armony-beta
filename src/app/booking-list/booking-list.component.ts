import { Component, OnInit } from '@angular/core';
import { Booking } from '../models/Booking.model';
import { Subscription } from 'rxjs';
import { BookingsService } from '../services/bookings.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {

  
  bookings: Booking[];
  bookingsSubscription: Subscription;

  constructor(private bookingService: BookingsService, private router: Router) { }

  ngOnInit() {
    this.bookingsSubscription = this.bookingService.bookingsSubject.subscribe(
      (bookings: Booking[]) => {
        this.bookings = bookings;
      }
    );
    this.bookingService.getBookings();
    this.bookingService.emitBookings();
  }

  onNewBooking() {
    this.router.navigate(['/bookings', 'new']);
  }

  onDeleteBooking(booking: Booking) {
    this.bookingService.removeBooking(booking);
  }

  onViewBooking(id: number) {
    this.router.navigate(['/bookings', 'view', id]);
  }

  ngOnDestroy() {
    this.bookingsSubscription.unsubscribe();
  }

}
