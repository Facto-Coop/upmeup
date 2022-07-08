import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(
              private menu: MenuController,
              private router: Router,
             ) { }

  ngOnInit() {
    this.menu.enable(false);
  }

  toRegister() {
    this.router.navigate(['/register']);
  }
}
