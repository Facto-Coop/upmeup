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

  private topLimit = 15;
  private dataList: any = [];
  private querySubscription: Subscription;

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
    });
  }

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

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
