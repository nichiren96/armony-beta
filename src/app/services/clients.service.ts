import { Injectable } from '@angular/core';
import { Client } from '../models/Client.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';

@Injectable()
export class ClientsService {

  clients: Client[] = [];
  clientsSubject = new Subject<Client[]>();

  constructor() { }

  emitClients() {
    this.clientsSubject.next(this.clients);
  }

  saveClients() {
    firebase.database().ref('/clients').set(this.clients);
  }

  getClients() {
    firebase.database().ref('/clients')
      .on('value', (data) => {
        this.clients = data.val() ? data.val() : [];
        this.emitClients();
      })
  }


  getSingleClient(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/clients/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  getSingleByPasseport(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/clients/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewClient(newClient: Client) {

    this.clients.push(newClient);
    this.saveClients();
    this.emitClients();

  }

  updateClient(client: Client, id: number) {

    firebase.database().ref('clients/' + id).update(client);
    this.emitClients();

  }


  removeClient(Client: Client) {

    const ClientIndexToRemove = this.clients.findIndex(
      (ClientEl) => {
        if (ClientEl === Client) {
          return true;
        }
      }
    );
    this.clients.splice(ClientIndexToRemove, 1);
    this.saveClients();
    this.emitClients();
  }


}
