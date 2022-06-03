/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { gql, Apollo, QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { CompanyOffersService } from 'src/app/services/company-offers.service';
import { SoftskillsService } from 'src/app/services/softskills.service';
import { UserService } from 'src/app/services/user.service';
import { Offer } from '../../models/offer';


const MUT_UPDOFFER_ENROLL = gql`
  mutation submitUpdateEnroll(
                                $id: String!, 
                                $updateValue: UpdateOfferEnrollInput!
                              ) {
    updateEnrollOffer(
      id: $id, 
      input: $updateValue
    ) {
      title
      city
      enrolled
    }
  }
`;

const MUT_NEW_USERSOFFERS = gql`
mutation newRegister($createUsersOffersInput: CreateUsersOffersInput!) {
  createItem(input: $createUsersOffersInput) {
    _id
    offer_id
    user_id
  }
}
`;

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.page.html',
  styleUrls: ['./offer-detail.page.scss'],
})
export class OfferDetailPage implements OnInit, OnDestroy {
  offer: Offer[] = [];
  offerID: any;
  enrolledValue = '';
  usID: any;
  userInfo: any[] = [];
  userSkills: any[] = [];

  feedQuery: QueryRef<any>;

  private mutationSubscription: Subscription;
  private mutationNewValue: Subscription;

  constructor(
    private aRoute: ActivatedRoute,
    private router: Router,
    private apollo: Apollo,
    private toastCtrl: ToastController,
    private cOfferService: CompanyOffersService,
    private uService: UserService,
    private softSkillService: SoftskillsService) { }

  ngOnInit() {
    this.offerID = this.aRoute.snapshot.params.id;
    this.qGetOffer(this.offerID);
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
      console.log(item);
      this.offer = item.getOffer;
      this.qGetUser(item.getOffer.userId);
    });
  }

  /**
   * Mutation to update the number of enrolled people to an offer.
   */
  mOfferUpdate(offerId, enrollVal) {
    const total = enrollVal + 1;
    const updated = { enrolled: total };

    this.mutationSubscription = this.apollo.mutate<any>({
      mutation: MUT_UPDOFFER_ENROLL,
      variables: {
        id: offerId,
        updateValue: updated
      },
    }).subscribe(result => {
      console.log('Updating offer...', result.data);
    });
  }

  /**
   * Mutation to create new register in collection UsersOffers.
   */
  cUsersOffers(userId, offerId){
    const created = { user_id: userId, offer_id: offerId };
    this.mutationNewValue = this.apollo.mutate<any>({
      mutation: MUT_NEW_USERSOFFERS,
      variables: {
        createUsersOffersInput: created
      },
    }).subscribe(result => {
      console.log('New Registration...', result.data);
    });
  }

  addEnrroled(ofID, enrollValue) {
    // Get UserId
    const userID = localStorage.getItem('userid');
    this.enrolledValue = enrollValue;

    // Pass Mutation with values for update
    this.mOfferUpdate(ofID, enrollValue);

    // Pass Mutation with values for create new UsersOffers
    this.cUsersOffers(userID, ofID);

    // Message Alert!
    this.enrolled();

    this.reloadQueries();
    /**
     * TODO: Evitar que pueda volver a inscribirse en la misma oferta.
     */
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
      //console.log(item);
      this.userSkills.push(item.getSkill);
    });
  }

  reloadQueries() {
    //this.feedQuery.refetch();
    this.goToList();
  }

  goToList() {
    this.router.navigate(['/', 'offer-list']);
  }

  ngOnDestroy() {
    if(this.mutationSubscription) {
      this.mutationSubscription.unsubscribe();
    }

    if(this.mutationNewValue) {
      this.mutationNewValue.unsubscribe();
    }
  }

}

