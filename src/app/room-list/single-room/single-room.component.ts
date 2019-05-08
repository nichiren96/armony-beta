import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from '../../models/Room.model';
import { RoomsService } from '../../services/rooms.service';


@Component({
  selector: 'app-single-room',
  templateUrl: './single-room.component.html',
  styleUrls: ['./single-room.component.css']
})
export class SingleRoomComponent implements OnInit {

  roomForm: FormGroup;
  room: Room;
  room_id: number;

  constructor(private formBuilder: FormBuilder,
               private route: ActivatedRoute,
              private roomService: RoomsService,
              private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.room_id = this.route.snapshot.params['id'];
    this.roomService.getSingleRoom(+id).then(
      (room: Room) => {
        this.room = room;
      }
    );
    this.initForm();
  }

  initForm() {
    this.roomForm = this.formBuilder.group({
      category: ['', Validators.required],
      room_number: ['', Validators.required],
      room_phone: [''],
      room_capacity: ['', Validators.required],
      room_beds: ['', Validators.required],
      room_description: [''],   
      hotel: ['']
    });
  }

  onUpdateRoom() {
    const room_number = this.roomForm.get('room_number').value;
    const room_phone = this.roomForm.get('room_phone').value;
    const room_capacity = this.roomForm.get('room_capacity').value;
    const room_beds = this.roomForm.get('room_beds').value;
    const room_description = this.roomForm.get('room_description').value;
    const hotel = this.roomForm.get('hotel').value;
    const category = this.roomForm.get('category').value;


    const room = new Room(room_number, room_phone, room_capacity, 
                  room_beds, room_description, hotel, category);

    this.roomService.updateRoom(room, this.room_id);

    this.router.navigate(['/rooms'])
  }


  onBack() {
    this.router.navigate(['/rooms']);
  }

 


}
