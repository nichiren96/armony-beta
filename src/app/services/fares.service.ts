import { Injectable } from '@angular/core';
import { Fare } from '../models/Fare.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';

@Injectable()
export class FaresService {

  fares: Fare[] = [];
  faresSubject = new Subject<Fare[]>();

  constructor() { }

  emitFares() {
    this.faresSubject.next(this.fares);
  }

  saveFares() {
    firebase.database().ref('/fares').set(this.fares);
  }

  getFares() {
    firebase.database().ref('/fares')
      .on('value', (data) => {
        this.fares = data.val() ? data.val() : [];
        this.emitFares();
      })
  }


  getSingleFare(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/fares/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewFare(newFare: Fare) {

    this.fares.push(newFare);
    this.saveFares();
    this.emitFares();

  }

  updateFare(fare: Fare) {
    firebase.database().ref('/fares').update(fare);
  }


  removeFare(fare: Fare) {

    const fareIndexToRemove = this.fares.findIndex(
      (FareEl) => {
        if (FareEl === fare) {
          return true;
        }
      }
    );
    this.fares.splice(fareIndexToRemove, 1);
    this.saveFares();
    this.emitFares();
  }


}
