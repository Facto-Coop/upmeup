/* eslint-disable no-underscore-dangle */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Offer } from '../../models/offer';
import { EditOfferPage } from '../edit-offer/edit-offer.page';
import { ModalController } from '@ionic/angular';
import { CompanyOffersService } from 'src/app/services/company-offers.service';
import { SoftskillsService } from 'src/app/services/softskills.service';
import { UserService } from 'src/app/services/user.service';

const GET_USOFRS = gql`
  query {
    getUsersOffers {
      _id
      offer_id
      user_id
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
  offer: Offer;
  userOfferList: any[] = [];
  usersList: any[] = [];
  usersListData: any[] = [];
  uDataList: any[] = [];
  enrolledUser: any[] = [];
  uSkills: any[] = [];
  oSkill: any[] = [];
  userLoggedSkills = JSON.parse(sessionStorage.getItem('uSelectedSkills'));
  sortUsersList: any[] = [];

  error: any;
  loading = true;
  private querySubscription: Subscription;

  constructor(
        private aRoute: ActivatedRoute,
        private apollo: Apollo,
        private mController: ModalController,
        private compOfService: CompanyOffersService,
        private softSkillService: SoftskillsService,
        private uService: UserService
    ) { }

  ngOnInit() {
    this.offerID = this.aRoute.snapshot.params.id;
    this.qUsersOffers();
    this.qOfferById(this.offerID);
    setTimeout(() => {
      this.compareLists(this.userLoggedSkills, this.uDataList);
    }, 300);
  }

  // Call Query to Get info of selected offer (by ID).
  qOfferById(ofID: any) {
    this.compOfService.qGetOffer(ofID).valueChanges.pipe(
      map(result => result.data)
    ).subscribe((item) => {
      console.log(item);
      if(!item) {
        console.log('Ops, sembla que no hi han dades que mostrar....');
      } else {
        this.offer = item.getOffer;
      }
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

  // Function to get ID's of each user enrolled.
  getUsersById(eUsers) {
    eUsers.forEach(item => {
      this.qUsersInfo(item.user_id);
    });
  }

  /**
   * Call Query to Get info of each enrolled user (by ID).
   *  */
  qUsersInfo(userId: string) {
    this.uService.qGetUser(userId).valueChanges.pipe(
      map(result => result.data)
    ).subscribe((item) => {
      this.usersList = item.getUser;
      this.usersListData.push({ data: item.getUser, match: 0 });
      // Object to store total match
      this.uDataList.push({
        userID: item.getUser._id,
        values: item.getUser.valors,
        match: 0
      });

      const skillsArray = item.getUser.valors;
      this.getSkillsById(userId, skillsArray);
    });

  }

  /**
  * Function to call softSkills of each user enrolled.
  **/
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
      const skill = data.getSkill;
      const idBySkill = { userId, skill };
      this.uSkills.push(idBySkill);
    });
  }

  /** Compare Company-Logged-User values with Candidates Values to sort by affinity */
  compareLists(uLogged, uOwnerOffer) {
    uLogged.forEach(item => {
      const userValue = item._id;

      uOwnerOffer.forEach((el) => {
        const ownerValue = el.values;
        if (ownerValue.includes(userValue)) {
          el.match = el.match + 1;
        }
      });
    });

    const result = this.addMatch(this.usersListData, this.uDataList);

    // Order by match value:
    this.sortUsersList = result.sort((a, b) => (a.match > b.match) ? -1 : 1);
  }

  // Add match to all offers
    addMatch(offerList, sortedList) {
    sortedList.forEach(sortItem => {

      offerList.forEach(el => {
        if(sortItem.userID === el.data._id) {
          el.match = sortItem.match;
        }
      });
    });

    return offerList;
  }

  /**
   * Call modal to edit offer values
   */
  async editModal() {
    const editModal = await this.mController.create({
      component: EditOfferPage,
      componentProps: {
        offerData: this.offer
      },
      animated: true,
      cssClass: 'modalCss'
    });
    await editModal.present();
  }

  ngOnDestroy() {
   /* this.querySubscription.unsubscribe();*/
  }

}
