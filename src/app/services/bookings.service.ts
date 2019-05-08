import { Injectable } from '@angular/core';
import { Booking } from '../models/Booking.model';
import { Subject } from 'rxjs/';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  bookings: Booking[] = [];
  bookingsSubject = new Subject<Booking[]>();


  constructor() { }

  emitBookings() {
    this.bookingsSubject.next(this.bookings);
  }

  saveBookings() {
    firebase.database().ref('/bookings').set(this.bookings);
  }

  getBookings() {
    firebase.database().ref('/bookings')
      .on('value', (data) => {
        this.bookings = data.val() ? data.val() : [];
        this.emitBookings();
      })
  }

  getSingleBooking(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/bookings/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewBooking(newBooking: Booking) {
    this.bookings.push(newBooking);
    this.saveBookings();
    this.emitBookings();
  }

  updateBooking(booking: Booking, id: number) {

    firebase.database().ref('bookings/' + id).update(booking);
    this.emitBookings();

  }

  removeBooking(Booking: Booking) {

    const bookingIndexToRemove = this.bookings.findIndex(
      (BookingEl) => {
        if (BookingEl === Booking) {
          return true;
        }
      }
    );
    this.bookings.splice(bookingIndexToRemove, 1);
    this.saveBookings();
    this.emitBookings();
  }
}
