/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonRouterOutlet, IonSlides, LoadingController, MenuController, ModalController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import Validation from './../utils/validation';

import { ValuesModalPage } from '../shared/modals/values-modal/values-modal.page';
import { SectorsService } from '../services/sectors.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { CompetenceService } from '../services/competence.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  languageList: any = ['Alemany', 'Àrab', 'Aranès', 'Bosnià', 'Català', 'Xinès mandarí', 'Coreà', 'Croat', 'Danès', 'Espanyol', 'Basc', 'Francès', 'Gallec',
  'Hindi', 'Anglès', 'Italià', 'Japonès', 'Neerlandès', 'Polonès', 'Portuguès', 'Rus', 'Romanès', 'Serbi', 'Turc', 'Ucraïnès', 'Valencià', 'Vietnamita'];
  cityList: any[] = ['Corunya', 'Almeria', 'Astúries', 'Avila', 'Badajoz', 'Barcelona', 'Burgos', 'Càceres', 'Cadis', 'Cantàbria', 'Castelló', 'Ceuta', 'Ciudad Real',
    'Còrdova', 'Conca', 'Formentera', 'Girona', 'Granada', 'Guadalajara', 'Guipuzcoa', 'Huelva', 'Osca', 'Eivissa', 'Jaén', 'La Rioja', 'Gran Canària', 'Fuerteventura',
    'Lanzarote', 'Lleó', 'Lleida', 'Lugo', 'Madrid', 'Màlaga', 'Mallorca', 'Menorca', 'Múrcia', 'Navarra', 'Orense', 'Palència', 'Pontevedra', 'Salamanca', 'Tenerife',
    'La Gomera', 'La Palma', 'El Hierro', 'Segòvia', 'Sevilla', 'Sòria', 'Tarragona', 'Terol', 'Toledo', 'València', 'Valladolid', 'Biscaia', 'Zamora', 'Saragossa'];
  emailRegex = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  passwordRegex = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$';
  skillsListId: any[] = [];
  sectorList: any[] = [];
  registerForm: FormGroup;
  isSubmitted = false;
  userType = '1';
  passw = '';
  userSkills: any[] = [];
  competList: any[] = [];
  userCompets: any[] = [];
  userCompetsIds: any[] = [];
  nameNewCompet: any = [];
  createdCompet: any = [];

  slideOpts = {
    allowTouchMove: false,
    scrollbar: true
  };
  formSlide1: FormGroup;
  formSlide2: FormGroup;
  formSlide3: FormGroup;
  formSlide4: FormGroup;
  formSlide5: FormGroup;

  @ViewChild('registerSlider')  slides: IonSlides;

  constructor(
              private menu: MenuController,
              private modalController: ModalController,
              private routerOutlet: IonRouterOutlet,
              private router: Router,
              public fBuilder: FormBuilder,
              private uService: UserService,
              private sectorService: SectorsService,
              private competService: CompetenceService,
              public loadingCtrl: LoadingController,
             ) { }

  ngOnInit() {
    sessionStorage.clear();
    this.menu.enable(false);
    this.qGetSectorList();
    this.qGetCompetencies();

    //Init all forms:
    this.createFormSlide1();
    this.createFormSlide2();
    this.createFormSlide3();
    this.createFormSlide4();
    this.createFormSlide5();
  }

  qGetSectorList(){
    this.sectorService.qGetAllSectors().valueChanges.pipe(
      map(result => result.data)
    ).subscribe((item) => {
      this.sectorList = item.getSectors;
    });
  }

  getType(item, selected) {
    if(selected) {
      //console.log(' selected: ', selected);
      this.userType = selected;
      this.swipeNext();
    }

    //Init form according to Type (if type change):
    this.createFormSlide1();
    this.createFormSlide2();
    this.createFormSlide3();
    this.createFormSlide4();
    this.createFormSlide5();
  }

  createFormSlide1() {
    if(this.userType === '2') {
      this.formSlide1 = this.fBuilder.group({
        iName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
        iCity: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(80)]]
      });
    } else if(this.userType === '1') {
      this.formSlide1 = this.fBuilder.group({
        iName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
        iSurname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
        iCity: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(80)]]
      });
    }
  }

  createFormSlide2() {
    this.formSlide2 = this.fBuilder.group({
      iEmail: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this.emailRegex)]],
      iPassword: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16), Validators.pattern(this.passwordRegex)])],
      confirmPassword: ['', Validators.required]
    },
    {
      validators: [ Validation.match('iPassword', 'confirmPassword') ]
    });
  }

  createFormSlide3() {
    if(this.userType === '2') {
      this.formSlide3 = this.fBuilder.group({
        iSector: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
        iExp: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]]
      });
    } else if(this.userType === '1') {
      this.formSlide3 = this.fBuilder.group({
        iJobPos: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
        iSector: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
        iExp: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]],
      });
    }
  }

  createFormSlide4() {
    this.formSlide4 = this.fBuilder.group({
      iLastJob: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(400)]]
    });
  }

  getSkillsId() {
    this.userSkills.forEach(el => {
      this.skillsListId.push(el._id);
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

  createFormSlide5() {
    if(this.userType === '1') {
        this.formSlide5 = this.fBuilder.group({
          iEduc: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
          iLang: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
          iCompetence: ['', [Validators.required,  Validators.minLength(4), Validators.maxLength(20)]]
        });
    }
  }

  submitForm() {
    console.log(this.formSlide1.value);
    console.log(this.formSlide2.value);
    console.log(this.formSlide3.value);
    console.log(this.formSlide4.value);
    console.log(this.formSlide5.value);

    this.swipeNext();
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
  createNewUser(iName: any, iSurname: any, iCity: any, iSector: any, iEduc: any, iPassw: any, iType: any, iEmail: any, iJobPos: any, iLastJob: any, iExp: any, iLang: any, iCompetence: any, iSkills: any) {
  this.uService.mCreateUser(iName, iSurname, iCity, iSector, iEduc, iPassw, iType, iEmail, iJobPos, iLastJob, iExp, iLang, iCompetence, iSkills)
    .subscribe((response) => {
      console.log('Created user!');
    });
  }

  saveNewUser() {
    if(this.userSkills.length > 0) {
      this.getSkillsId();
    }

    if(this.userType === '1') {
      this.insertedTags(this.formSlide5.value.iCompetence);
    } else {
      this.userCompetsIds = [];
      this.formSlide1.value.iSurname = '-';
      this.formSlide3.value.iJobPos = '-';
      this.formSlide5.value.iEduc = '-';
      this.formSlide5.value.iLang = [];
    }

    this.loadingCtrl.create({
      message: 'Creant nou usuari...'
    }).then(async res => {
      res.present();
      console.log('Guardando info...!');
      this.findCompetence(this.nameNewCompet);

      await this.createNewUser(
        this.formSlide1.value.iName,
        this.formSlide1.value.iSurname,
        this.formSlide1.value.iCity,
        this.formSlide3.value.iSector,
        this.formSlide5.value.iEduc,
        this.formSlide2.value.iPassword,
        this.userType,
        this.formSlide2.value.iEmail,
        this.formSlide3.value.iJobPos,
        this.formSlide4.value.iLastJob,
        this.formSlide3.value.iExp,
        this.formSlide5.value.iLang,
        this.userCompetsIds,
        this.skillsListId
      );
      this.loadingCtrl.dismiss();
    });

    setTimeout(() => {
      //this.router.navigate(['/login']);
      this.router.navigateByUrl('/login', { replaceUrl: true });
    }, 1000);
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
        this.userCompetsIds.push(el._id);
      }
    });
    this.userCompets.push(existCompets);
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
        this.createdCompet.push(this.competList[index]);
        this.userCompetsIds.push(this.competList[index]._id);
      }
    });

    //console.log('ID Compets that need to User Profile --> ', this.userCompetsIds);
  }

  // Delete function to competencies/tags.
  removeCompetence(item) {
    const tags = this.formSlide5.value.iCompetence;
    const index = tags.indexOf(item);
    tags.splice(index, 1);
  }

  swipeNext(){
    this.slides.slideNext(500);
  }

  /**
   * Call modal to change values from profile.
   * @returns
   */
  async valuesModal() {
    const modal = await this.modalController.create({
      component: ValuesModalPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });

    modal.onDidDismiss().then((infoMdl) => {
      //console.log('data skills?: ', infoMdl);

      if(infoMdl.data !== undefined || window.sessionStorage) {
        this.userSkills = infoMdl.data;
      } else {
        this.userSkills = [];
      }
    });

    //console.log(this.userSkills);
    return await modal.present();
  }

  /**
   * Control Form Errors
  */
  get errorsSld1() {
    return this.formSlide1.controls;
  }

  get errorsSld2() {
    return this.formSlide2.controls;
  }

  get errorsSld3() {
    return this.formSlide3.controls;
  }

  get errorsSld4() {
    return this.formSlide4.controls;
  }

  get errorsSld5() {
    return this.formSlide5.controls;
  }

}
