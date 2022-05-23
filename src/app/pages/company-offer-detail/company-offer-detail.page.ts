import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApolloQueryResult } from 'apollo-client';
import { Apollo, gql } from 'apollo-angular';
import { Subscription, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Offer } from '../../models/offer';
import { EditOfferPage } from '../edit-offer/edit-offer.page';
import { ModalController } from '@ionic/angular';
import { CompanyOffersService } from 'src/app/services/company-offers.service';
import { SoftskillsService } from 'src/app/services/softskills.service';

const GET_USOFRS = gql`
  query {
    getUsersOffers {
      _id
      offer_id
      user_id
    }
  }
`;

const GET_UINFO = gql`
  query getUserInfo($id: String!){
    getUser(id: $id) {
      _id
      name 
      email
      valors
    }
  }
`;

@Component({
  selector: 'app-company-offer-detail',
  templateUrl: './company-offer-detail.page.html',
  styleUrls: ['./company-offer-detail.page.scss'],
})
export class CompanyOfferDetailPage implements OnInit, OnDestroy {
  offerID: any;
  offer: Offer[] = [];
  userOfferList: any[] = [];
  usersListData: any[] = [];
  enrolledUser: any[] = [];
  uSkills: any[] = [];
  oSkill: any[] = [];

  error: any;
  loading = true;
  private querySubscription: Subscription;
  private queryUsersByIDSubs: Subscription;
  private querySkillSubscription: Subscription;

  constructor(
        private aRoute: ActivatedRoute,
        private apollo: Apollo,
        private mController: ModalController,
        private compOfService: CompanyOffersService,
        private softSkillService: SoftskillsService
    ) { }

  ngOnInit() {
    this.offerID = this.aRoute.snapshot.params.id;
    this.qUsersOffers();
    this.qOfferById(this.offerID);
  }

  /**
   * Call Query to Get info of selected offer (by ID).
   *  */
  qOfferById(ofID: any) {
    const skillsArray = [];

    this.compOfService.qGetOffer(ofID).valueChanges.pipe(
      map(result => result.data)
    ).subscribe((item) => {
      //console.log(item);
      this.offer = item.getOffer;

      //TODO: Obtener valores de cada Usuario Empresa y marcarlos.

      /*skillsArray.push(item.getOffer.valors);
      const userID = item.getOffer.userId;
      this.getSkillsById(userID, skillsArray);*/
    });
  }

  /**
   * Call Query to Get users by offers.
   *  */
  qUsersOffers() {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_USOFRS
    }).valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        this.userOfferList = data.getUsersOffers;
        this.error = data.errors;
        this.getUsersId();
    });
  }

  /**
   * Function to get list of users enrolled in the offer.
   *  */
  getUsersId() {
    this.offerID = this.aRoute.snapshot.params.id;

    this.userOfferList.forEach(item => {
      if(item.offer_id === this.offerID) {
        this.enrolledUser.push(item);
      }
    });

    this.getUsersById(this.enrolledUser);
  }

  /**
   * Function to get ID's of each user enrolled.
   *  */
  getUsersById(eUsers) {
    eUsers.forEach(item => {
      this.qUsersInfo(item.user_id);
    });
  }

  /**
   * Call Query to Get info of each user (by ID).
   *  */
  qUsersInfo(userId: string) {
    this.queryUsersByIDSubs = this.apollo.watchQuery({
      query: GET_UINFO,
      variables: {
        id: userId,
      },
    }).valueChanges.subscribe((result: ApolloQueryResult<any>) => {
        this.usersListData.push(result.data.getUser);
        const skillsArray = result.data.getUser.valors;

        this.getSkillsById(userId, skillsArray);
    });
  }

  /**
  * Function to call softSkills of each user enrolled.
  *  */
  getSkillsById(userId, skills) {
    skills.forEach(element => {
      this.qSkillName(userId, element);
    });
  }

  /**
   * Call query to get name of each user-skill.
  * */
  qSkillName(userId, skillId: string) {
    this.softSkillService.qGetSkill(skillId).valueChanges.pipe(
      map(result => result.data)
    ).subscribe(( data ) => {
      //console.log(data);
      const skill = data.getSkill;
      const idBySkill = { userId, skill };
      //console.log(idBySkill);
      this.uSkills.push(idBySkill);
    });

    /*this.querySkillSubscription = this.apollo.watchQuery({
      query: GET_SKILLNAME,
      variables: {
        id: skillId,
      },
    }).valueChanges.subscribe((result: ApolloQueryResult<any>) => {
        const skill = result.data.getSkill;
        const idBySkill = { userId, skill };
        this.uSkills.push(idBySkill);
    });*/
  }

  /**
   * Call modal to edit offer values
   */
  async editModal() {
    const editModal = await this.mController.create({
      component: EditOfferPage,
      componentProps: {
        offer: this.offer
      },
      animated: true,
      cssClass: 'modalCss'
    });
    await editModal.present();
  }

  ngOnDestroy() {
   /* this.querySubscription.unsubscribe();
    this.queryUsersByIDSubs.unsubscribe();
    this.querySkillSubscription.unsubscribe();*/
  }

}
