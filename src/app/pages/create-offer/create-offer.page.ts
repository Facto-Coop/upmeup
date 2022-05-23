/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { CompanyOffersService } from 'src/app/services/company-offers.service';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.page.html',
  styleUrls: ['./create-offer.page.scss'],
})
export class CreateOfferPage implements OnInit {
  createForm: FormGroup;
  isSubmitted = false;
  userID: any;
  cDate: string;
  addEnroll = 0;

  constructor(
              public fBuilder: FormBuilder,
              private mdlController: ModalController,
              private alrtController: AlertController,
              private compOfService: CompanyOffersService
              ) { }

  ngOnInit() {
    this.userID = localStorage.getItem('userid');
    this.validation();
  }

  validation() {
    this.createForm = this.fBuilder.group({
      iTitle: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
      iCity: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      iRangoSalarial: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
      iRemoto: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      iTipoContrato: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(35)]],
      iJornada: ['', [Validators.required, Validators.maxLength(30)]],
    });
  }

  get errorCtr() {
    return this.createForm.controls;
  }

  /**
   * Close modal when create
   */
  async dismissEditModal() {
    this.mdlController.dismiss();
  }

  cancelCreation(){
    this.createForm.reset();
    // Alert to confirm:
    this.alertToConfirm();
  }

  getDate() {
    this.cDate = new Date().toISOString();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (!this.createForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      this.getDate();
      this.createNewOffer(
            this.userID,
            this.createForm.value.iTitle,
            this.createForm.value.iCity,
            this.createForm.value.iJornada,
            this.createForm.value.iRangoSalarial,
            this.createForm.value.iRemoto,
            this.addEnroll,
            this.createForm.value.iTipoContrato,
            this.cDate
      );
    }
  }

  /**
   * Call to Create Offer Service.
   * @param uId
   * @param iTitle
   * @param iCity
   * @param iJornada
   * @param iRango
   * @param iRemoto
   * @param iEnroll
   * @param iContrato
   * @param iDate
   */
  createNewOffer(uId: any, iTitle: any, iCity: any, iJornada: any, iRango: any, iRemoto: any, iEnroll: any, iContrato: any, iDate: string) {
   this.compOfService.mCreateOffer(uId, iTitle, iCity, iJornada, iRango, iRemoto, iEnroll, iContrato, iDate)
    .subscribe((response) => {
      console.log('Done!');
    });
    this.dismissEditModal();
  }

  /**
   * Alert to confirm action
   */
  async alertToConfirm() {
    const alert = await this.alrtController.create({
      header: 'Cancelar oferta',
      message: 'Seguro que quieres cancelar la creación de oferta?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Okay',
          id: 'confirm-button',
          handler: () => {
            console.log('Confirm Okay');
            this.dismissEditModal();
          }
        }
      ]
    });

    await alert.present();
  }

}
