/* eslint-disable prefer-const */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, Input, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { CompetenceService } from 'src/app/services/competence.service';
import { SectorsService } from 'src/app/services/sectors.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {
  languageList: any = ['Alemany', 'Àrab', 'Aranès', 'Bosnià', 'Català', 'Xinès mandarí', 'Coreà', 'Croat', 'Danès', 'Espanyol', 'Basc', 'Francès', 'Gallec',
  'Hindi', 'Anglès', 'Italià', 'Japonès', 'Neerlandès', 'Polonès', 'Portuguès', 'Rus', 'Romanès', 'Serbi', 'Turc', 'Ucraïnès', 'Valencià', 'Vietnamita'];
  cityList: any[] = ['Corunya', 'Almeria', 'Astúries', 'Avila', 'Badajoz', 'Barcelona', 'Burgos', 'Càceres', 'Cadis', 'Cantàbria', 'Castelló', 'Ceuta', 'Ciudad Real',
    'Còrdova', 'Conca', 'Formentera', 'Girona', 'Granada', 'Guadalajara', 'Guipuzcoa', 'Huelva', 'Osca', 'Eivissa', 'Jaén', 'La Rioja', 'Gran Canària', 'Fuerteventura',
    'Lanzarote', 'Lleó', 'Lleida', 'Lugo', 'Madrid', 'Màlaga', 'Mallorca', 'Menorca', 'Múrcia', 'Navarra', 'Orense', 'Palència', 'Pontevedra', 'Salamanca', 'Tenerife',
    'La Gomera', 'La Palma', 'El Hierro', 'Segòvia', 'Sevilla', 'Sòria', 'Tarragona', 'Terol', 'Toledo', 'València', 'Valladolid', 'Biscaia', 'Zamora', 'Saragossa'];

  userID = sessionStorage.getItem('userid');
  userType = '0';
  editUserForm: FormGroup;
  isSubmitted = false;
  sectorsList: any[] = [];

  competList: any[] = [];
  userCompetIDs: any[] = [];
  selectedCompet: any[] = [];
  newUserCompets: any[] = [];
  newUserCompetsList: any[] = [];
  nameNewCompet: any[] = [];

 // updateUserData: User;
  @Input() userData: User;

  constructor(
          private uService: UserService,
          private sectService: SectorsService,
          public fBuilder: FormBuilder,
          private alrtController: AlertController,
          private mdlController: ModalController,
          private competService: CompetenceService,
          public loadingCtrl: LoadingController
        ) { }

  ngOnInit() {
    this.userType = this.userData.tipo;
    if (this.userType === '1') {
        this.userCompetIDs = this.userData.competencies;
    }
    this.initForm();
    this.qGetSectors();
    this.qGetCompetencies();
    this.setValues(this.userData);
  }

  //Get sectors Info
  qGetSectors() {
    this.sectService.qGetAllSectors().valueChanges.pipe(
      map(result => result.data)
    ).subscribe((item) => {
      //console.log(item.getSectors);
      this.sectorsList.push(item.getSectors);
    });
  }

  // Get competence List
  qGetCompetencies() {
    this.competService.qGetCompetencies().valueChanges.pipe(
      map(result => {
        this.competList = result.data.getCompetencies;
      })
    ).subscribe((item) => {
      //console.log(this.competList);
      this.getUserCompets(this.userCompetIDs);
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

  get errorCtr() {
    return this.editUserForm.controls;
  }

  /**
   * Initialized form
   */
   initForm(){
    if(this.userType === '2') {
      this.editUserForm = this.fBuilder.group({
        iName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
        iEmail: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(60)]],
        iCity: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
        iSector: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(35)]],
        iLastJob: ['', [Validators.required,  Validators.minLength(20), Validators.maxLength(400)]],
        iExp: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]]
      });
    } else if(this.userType === '1') {
      this.editUserForm = this.fBuilder.group({
        iName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
        iSurname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
        iEmail: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(60)]],
        iCity: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
        iSector: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(35)]],
        iEduc: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(40)]],
        iJobPos: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(70)]],
        iLastJob: ['', [Validators.required,  Validators.minLength(20), Validators.maxLength(400)]],
        iExp: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]],
        iLang: ['', [Validators.required,  Validators.minLength(1), Validators.maxLength(30)]],
        iCompetence: ['', [Validators.minLength(4), Validators.maxLength(20)]]
      });
    }
  }

  /**
   * Set values form 'father' component.
   * @param infoOffer
  */
  setValues(infoUser) {
    if(this.userType === '2') {
      this.userID = infoUser._id;
      this.editUserForm.get('iName').setValue(infoUser.name);
      this.editUserForm.get('iEmail').setValue(infoUser.email);
      this.editUserForm.get('iCity').setValue(infoUser.city);
      this.editUserForm.get('iSector').setValue(infoUser.sector_id);
      this.editUserForm.get('iLastJob').setValue(infoUser.lastJobTasks);
      this.editUserForm.get('iExp').setValue(infoUser.experience);
    } else if(this.userType === '1') {
      this.userID = infoUser._id;
      this.editUserForm.get('iName').setValue(infoUser.name);
      this.editUserForm.get('iSurname').setValue(infoUser.surname);
      this.editUserForm.get('iEmail').setValue(infoUser.email);
      this.editUserForm.get('iCity').setValue(infoUser.city);
      this.editUserForm.get('iSector').setValue(infoUser.sector_id);
      this.editUserForm.get('iEduc').setValue(infoUser.eduLevel);
      this.editUserForm.get('iJobPos').setValue(infoUser.jobPosition);
      this.editUserForm.get('iLastJob').setValue(infoUser.lastJobTasks);
      this.editUserForm.get('iExp').setValue(infoUser.experience);
      this.editUserForm.get('iLang').setValue(infoUser.languages);
      this.editUserForm.get('iCompetence').setValue(infoUser.competencies);
    }
  }

  /**
   * Submit Form
   * @returns 
  */
  onSubmit() {
    this.isSubmitted = true;
    if (!this.editUserForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      if(this.userType === '1') {
        this.insertedTags(this.editUserForm.value.iCompetence);
      } else {
        this.newUserCompets = [];
        this.editUserForm.value.iSurname = '-';
        this.editUserForm.value.iJobPos = '-';
        this.editUserForm.value.iEduc = '-';
        this.editUserForm.value.iLang = [];
      }

      this.loadingCtrl.create({
        message: 'Desant canvis...'
      }).then(async res => {
        res.present();
        //console.log('Guardando data...');
        if(this.userType === '1') {
          this.findCompetence(this.nameNewCompet);
        }

          await this.editUser(
            this.userID,
            this.editUserForm.value.iName,
            this.editUserForm.value.iSurname,
            this.editUserForm.value.iEmail,
            this.editUserForm.value.iCity,
            this.editUserForm.value.iSector,
            this.editUserForm.value.iEduc,
            this.editUserForm.value.iJobPos,
            this.editUserForm.value.iLastJob,
            this.editUserForm.value.iExp,
            this.editUserForm.value.iLang,
            this.newUserCompets
          );

        this.loadingCtrl.dismiss();
      });
    }
  }

  //Created new competence if not exist yet
  insertedTags(competencies) {
    const existCompets = [];

    competencies.forEach(el => {
      if(!el._id) {
        this.createNewCompetence(el.name);
        this.nameNewCompet.push(el);
      } else {
        existCompets.push(el);
        this.newUserCompets.push(el._id);
      }
    });
    this.newUserCompetsList.push(existCompets);
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
        console.log('No se encuentra competéncia!!');
      } else {
        this.newUserCompets.push(this.competList[index]._id);
      }
    });
  }

  editUser(uId: any, iName: any, iSurname: any, iEmail: any, iCity: any, iSector: any, iEduc: any, iJobPos: any, iLastJob: any, iExp: any, iLang: any, iCompetence: any){
    sessionStorage.setItem('user', iName);
    this.uService.mEditUser(uId, iName, iSurname, iEmail, iCity, iSector, iEduc, iJobPos, iLastJob, iExp, iLang, iCompetence)
    .subscribe((response) => {
      console.log('Profile edited!');
    });

    this.dismissEditModal();
  }

  // Delete function to competencies/tags.
  removeCompetence(item) {
    const tags = this.editUserForm.value.iCompetence;
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

}
