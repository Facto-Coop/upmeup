/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { map } from 'rxjs/operators';

import { CompanyOffersService } from 'src/app/services/company-offers.service';
import { CompetenceService } from 'src/app/services/competence.service';
import { SoftskillsService } from 'src/app/services/softskills.service';
import { UserService } from 'src/app/services/user.service';
import { UsersOffersService } from 'src/app/services/users-offers.service';
import { Offer } from '../../models/offer';

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.page.html',
  styleUrls: ['./offer-detail.page.scss'],
})
export class OfferDetailPage implements OnInit {
  userLoggedID = sessionStorage.getItem('userid');
  offer: Offer[] = [];
  offerID: any;
  enrolledValue = '';
  userInfo: any[] = [];
  userSkills: any[] = [];
  skillsName: any;
  skillsIco: any[] = [];
  usersOffersList: any[] = [];
  isEnrolled: number;
  userCompets: any[] = [];

  constructor(
              private aRoute: ActivatedRoute,
              private router: Router,
              private toastCtrl: ToastController,
              private cOfferService: CompanyOffersService,
              private uService: UserService,
              private usOffServ: UsersOffersService,
              private softSkillService: SoftskillsService,
              private competService: CompetenceService
            ) { }

  ngOnInit() {
    this.offerID = this.aRoute.snapshot.params.id;
    this.qGetOffer(this.offerID);

    //Evitar que pueda volver a inscribirse en la misma oferta.
    this.qGetUsersOffers(this.userLoggedID, this.offerID);
  }

  /**
   * Query to get Offer details
   *
   * @param ofId
   */
  qGetOffer(ofId: string) {
    this.cOfferService.qGetOffer(ofId).valueChanges.pipe(
      map(result => result.data)
    ).subscribe((item) => {
      // console.log(item);
      this.offer = item.getOffer;
      this.qGetUser(item.getOffer.userId);
      this.getUserCompets(item.getOffer.competencies);
    });
  }

  /**
   * Mutation to update the number of enrolled people to an offer.
   */
  mOfferUpdate(offerId, enrollVal) {
    const total = enrollVal + 1;
    const updated = { enrolled: total };

    this.cOfferService.mEditOfferEnroll(offerId, updated)
    .subscribe(result => {
      console.log('Updating offer...', result);
    });

    // Pass Mutation with values for create new UsersOffers
    this.cUsersOffers(this.userLoggedID, offerId);
  }

  /**
   * Mutation to create new register in collection UsersOffers.
   */
  cUsersOffers(userId, offerId){
    const created = { user_id: userId, offer_id: offerId };

    this.usOffServ.cUsersOffers(created)
    .subscribe(result => {
      console.log('New Registration...', result);
    });
  }

  /**
   * Action of button "Inscribir".
   */
  addEnrroled(ofID, enrollValue) {
    // Get UserId
    this.enrolledValue = enrollValue;

    // Pass Mutation with values for update
    this.mOfferUpdate(ofID, enrollValue);

    // Message Alert!
    this.enrolled();
    this.goToList();
  }

  /**
   * Get users-offers from DB & Prevent you
   * from re-enrolling in the same offer.
  */
  qGetUsersOffers(userID, ofID) {
    this.usOffServ.qGetUsersOffers().valueChanges.pipe(
      map(result => result.data)
    ).subscribe((item) => {
      //console.log(item);
      const index = item.getUsersOffers.findIndex(
        object => object.user_id === userID &&
                  object.offer_id === ofID
      );
      this.isEnrolled = index;
    });
  }

  /**
   * Get User info (Owner of offer) from DB
   * @param userId
   */
  qGetUser(userID: string) {
    this.uService.qGetUser(userID).valueChanges.pipe(
      map(result => result.data)
    ).subscribe((item) => {
      //console.log(item);
      this.userInfo = item.getUser;
      this.qGetSkillName(item.getUser.valors);
    });
  }

  /**
   * Get ID Skills from User (Owner of offer)
   */
  qGetSkillName(values: Array<any>) {
    values.forEach(el => {
      //console.log(el);
      this.qSkillName(el);
    });
  }

  /** Get SkillNames */
  qSkillName(skillId: string) {
    this.softSkillService.qGetSkill(skillId).valueChanges.pipe(
      map(result => result.data)
    ).subscribe((item) => {
      this.userSkills.push(item.getSkill);
      const nameClass = item.getSkill.name.replace(/ /g, '_');
      this.skillsName = nameClass.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
      this.skillsIco.push({
        sid: item.getSkill._id,
        sname: item.getSkill.name,
        sClass: this.skillsName
      });
    });
  }

  goToList() {
    this.router.navigate(['/', 'candidatures']);
  }

  /** Get ID Competence from User */
  getUserCompets(uCompets){
    uCompets.forEach(el => {
      //console.log(el);
      this.qGetCompetencies(el);
    });
  }

  /** Get Competencies data from DB */
  qGetCompetencies(competId) {
    this.competService.qGetCompetence(competId).valueChanges.pipe(
      map(result => result.data)
    ).subscribe((item) => {
      this.userCompets.push(item.getCompetence);
    });
  }

  /**
   * Alert to confirm an action
   *  */
  async enrolled() {
    const toast = await this.toastCtrl.create({
      color: 'dark',
      message: 'Inscrito correctamente! ¡Mucha Suerte!',
      duration: 3000,
      position: 'bottom'
    });

    await toast.present();
  }

}

