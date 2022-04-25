import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { gql, Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import { Subscription } from 'rxjs';

import { Offer } from '../../models/offer';

const GET_OFFERS = gql`
query {
  getCompanyOffers {
    _id
    userId
    title
    city
    jornada
    rangoSalarial
    remoto
    enrolled
    tipoContrato
    createdDate
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
  selector: 'app-offer-list',
  templateUrl: './offer-list.page.html',
  styleUrls: ['./offer-list.page.scss'],
})
export class OfferListPage implements OnInit, OnDestroy {
  offers: Offer[];
  img = 0;
  allOffers: Offer[] = [];
  error: any;
  loading = true;
  usersListData: any[] = [];
  private topLimit = 15;
  private dataList: any = [];

  private querySubscription: Subscription;
  //private queryUsersByIDSubs: Subscription;

  constructor(private router: Router, private apollo: Apollo) {
  }

  ngOnInit() {
    this.qGetOffers();
    // this.offers = this.offerService.getOffers();
  }

  // Query to get data from Offers in DB:
  qGetOffers(){
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_OFFERS
    }).valueChanges.subscribe(({ data, loading }) => {
      this.allOffers = data.getCompanyOffers;
      this.loading = loading;
      this.error = data.errors;

      //this.getUsersById();
    });
  }

 /* getUsersById() {
    this.allOffers.forEach(element => {
      this.qGetUserById(element.userId);
    });
  }*/

  doInfinite(e) {
    setTimeout(() => {
      this.topLimit += 10;
      this.dataList = this.allOffers.slice(0, this.topLimit);
      e.target.complete();

      if (this.dataList.length == this.allOffers.length){
        e.target.disabled = true;
      }
    }, 500);
  }

  goOfferDetail(offer) {
    const id = offer._id;
    console.log(offer);
    // this.router.navigate(['/offer-detail']);
    this.router.navigate(['/offer-detail', id]); // Passing with ID.
  }

  /**
   * Query to get User by Id.
   */
  /*qGetUserById(userId: string) {
    this.queryUsersByIDSubs = this.apollo.watchQuery({
      query: GET_UINFO,
      variables: {
        id: userId,
      },
    }).valueChanges.subscribe((result: ApolloQueryResult<any>) => {
        this.usersListData = result.data.getUser;
        console.log('eyyy! Aquí tenim: ', this.usersListData);
    });
  }*/

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
    //this.queryUsersByIDSubs.unsubscribe();
  }
}
