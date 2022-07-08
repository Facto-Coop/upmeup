/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IonRouterOutlet, IonSlides, MenuController, ModalController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { ValuesModalPage } from '../shared/modals/values-modal/values-modal.page';
import { SectorsService } from '../services/sectors.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  skillsList: any[] = [];
  sectorList: any[] = [];
  emailRegex = '/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/';
  registerForm: FormGroup;
  isSubmitted = false;
  userType = '0';
  slideOpts = {
    allowTouchMove: false,
    scrollbar: true
  };

  @ViewChild('registerSlider')  slides: IonSlides;

  constructor(
              private menu: MenuController,
              private modalController: ModalController,
              private routerOutlet: IonRouterOutlet,
              public fBuilder: FormBuilder,
              private uService: UserService,
              private sectorService: SectorsService,
             ) { }

  ngOnInit() {
    sessionStorage.clear();
    this.menu.enable(false);
    this.qGetSectorList();
  }

  qGetSectorList(){
    this.sectorService.qGetAllSectors().valueChanges.pipe(
      map(result => result.data)
    ).subscribe((item) => {
      this.sectorList = item.getSectors;
    });
  }

  get errorControl() {
    return this.registerForm.controls;
  }

  /**
   * Call modal to change values from profile.
   * @returns
   */
   async valuesModal() {
    const modal = await this.modalController.create({
      component: ValuesModalPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
    });
    return await modal.present();
  }

  getType(item, selected) {
    if(selected) {
      console.log('Item: ', item);
      console.log(' selected: ', selected);
      this.swipeNext();
    }
  }

  /*submitForm() {
    this.userType = '0';
    this.userExist = false;
    this.isSubmitted = true;
    if (!this.initForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      console.log(this.initForm.value.userEmail);
      this.user.email = this.initForm.value.userEmail;
      this.user.pw = this.initForm.value.userPassword;
    }
  }*/

  swipeNext(){
    this.slides.slideNext(500);
  }

}
