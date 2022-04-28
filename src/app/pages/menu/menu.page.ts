import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
 /* pages = [
    { title: 'Login', url: '/login', icon: 'key' },
    { title: 'Profile', url: '/user-profile', icon: 'person' },
    { title: 'Offers', url: '/offer-list', icon: 'briefcase' },
    { title: 'Entities', url: '/entity-list', icon: 'business' },
  ];

  selectedPath = '';

  constructor(private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
   }*/

  ngOnInit() {
  }

}
