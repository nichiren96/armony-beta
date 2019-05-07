import { Component, OnInit } from '@angular/core';
import { Fare } from '../models/Fare.model';
import { Subscription } from 'rxjs';
import { FaresService } from '../services/fares.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-fare-list',
  templateUrl: './fare-list.component.html',
  styleUrls: ['./fare-list.component.css']
})
export class FareListComponent implements OnInit {

  fares: Fare[];
  faresSubscription: Subscription;

  constructor(private fareService: FaresService, private router: Router) { }

  ngOnInit() {
    this.faresSubscription = this.fareService.faresSubject.subscribe(
      (fares: Fare[]) => {
        this.fares = fares;
      }
    );
    this.fareService.getFares();
    this.fareService.emitFares();
  }

  onNewFare() {
    this.router.navigate(['/fares', 'new']);
  }

  onDeleteFare(fare: Fare) {
    this.fareService.removeFare(fare);
  }

  onViewFare(id: number) {
    this.router.navigate(['/fares', 'view', id]);
  }

  ngOnDestroy() {
    this.faresSubscription.unsubscribe();
  }

}
