import { Injectable } from '@angular/core';
import { Hotel } from '../models/Hotel.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';

@Injectable()
export class HotelsService {

  hotels: Hotel[] = [];
  hotelsSubject = new Subject<Hotel[]>();

  constructor() { }

  emitHotels() {
    this.hotelsSubject.next(this.hotels);
  }

  saveHotels() {
    firebase.database().ref('/hotels').set(this.hotels);
  }

  getHotels() {
    firebase.database().ref('hotels')
      .on('value', (data) => {
        this.hotels = data.val() ? data.val() : [];
        this.emitHotels();
      })
  }


  getSingleHotel(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/hotels/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewHotel(newHotel: Hotel) {

    this.hotels.push(newHotel);
    this.saveHotels();
    this.emitHotels();

  }

  updateHotel(hotel: Hotel, id: number) {
    firebase.database().ref('clients/' + id).update(hotel);
    this.emitHotels();

  }


  removeHotel(hotel: Hotel) {

    const hotelIndexToRemove = this.hotels.findIndex(
      (hotelEl) => {
        if (hotelEl === hotel) {
          return true;
        }
      }
    );
    this.hotels.splice(hotelIndexToRemove, 1);
    this.saveHotels();
    this.emitHotels();
  }

}
