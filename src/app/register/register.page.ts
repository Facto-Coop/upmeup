/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { IonRouterOutlet, IonSlides, LoadingController, MenuController, ModalController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import Validation from './../utils/validation';

import { ValuesModalPage } from '../shared/modals/values-modal/values-modal.page';
import { SectorsService } from '../services/sectors.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  languageList: any = ['Alemán', 'Árabe', 'Aranés', 'Bosnio', 'Catalán', 'Chino mandarín', 'Coreano', 'Croata', 'Danés', 'Español', 'Euskera', 'Francés', 'Gallego',
  'Hindi', 'Inglés', 'Italiano', 'Japonés', 'Neerlandés', 'Polaco', 'Portugués', 'Ruso', 'Rumano', 'Serbio', 'Turco', 'Ucraniano', 'Valenciano', 'Vietnamita'];
  cityList: any[] = ['A Coruña', 'Almería', 'Asturias', 'Avila', 'Badajoz', 'Barcelona', 'Burgos', 'Cáceres', 'Cádiz', 'Cantabria', 'Castellón', 'Ceuta', 'Ciudad Real',
  'Córdoba', 'Cuenca', 'Formentera', 'Girona', 'Granada', 'Guadalajara', 'Guipuzcoa', 'Huelva', 'Huesca', 'Ibiza', 'Jaén', 'La Rioja', 'Gran Canaria', 'Fuerteventura',
  'Lanzarote', 'León', 'Lérida', 'Lugo', 'Madrid', 'Málaga', 'Mallorca', 'Menorca', 'Murcia', 'Navarra', 'Orense', 'Palencia', 'Pontevedra', 'Salamanca', 'Tenerife',
  'La Gomera', 'La Palma', 'El Hierro', 'Segovia', 'Sevilla', 'Soria', 'Tarragona', 'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza'];
  emailRegex = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  passwordRegex = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$';
  skillsListId: any[] = [];
  sectorList: any[] = [];
  registerForm: UntypedFormGroup;
  isSubmitted = false;
  userType = '0';
  passw = '';
  userSkills: any[] = [];

  slideOpts = {
    allowTouchMove: false,
    scrollbar: true
  };
  formSlide1: UntypedFormGroup;
  formSlide2: UntypedFormGroup;
  formSlide3: UntypedFormGroup;
  formSlide4: UntypedFormGroup;
  formSlide5: UntypedFormGroup;

  @ViewChild('registerSlider')  slides: IonSlides;

  constructor(
              private menu: MenuController,
              private modalController: ModalController,
              private routerOutlet: IonRouterOutlet,
              private router: Router,
              public fBuilder: UntypedFormBuilder,
              private uService: UserService,
              private sectorService: SectorsService,
              public loadingCtrl: LoadingController
             ) { }

  ngOnInit() {
    sessionStorage.clear();
    this.menu.enable(false);
    this.qGetSectorList();
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
  }

  createFormSlide1() {
    this.formSlide1 = this.fBuilder.group({
      iName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
      iSurname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      iCity: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(80)]]
    });
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
    this.formSlide3 = this.fBuilder.group({
      iJobPos: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
      iSector: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      iExp: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]],
    });
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

  createFormSlide5() {
    this.formSlide5 = this.fBuilder.group({
      iEduc: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      iLang: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]]
    });
  }

  submitForm() {
    if(this.userSkills.length > 0) {
      this.getSkillsId();
    }

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
  createNewUser(iName: any, iSurname: any, iCity: any, iSector: any, iEduc: any, iPassw: any, iType: any, iEmail: any, iJobPos: any, iLastJob: any, iExp: any, iLang: any, iSkills: any) {
  this.uService.mCreateUser(iName, iSurname, iCity, iSector, iEduc, iPassw, iType, iEmail, iJobPos, iLastJob, iExp, iLang, iSkills)
    .subscribe((response) => {
      console.log('Created user!');
    });
  }

  saveNewUser() {
    console.log(this.formSlide4.value);
    console.log(this.skillsListId);

    this.loadingCtrl.create({
      message: 'Creant nou usuari...'
    }).then(async res => {
      res.present();
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
        this.skillsListId
      );

      this.loadingCtrl.dismiss();
    });

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 700);
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
      this.userSkills = infoMdl.data;
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
