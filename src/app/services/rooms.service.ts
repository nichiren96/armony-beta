import { Injectable } from '@angular/core';
import { Room } from '../models/Room.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import { FaresService } from './fares.service';
import { stringify } from '@angular/compiler/src/util';

@Injectable()
export class RoomsService {

  rooms: Room[] = [];
  roomsSubject = new Subject<Room[]>();

  

  constructor(fareService: FaresService) { }

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

  
  getRoomFare(room_number: string) {

   

    firebase.database().ref('rooms').once('value', function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var childKey = childSnapshot.key;
        var room = childSnapshot.val();

        if (room.room_number === room_number) {
         
          firebase.database().ref('fares').once('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
           
              var fare = childSnapshot.val();
      
              if (fare.category_id === room.category_id) {
               
               
              
              }
           
            });
          });
        }
     
        
      });
    });

   

  }


  createNewRoom(newRoom: Room) {

    this.rooms.push(newRoom);
    this.saveRooms();
    this.emitRooms();

  }

  updateRoom(room: Room, id: number) {
    firebase.database().ref('rooms/' + id).update(room);
    this.emitRooms();
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
