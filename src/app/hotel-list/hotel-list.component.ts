import { Component, OnInit } from '@angular/core';
import { Hotel } from '../models/Hotel.model';
import { Subscription } from 'rxjs';
import { HotelsService } from '../services/hotels.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit {

  hotels: Hotel[];
  hotelsSubscription: Subscription;

  constructor(private hotelService: HotelsService, private router: Router) { }

  ngOnInit() {
    this.hotelsSubscription = this.hotelService.hotelsSubject.subscribe(
      (hotels: Hotel[]) => {
        this.hotels = hotels;
      }
    );
    this.hotelService.getHotels();
    this.hotelService.emitHotels();
  }

  onNewHotel() {
    this.router.navigate(['hotels', 'new']);
  }

  onDeleteHotel(Hotel: Hotel) {
    this.hotelService.removeHotel(Hotel);
  }

  onViewHotel(id: number) {
    this.router.navigate(['hotels', 'view', id]);
  }

  ngOnDestroy() {
    this.hotelsSubscription.unsubscribe();
  }


}
