import { Component, OnInit } from '@angular/core';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router'

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  visible = true;

  constructor(private router: Router) { 
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationEnd: {
          this.visible = false;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.visible = false;
          break;
        }

        default: {
          break;
        }
        
      }
    });
  }

  ngOnInit() {
  }

  show() {
    
   
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }

}
