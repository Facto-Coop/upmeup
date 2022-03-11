import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Login', url: '/login', icon: 'key' },
    { title: 'Profile', url: '/user-profile', icon: 'person' },
    { title: 'Offers', url: '/offer-list', icon: 'briefcase' },
    { title: 'Entities', url: '/entity-list', icon: 'business' },
    // { title: 'Home', url: '/home', icon: 'home' },
    // { title: 'Acceso', url: '/acceso', icon: 'key' },
  ];
  constructor() {}
}
