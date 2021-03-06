import { Component, OnInit } from '@angular/core';
import { Booking } from '../../models/Booking.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BookingsService } from '../../services/bookings.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from '../../models/Room.model';
import { Client } from '../../models/Client.model';
import { RoomsService } from '../../services/rooms.service';
import { ClientsService } from '../../services/clients.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-single-booking',
  templateUrl: './single-booking.component.html',
  styleUrls: ['./single-booking.component.css']
})
export class SingleBookingComponent implements OnInit {

  bookingForm: FormGroup;
  bookings: Booking[];
  booking_id: number;
  booking: Booking;
  bookingsSubscription: Subscription;

  rooms: Room[];
  roomsSubscription: Subscription;

  clients: Client[];
  clientsSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private bookingService: BookingsService,
    private roomService: RoomsService,
    private clientService: ClientsService,
    private router: Router) { }

  ngOnInit() {

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

    const id = this.route.snapshot.params['id'];
    this.booking_id = this.route.snapshot.params['id'];
    this.bookingService.getSingleBooking(+id).then(
      (booking: Booking) => {
        this.booking = booking;
      }
    );

    this.initForm();

  

  }

  
  

  initForm() {
    this.bookingForm = this.formBuilder.group({
      client: ['', Validators.required],
      room: ['', Validators.required],
      person: ['', Validators.required],
      amount:  ['', Validators.required],
      status:  ['', Validators.required],
      check_in:  ['', Validators.required],
      check_out:  ['', Validators.required],
      mean_of_payment: [''],
      payment_status: ['']
    });
  }

  onUpdateBooking() {

    const check_in = this.bookingForm.get('check_in').value;
    const check_out= this.bookingForm.get('check_out').value;
    const client_id = this.bookingForm.get('client').value;
    const room_id = this.bookingForm.get('room').value;
    const person = this.bookingForm.get('person').value;
    const amount = this.bookingForm.get('amount').value;
    const booking_status = this.bookingForm.get('status').value;
    const mean_of_payment =  this.bookingForm.get('mean_of_payment').value;
    const payment_status =  this.bookingForm.get('payment_status').value;

    const user_id = firebase.auth().currentUser.email;
 
    const booking_number = room_id + "/" +Date.now().toString()

    const booking = new Booking(booking_number, 
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
    
    this.bookingService.updateBooking(booking, this.booking_id);
    this.router.navigate(['/bookings'])
  }

  onBack() {
    this.router.navigate(['/bookings']);
  }

  getSelectedRoom(room_number: string) {
    if (this.booking.room_id == room_number) {
      return true;
    }
  }


}
