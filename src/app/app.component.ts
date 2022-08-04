/* eslint-disable prefer-const */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from './services/auth.service';

import { WebsocketService } from "./services/websocket.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [WebsocketService]
})
export class AppComponent {
  appPages = [];
  userName = sessionStorage.getItem('user');
  userType = sessionStorage.getItem('type');

  //***************** SOCKET-SERVICE TEST **********/
  title = 'socketrv';
  content = '';
  received = [];
  sent = [];

  constructor(
              public auth: AuthService,
              private router: Router,
              public menuCtrl: MenuController,
              private testSocketServ: WebsocketService
              ) {
                testSocketServ.messages.subscribe((msg: any) => {
                  this.received.push(msg);
                  console.log('Response from websocket: ' + msg);
                });
              }

  menuView(res, userType) {
    if(res === true){
      if (userType === '2') {
        this.appPages = [
          { title: 'Perfil', url: '/company-profile', icon: 'person'  },
          { title: 'Les Meves Ofertes', url: '/company-offer', icon: 'briefcase' },
        ];
        //this.openMenu('company-profile');
      } else if(userType === '1') {
        this.appPages = [
          { title: 'Perfil', url: '/user-profile', icon: 'person' },
          { title: 'Ofertes', url: '/offer-list', icon: 'briefcase' },
          //{ title: 'Entities', url: '/entity-list', icon: 'business' },
        ];
        // this.openMenu('offer-list');
      }
    } //else {
      //alert ('Se ha cerrado la sesión.');
      //this.router.navigate(['/login']);
    //}
  }

  logginMenu(uType, uName) {
    this.auth.isLoggedIn.subscribe(
      (res: any) => {
        //console.log('RES: ', res);
        this.userName = uName;
        this.userType = uType;
        this.menuView(res, uType);
      },
      (error: any) => {
        console.log('Ha ocurrido un error...' + error);
      });
  }

  /* openMenu(page) {
    this.router.navigate([page]); --> To test.
  }*/

  logOut() {
    this.auth.onLogout();
    this.menuCtrl.enable(false);
    alert ('Se ha cerrado la sesión.');
    this.router.navigate(['/login']);
  }

 //*********  TEST MSM WEBSOCKET:  ******/

  sendMsg() {
    let message = {
      source: '',
      content: ''
    };
    message.source = 'localhost';
    message.content = this.content;
console.log(message);

    this.sent.push(message);
    this.testSocketServ.messages.next(message);
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  envio_mens($event) {
    this.content = $event.target.value;
  }

}
