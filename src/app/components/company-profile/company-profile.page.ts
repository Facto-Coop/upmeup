import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ValuesModalPage } from 'src/app/shared/modals/values-modal/values-modal.page';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.page.html',
  styleUrls: ['./company-profile.page.scss'],
})
export class CompanyProfilePage implements OnInit {

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
}
