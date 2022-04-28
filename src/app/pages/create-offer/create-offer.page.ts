/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Apollo, gql, Subscription } from 'apollo-angular';


const MUT_CREATEOFFER = gql`
  mutation createOfferMut($userId: String!, 
                          $title: String!, 
                          $city: String!, 
                          $jornada: String!, 
                          $rangoSalarial: String!, 
                          $remoto: String!,
                          $enrolled: Float!, 
                          $tipoContrato: String!,
                          $createdDate: DateTime!) {
    createOffer(
      createOfferDto: { 
        userId: $userId
        title: $title
        city: $city
        jornada: $jornada
        rangoSalarial: $rangoSalarial
        remoto: $remoto
        enrolled: $enrolled
        tipoContrato: $tipoContrato
        createdDate: $createdDate
      }    
    ) {
      _id
      userId
      title
      city
      jornada
      rangoSalarial
      remoto
      enrolled
      tipoContrato
      createdDate
    }
  }
`;


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
              private apollo: Apollo,
              private router: Router
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

  async dismissEditModal() {
    this.mdlController.dismiss();
  }

  cancelCreation(){
    this.createForm.reset();
    // Alert to confirm:
    this.alertToConfirm();
  }

  // TODO: Add 'createDate = TODAY' & 'enrolled = 0'
  getDate() {
    this.cDate = new Date().toISOString();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (!this.createForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      console.log(this.createForm.value);
      this.getDate();
      this.createNewOffer();
    }
  }

  createNewOffer() {
    this.apollo.mutate<any>({
      mutation: MUT_CREATEOFFER,
      variables: {
        userId: this.userID,
        title: this.createForm.value.iTitle,
        city: this.createForm.value.iCity,
        jornada: this.createForm.value.iJornada,
        rangoSalarial: this.createForm.value.iRangoSalarial,
        remoto: this.createForm.value.iRemoto,
        enrolled: this.addEnroll,
        tipoContrato: this.createForm.value.iTipoContrato,
        createdDate: this.cDate
      }
    }).subscribe((response) => {
      console.log('Done!: ', response);
      // Return to MyOffers:
      this.dismissEditModal();
      window.location.reload();
    },(error) => { console.log('Mutation Error:', error); });
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
