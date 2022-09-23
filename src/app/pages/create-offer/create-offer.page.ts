/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { map } from 'rxjs';
import { CompanyOffersService } from 'src/app/services/company-offers.service';
import { CompetenceService } from 'src/app/services/competence.service';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.page.html',
  styleUrls: ['./create-offer.page.scss'],
})
export class CreateOfferPage implements OnInit {
  cityList: any[] = ['Corunya', 'Almeria', 'Astúries', 'Avila', 'Badajoz', 'Barcelona', 'Burgos', 'Càceres', 'Cadis', 'Cantàbria', 'Castelló', 'Ceuta', 'Ciudad Real',
  'Còrdova', 'Conca', 'Formentera', 'Girona', 'Granada', 'Guadalajara', 'Guipuzcoa', 'Huelva', 'Osca', 'Eivissa', 'Jaén', 'La Rioja', 'Gran Canària', 'Fuerteventura',
  'Lanzarote', 'Lleó', 'Lleida', 'Lugo', 'Madrid', 'Màlaga', 'Mallorca', 'Menorca', 'Múrcia', 'Navarra', 'Orense', 'Palència', 'Pontevedra', 'Salamanca', 'Tenerife',
  'La Gomera', 'La Palma', 'El Hierro', 'Segòvia', 'Sevilla', 'Sòria', 'Tarragona', 'Terol', 'Toledo', 'València', 'Valladolid', 'Biscaia', 'Zamora', 'Saragossa'];

  createForm: FormGroup;
  isSubmitted = false;
  userID: any;
  cDate: string;
  addEnroll = 0;

  competList: any[] = [];
  offerCompets: any[] = [];
  offerCompetsIds: any[] = [];
  nameNewCompet: any = [];

  constructor(
              public fBuilder: FormBuilder,
              private mdlController: ModalController,
              private alrtController: AlertController,
              private compOfService: CompanyOffersService,
              private competService: CompetenceService,
              public loadingCtrl: LoadingController
              ) { }

  ngOnInit() {
    this.userID = sessionStorage.getItem('userid');
    this.qGetCompetencies();
    this.validation();
  }

  validation() {
    this.createForm = this.fBuilder.group({
      iTitle: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
      iEduLevel: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      iCompetence: ['', [Validators.required,  Validators.minLength(4), Validators.maxLength(20)]],
      iCity: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      iRangoSalarial: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
      iRemoto: ['', [Validators.required]],
      iTipoContrato: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(35)]],
      iJornada: ['', [Validators.required, Validators.maxLength(30)]],
      iDescripcio: ['', [Validators.required,  Validators.minLength(40), Validators.maxLength(600)]],
      iRequirements: ['', [Validators.required,  Validators.minLength(40), Validators.maxLength(600)]]
    });
  }

  qGetCompetencies() {
    this.competService.qGetCompetencies().valueChanges.pipe(
      map(result => {
        this.competList = result.data.getCompetencies;
      })
    ).subscribe((item) => {
      //console.log(this.competList);
    });
  }

  get errorCtr() {
    return this.createForm.controls;
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
      this.insertedTags(this.createForm.value.iCompetence);

      this.loadingCtrl.create({
        message: 'Creant nou usuari...'
      }).then(async res => {
        res.present();
        console.log('Guardando info...!');
        this.getDate();
        this.findCompetence(this.nameNewCompet);

        await this.createNewOffer(
            this.userID,
            this.createForm.value.iTitle,
            this.createForm.value.iEduLevel,
            this.offerCompetsIds,
            this.createForm.value.iCity,
            this.createForm.value.iJornada,
            this.createForm.value.iRangoSalarial,
            this.createForm.value.iRemoto,
            this.addEnroll,
            this.createForm.value.iTipoContrato,
            this.createForm.value.iDescripcio,
            this.createForm.value.iRequirements,
            this.cDate
        );
        this.loadingCtrl.dismiss();
      });
    }
  }

  //Created new competence if not exist yet
  insertedTags(competencies) {
    const existCompets = [];

    competencies.forEach(el => {
      if(!el._id && !el.name) {
        this.createNewCompetence(el.value);
        this.nameNewCompet.push(el);
      } else {
        existCompets.push(el);
        this.offerCompetsIds.push(el._id);
      }
    });
    this.offerCompets.push(existCompets);
  }

  //Call to create new competencies service:
  createNewCompetence(iName: any) {
    this.competService.mCreateCompetence(iName).subscribe(() => {
      console.log('New Competence created!');
    });
  }

  //Find id of new competencies:
  findCompetence(names) {
    names.forEach(el => {
      const index = this.competList.findIndex(
        object => object.name === el.value
      );

      if(index === -1) {
        console.log('No se encuentra competència!!');
      } else {
        this.offerCompetsIds.push(this.competList[index]._id);
      }
    });
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
  createNewOffer(uId: any, iTitle: any, iEduLevel: any, iCompetence: any, iCity: any, iJornada: any, iRango: any, iRemoto: any, iEnroll: any, iContrato: any, iDescripcio: any, iRequirements: any, iDate: string) {
   this.compOfService.mCreateOffer(uId, iTitle, iEduLevel, iCompetence, iCity, iJornada, iRango, iRemoto, iEnroll, iContrato, iDescripcio, iRequirements, iDate)
    .subscribe(() => {
      console.log('New Competence created!');
    });
    this.dismissEditModal();
  }

  // Delete function to competencies/tags.
  removeCompetence(item) {
    const tags = this.createForm.value.iCompetence;
    const index = tags.indexOf(item);
    tags.splice(index, 1);
  }

  /**
   * Close modal when create
   */
   async dismissEditModal() {
    this.mdlController.dismiss();
  }

  @HostListener('window:popstate', ['$event'])
  dismissModal() {
    this.mdlController.dismiss();
  }

  /*cancelCreation(){
    this.createForm.reset();
    // Alert to confirm:
    this.alertToConfirm();
  }*/

  /**
   * Alert to confirm action
   */
  /*async alertToConfirm() {
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
  }*/

}
