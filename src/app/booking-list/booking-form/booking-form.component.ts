import { Component, OnInit } from '@angular/core';
import { Booking } from '../../models/Booking.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BookingsService } from '../../services/bookings.service';
import { Router } from '@angular/router';
import { Room } from '../../models/Room.model';
import { Client } from '../../models/Client.model';
import { RoomsService } from '../../services/rooms.service';
import { ClientsService } from '../../services/clients.service';
import * as firebase from 'firebase';


@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent implements OnInit {

  room_price: string;
 
  bookingForm: FormGroup;
  bookings: Booking[];
  bookingsSubscription: Subscription;

  rooms: Room[];
  roomsSubscription: Subscription;

  room: Room;

  clients: Client[];
  clientsSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
    private bookingService: BookingsService,
    private roomService: RoomsService,
    private clientService: ClientsService,
    private router: Router) { }

  ngOnInit() {

    this.room_price = '';

    this.roomsSubscription = this.roomService.roomsSubject.subscribe(
      (rooms: Room[]) => {
        this.rooms = rooms;
      }
    );

    this.roomService.getRooms();
    this.roomService.emitRooms();

    this.clientsSubscription = this.clientService.clientsSubject.subscribe(
      (clients: Client[]) => {
        this.clients = clients;
      }
    );

    this.clientService.getClients()
    this.clientService.emitClients();

    this.initForm();

  

  }

  initForm() {
    this.bookingForm = this.formBuilder.group({
      client: ['', Validators.required],
      room: ['', Validators.required],
      person: ['', Validators.required],
      amount: ['ppppp', Validators.required],
      status: ['', Validators.required],
      check_in: ['', Validators.required],
      check_out: ['', Validators.required],
      mean_of_payment: [''],
      payment_status: ['']
    });
  }

  onSaveBooking() {

    const check_in = this.bookingForm.get('check_in').value;
    const check_out = this.bookingForm.get('check_out').value;
    const client_id = this.bookingForm.get('client').value;
    const room_id = this.bookingForm.get('room').value;
    const person = this.bookingForm.get('person').value;
    const amount = this.bookingForm.get('amount').value;
    const booking_status = this.bookingForm.get('status').value;
    const mean_of_payment = this.bookingForm.get('mean_of_payment').value;
    const payment_status = this.bookingForm.get('payment_status').value;

    const user_id = firebase.auth().currentUser.email;



    const booking_number = room_id + "/" + Date.now().toString()

    const newBooking = new Booking(Date.now().toString(),
      check_in,
      check_out,
      person,
      amount,
      booking_status,
      payment_status,
      mean_of_payment,
      client_id,
      room_id,
      user_id);

    this.bookingService.createNewBooking(newBooking);
    this.router.navigate(['/bookings'])
  }

  onChange(room_number: string) {
    console.log(this.getRoomFare(room_number));
  }

  changeRoomPrice(price: string) {
    this.room_price = price;
  }

  onBack() {
    this.router.navigate(['/bookings']);
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
               

                console.log(fare.price);
               
              }
           
            });
          });
        }
      });
    });

    
    
  }



}
