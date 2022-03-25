import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private alertCtrl: AlertController,
              private auth: AuthService){

  }

  canActivate(route: ActivatedRouteSnapshot) {
    return true;
  }

  async showAlert() {
    let alert = await this.alertCtrl.create({
      header: 'Unauthorized',
      message: 'No puedes entrar aquí :)',
      buttons: ['Ok']
    });
    alert.present();
  }
}
