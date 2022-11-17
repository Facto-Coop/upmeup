import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  appPages = [];
  userName = sessionStorage.getItem('user');
  userType = sessionStorage.getItem('type');

  constructor(
              public auth: AuthService,
              private router: Router,
              public menuCtrl: MenuController
              ) {  }

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
    //alert ('Se ha cerrado la sesión.');
    this.router.navigate(['/login']);
  }

  //TODO: Reload page for updates.


}
