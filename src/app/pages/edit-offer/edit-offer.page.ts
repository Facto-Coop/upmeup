/* eslint-disable max-len */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { Offer } from 'src/app/models/offer';
import { CompanyOffersService } from 'src/app/services/company-offers.service';


@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
  editForm: UntypedFormGroup;
  isSubmitted = false;
  offerID: any;

  @Input() offer: Offer[];

  constructor(
      public fBuilder: UntypedFormBuilder,
      private mdlController: ModalController,
      private alrtController: AlertController,
      private compOfService: CompanyOffersService,
    ) { }

  ngOnInit() {
    this.initForm();
    this.setValues(this.offer);
  }

  /**
   * Initialized form
   */
   initForm(){
    this.editForm = this.fBuilder.group({
      iTitle: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
      iEduLevel: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      iCity: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      iRangoSalarial: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
      iRemoto: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      iTipoContrato: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(35)]],
      iJornada: ['', [Validators.required, Validators.maxLength(30)]],
      iDescripcio: ['', [Validators.required,  Validators.minLength(40), Validators.maxLength(600)]],
      iRequirements: ['', [Validators.required,  Validators.minLength(40), Validators.maxLength(600)]],
    });
  }

  /**
   * Set values form 'father' component.
   * @param infoOffer
   */
  setValues(infoOffer) {
    this.offerID = infoOffer._id;
    this.editForm.get('iTitle').setValue(infoOffer.title);
    this.editForm.get('iEduLevel').setValue(infoOffer.eduLevel);
    this.editForm.get('iCity').setValue(infoOffer.city);
    this.editForm.get('iRangoSalarial').setValue(infoOffer.rangoSalarial);
    this.editForm.get('iRemoto').setValue(infoOffer.remoto);
    this.editForm.get('iTipoContrato').setValue(infoOffer.tipoContrato);
    this.editForm.get('iJornada').setValue(infoOffer.jornada);
    this.editForm.get('iDescripcio').setValue(infoOffer.description);
    this.editForm.get('iRequirements').setValue(infoOffer.requirements);
  }

  /**
   * Submit Form
   * @returns 
   */
  onSubmit() {
    this.isSubmitted = true;
    if (!this.editForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      this.editOffer(
          this.offerID,
          this.editForm.value.iTitle,
          this.editForm.value.iEduLevel,
          this.editForm.value.iCity,
          this.editForm.value.iJornada,
          this.editForm.value.iRangoSalarial,
          this.editForm.value.iRemoto,
          this.editForm.value.iTipoContrato,
          this.editForm.value.iDescripcio,
          this.editForm.value.iRequirements
      );
    }
  }

  /**
   * Get values from form and update info.
   */
   editOffer(oId: any, iTitle: any, iEduLevel: any, iCity: any, iJornada: any, iRango: any, iRemoto: any, iContrato: any, iDescripcio: any, iRequirements: any){
    this.compOfService.mEditOffer(oId, iTitle, iEduLevel, iCity, iJornada, iRango, iRemoto, iContrato, iDescripcio, iRequirements)
    .subscribe((response) => {
      console.log('Edition done!');
    });
    this.dismissEditModal();
  }

  get errorCtr() {
    return this.editForm.controls;
  }

  cancelEdition(){
    //this.editForm.reset();
    // Alert to confirm:
    this.alertToConfirm();
  }

  /**
   * Close modal when update
   */
  async dismissEditModal() {
    this.mdlController.dismiss();
  }

  /**
   * Alert to confirm action
   */
   async alertToConfirm() {
    const alert = await this.alrtController.create({
      header: 'Cancelar edición',
      message: 'Seguro que quieres cancelar la edición de la oferta?',
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
