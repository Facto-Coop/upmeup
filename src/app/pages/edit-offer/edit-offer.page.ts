/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AlertController, ModalController } from '@ionic/angular';
import { map } from 'rxjs';
import { Offer } from 'src/app/models/offer';
import { CompanyOffersService } from 'src/app/services/company-offers.service';
import { CompetenceService } from 'src/app/services/competence.service';


@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
  cityList: any[] = ['Corunya', 'Almeria', 'Astúries', 'Avila', 'Badajoz', 'Barcelona', 'Burgos', 'Càceres', 'Cadis', 'Cantàbria', 'Castelló', 'Ceuta', 'Ciudad Real',
  'Còrdova', 'Conca', 'Formentera', 'Girona', 'Granada', 'Guadalajara', 'Guipuzcoa', 'Huelva', 'Osca', 'Eivissa', 'Jaén', 'La Rioja', 'Gran Canària', 'Fuerteventura',
  'Lanzarote', 'Lleó', 'Lleida', 'Lugo', 'Madrid', 'Màlaga', 'Mallorca', 'Menorca', 'Múrcia', 'Navarra', 'Orense', 'Palència', 'Pontevedra', 'Salamanca', 'Tenerife',
  'La Gomera', 'La Palma', 'El Hierro', 'Segòvia', 'Sevilla', 'Sòria', 'Tarragona', 'Terol', 'Toledo', 'València', 'Valladolid', 'Biscaia', 'Zamora', 'Saragossa'];

  editForm: FormGroup;
  isSubmitted = false;
  offerID: any;
  competList: any[] = [];

  offerCompetIDs: any[] = [];
  selectedCompet: any[] = [];
  newOfferCompets: any[] = [];
  newOfferCompetsList: any[] = [];
  nameNewCompet: any[] = [];

  @Input() offerData: Offer;

  constructor(
      public fBuilder: FormBuilder,
      private mdlController: ModalController,
      private alrtController: AlertController,
      private compOfService: CompanyOffersService,
      private competService: CompetenceService,
      public loadingCtrl: LoadingController
    ) { }

  ngOnInit() {
    this.initForm();
    this.offerCompetIDs = this.offerData.competencies;
    this.qGetCompetencies();
    this.setValues(this.offerData);
  }

  // Get competence List
  qGetCompetencies() {
    this.competService.qGetCompetencies().valueChanges.pipe(
      map(result => {
        this.competList = result.data.getCompetencies;
      })
    ).subscribe((item) => {
      //console.log(this.competList);
      this.getUserCompets(this.offerCompetIDs);
    });
  }

   /** Get ID Competence from User */
   getUserCompets(uCompets){
    uCompets.forEach(el => {
      //console.log(el);
      this.qGetCompetence(el);
    });
  }

  /** Get Competencies data from DB */
  qGetCompetence(competId) {
    this.competService.qGetCompetence(competId).valueChanges.pipe(
      map(result => result.data)
    ).subscribe((item) => {
      this.selectedCompet.push(item.getCompetence);
    });
  }

  /**
   * Initialized form
   */
   initForm(){
    this.editForm = this.fBuilder.group({
      iTitle: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
      iEduLevel: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      iCompetence: ['', [Validators.minLength(4), Validators.maxLength(20)]],
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
    this.editForm.get('iCompetence').setValue(infoOffer.competencies);
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
      this.insertedTags(this.editForm.value.iCompetence);

      this.loadingCtrl.create({
        message: 'Desant canvis...'
      }).then(async res => {
        res.present();
        console.log('Guardando data...');
        this.findCompetence(this.nameNewCompet);

        await this.editOffer(
            this.offerID,
            this.editForm.value.iTitle,
            this.editForm.value.iEduLevel,
            this.editForm.value.iCity,
            this.editForm.value.iJornada,
            this.newOfferCompets,
            this.editForm.value.iRangoSalarial,
            this.editForm.value.iRemoto,
            this.editForm.value.iTipoContrato,
            this.editForm.value.iDescripcio,
            this.editForm.value.iRequirements
        );
        this.loadingCtrl.dismiss();
      });
    }
  }

  //Created new competence if not exist yet
  insertedTags(competencies) {
    const existCompets = [];

    competencies.forEach(el => {
      if(el._id === el.name) {
        this.createNewCompetence(el.name);
        this.nameNewCompet.push(el);
      } else {
        existCompets.push(el);
        this.newOfferCompets.push(el._id);
      }
    });
    this.newOfferCompetsList.push(existCompets);
  }

  //Call to create new competence service:
  createNewCompetence(iName: any) {
    this.competService.mCreateCompetence(iName).subscribe(() => {
      console.log('New Competence created!');
    });
  }

  //Find id of new competencies:
  findCompetence(names) {
    names.forEach(el => {
      const index = this.competList.findIndex(
        object => object.name === el.name
      );

      if(index === -1) {
        console.log('No se encuentra competència!!');
      } else {
        this.newOfferCompets.push(this.competList[index]._id);
      }
    });
  }

  /**
   * Get values from form and update info.
   */
   editOffer(oId: any, iTitle: any, iEduLevel: any, iCity: any, iJornada: any, iRango: any, iRemoto: any, iContrato: any, iDescripcio: any, iRequirements: any, iCompetence: any){
    this.compOfService.mEditOffer(oId, iTitle, iEduLevel, iCity, iJornada, iRango, iRemoto, iContrato, iDescripcio, iRequirements, iCompetence)
    .subscribe((response) => {
      console.log('Edition done!');
    });
    this.dismissEditModal();
  }

  get errorCtr() {
    return this.editForm.controls;
  }

  // Delete function to competencies/tags.
  removeCompetence(item) {
    const tags = this.editForm.value.iCompetence;
    const index = tags.indexOf(item);
    tags.splice(index, 1);
  }

  /**
   * Close modal when update
   */
  async dismissEditModal() {
    this.mdlController.dismiss();
  }

  @HostListener('window:popstate', ['$event'])
  dismissModal() {
    this.mdlController.dismiss();
  }

  /*cancelEdition(){
    //this.editForm.reset();
    // Alert to confirm:
    this.alertToConfirm();
  }*/

  /**
   * Alert to confirm action
   */
   /*async alertToConfirm() {
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
  }*/

}
