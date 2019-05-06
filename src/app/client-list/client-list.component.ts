import { Component, OnInit } from '@angular/core';
import { Client } from '../models/Client.model';
import { Subscription } from 'rxjs';
import { ClientsService } from '../services/clients.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  clients: Client[];
  clientsSubscription: Subscription;

  constructor(private clientService: ClientsService, private router: Router) { }

  ngOnInit() {
    this.clientsSubscription = this.clientService.clientsSubject.subscribe(
      (clients: Client[]) => {
        this.clients = clients;
      }
    );
    this.clientService.getClients();
    this.clientService.emitClients();
  }

  onNewClient() {
    this.router.navigate(['/clients', 'new']);
  }

  onDeleteClient(client: Client) {
    this.clientService.removeClient(client);
  }

  onViewClient(id: number) {
    this.router.navigate(['/clients', 'view', id]);
  }

  ngOnDestroy() {
    this.clientsSubscription.unsubscribe();
  }


}
