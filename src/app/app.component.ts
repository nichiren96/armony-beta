import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor() {
    var config = {
      apiKey: "AIzaSyDiuoRrODxHGO-aM5fLE-0QKi-h-sjOEmw",
      authDomain: "lazandraha-9b719.firebaseapp.com",
      databaseURL: "https://lazandraha-9b719.firebaseio.com",
      projectId: "lazandraha-9b719",
      storageBucket: "lazandraha-9b719.appspot.com",
      messagingSenderId: "815920179583"
  };
  firebase.initializeApp(config);
  }
}
