import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ValuesModalPage } from '../modals/values-modal/values-modal/values-modal.page';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  loadProg_Low = 25;
  loadProg_Intermed = 50;
  loadProg_High = 75;
  loadProg_Sup = 100;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    
  }

  async openAlert() {
    const modal = await this.modalController.create({
      component: ValuesModalPage,
      initialBreakpoint: 0.5,
      breakpoints: [0, 0.5, 1]
    });
    return await modal.present();
  }

  /*updateColorBar (progress) {
    if (progress <= 25){
      return 'danger';
    } else if (progress >= 25 && progress > 50) {
      return 'warning';
    } else if (progress >= 50 && progress > 75) {
      return 'success';
    } else if (progress >= 75) {
      return 'secondary';
    }
 }*/

}
