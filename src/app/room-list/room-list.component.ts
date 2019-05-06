import { Component, OnInit } from '@angular/core';
import { Room } from '../models/Room.model';
import { Subscription } from 'rxjs/Subscription';
import { RoomsService } from '../services/rooms.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {

  rooms: Room[];
  roomsSubscription: Subscription;

  constructor(private roomService: RoomsService, private router: Router) { }

  ngOnInit() {
    this.roomsSubscription = this.roomService.roomsSubject.subscribe(
      (rooms: Room[]) => {
        this.rooms = rooms;
      }
    );
    this.roomService.getRooms();
    this.roomService.emitRooms();
  }

  onNewRoom() {
    this.router.navigate(['/rooms', 'new']);
  }

  onDeleteRoom(room: Room) {
    this.roomService.removeRoom(room);
  }

  onViewRoom(id: number) {
    this.router.navigate(['/rooms', 'view', id]);
  }

  ngOnDestroy() {
    this.roomsSubscription.unsubscribe();
  }

}
