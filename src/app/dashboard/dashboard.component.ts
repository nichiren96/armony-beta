import { Component, OnInit } from '@angular/core';
import { BookingsService } from '../services/bookings.service'
import { Booking } from '../models/Booking.model'
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  toDayCheckIn: number = 0;
  unconfirmedBooking: number = 0;
  confirmedBooking: number = 0;
  cancelledBooking: number = 0;

  bookings: Booking[];
  bookingsSubscription: Subscription;


  constructor(private bookingService: BookingsService) { }

  ngOnInit() {
    this.bookingService.getBookingsByStatus()
      .then((bookings: Booking[]) => {
        bookings.forEach((booking) => {
          if(booking.status == "En attente") {
            this.unconfirmedBooking++;
          }
          else if (booking.status == "Validée") {
            this.confirmedBooking++;
          }
          else if (booking.status == "Annulée") {
            this.cancelledBooking++;
          }
        });
      });

    this.bookingService.getBookingsByRoomNumber("342").then(
      (bookings: Booking[]) => {
        this.bookings = bookings;
      }
    )
  }

}
