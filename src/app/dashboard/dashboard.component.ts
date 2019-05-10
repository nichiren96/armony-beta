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
    this.bookingService.getBookingByStatus()
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
/*
    this.bookingService.getBookingByRoomNumber("23").then(
      (bookings: Booking[]) => {
        bookings.forEach((booking) => {
          console.log("CHAMBRE N° " + booking.room_id);
          console.log("Début séjour " + booking.check_in);
          console.log("Fin séjour " + booking.check_out);
          console.log("CLient " + booking.client_id);
          console.log("===============================================");
          

        });
      }
    );*/
  }

}
