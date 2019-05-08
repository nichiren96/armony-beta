import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Room } from '../../models/Room.model';
import { Category } from '../../models/Category.model';
import { Hotel } from '../../models/Hotel.model';
import { CategoriesService } from '../../services/categories.service';
import { RoomsService } from '../../services/rooms.service';
import { HotelsService } from '../../services/hotels.service';

@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.css']
})
export class RoomFormComponent implements OnInit {

  roomForm: FormGroup;

  categories: Category[];
  categoriesSubscription: Subscription;

  hotels: Hotel[];
  hotelsSubscription: Subscription;


  constructor(private formBuilder: FormBuilder,
              private categoryService: CategoriesService,
              private hotelService: HotelsService,
              private roomService: RoomsService,
              private router: Router) { }

  ngOnInit() {

    this.categoriesSubscription = this.categoryService.categoriesSubject.subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      }
    );

    this.categoryService.getCategories();
    this.categoryService.emitCategories();

    this.hotelsSubscription = this.hotelService.hotelsSubject.subscribe(
      (hotels: Hotel[]) => {
        this.hotels = hotels;
      }
    );

    this.hotelService.getHotels();
    this.hotelService.emitHotels();
   
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

  onSaveRoom() {
    const room_number = this.roomForm.get('room_number').value;
    const room_phone = this.roomForm.get('room_phone').value;
    const room_capacity = this.roomForm.get('room_capacity').value;
    const room_beds = this.roomForm.get('room_beds').value;
    const room_description = this.roomForm.get('room_description').value;
    const hotel = this.roomForm.get('hotel').value;
    const category = this.roomForm.get('category').value;


    const newRoom = new Room(room_number, room_phone, room_capacity, 
                  room_beds, room_description, hotel, category);

    this.roomService.createNewRoom(newRoom);

    this.router.navigate(['/rooms'])
  }


  onBack() {
    this.router.navigate(['/rooms']);
  }

 

}
