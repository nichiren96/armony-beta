import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor() {
    var firebaseConfig = {
      apiKey: "AIzaSyCrzIuyA9wiWJi2RozZcUkBc8YNca2vESk",
      authDomain: "armony-suite.firebaseapp.com",
      databaseURL: "https://armony-suite.firebaseio.com",
      projectId: "armony-suite",
      storageBucket: "armony-suite.appspot.com",
      messagingSenderId: "1072827439316",
      appId: "1:1072827439316:web:bfb4b2c7a133c906"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
