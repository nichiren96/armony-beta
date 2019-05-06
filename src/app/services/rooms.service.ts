import { Injectable } from '@angular/core';
import { Room } from '../models/Room.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';


@Injectable()
export class RoomsService {

  rooms: Room[] = [];
  roomsSubject = new Subject<Room[]>();

  constructor() { }

  emitRooms() {
    this.roomsSubject.next(this.rooms);
  }

  saveRooms() {
    firebase.database().ref('/rooms').set(this.rooms);
  }

  getRooms() {
    firebase.database().ref('/rooms')
      .on('value', (data) => {
        this.rooms = data.val() ? data.val() : [];
        this.emitRooms();
      })
  }


  getSingleRoom(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/rooms/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewRoom(newRoom: Room) {

    this.rooms.push(newRoom);
    this.saveRooms();
    this.emitRooms();

  }

  updateRoom(room: Room) {
    firebase.database().ref('/rooms').update(room);
  }


  removeRoom(room: Room) {

    const roomIndexToRemove = this.rooms.findIndex(
      (roomEl) => {
        if (roomEl === room) {
          return true;
        }
      }
    );
    this.rooms.splice(roomIndexToRemove, 1);
    this.saveRooms();
    this.emitRooms();
  }

}
