import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { gql, Apollo } from 'apollo-angular';

import { OfferService } from '../../services/offer.service';
import { Offer } from '../../models/offer';
import { ApolloQueryResult } from 'apollo-client';

const GET_OFFERS = gql`
query {
  Offers{
    _id
    user_id
    title
    city
    jornada
    rangoSalarial
    remoto
    enrolled
    TipoContrato
    date
  }
}
`;

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.page.html',
  styleUrls: ['./offer-list.page.scss'],
})
export class OfferListPage implements OnInit {
  offers: Offer[];
  img = 0;
  private topLimit = 15;
  private dataList: any = [];
  /* TODO: New Variables for query
    allOffers: Offer[] = [];
    error: any;
    loading = true;
  */
  constructor(private router: Router, private offerService: OfferService, private apollo: Apollo) {
  }

  ngOnInit() {
    // this.getOffers();
    this.offers = this.offerService.getOffers();
    this.dataList = this.offers.slice(0, this.topLimit);
  }

  // Query to get data from Offers in DB:
  /*getOffers(){
    this.apollo.watchQuery<any>({
      query: GET_OFFERS
    })
    .valueChanges.subscribe((result: ApolloQueryResult<any>) => {

      this.allOffers = result.data && result.data.GET_OFFERS;
      this.loading = result.loading;
      this.error = result.errors;
    });
  }*/

  doInfinite(e) {
    setTimeout(() => {
      this.topLimit += 10;
      this.dataList = this.offers.slice(0, this.topLimit);
      e.target.complete();

      if (this.dataList.length == this.offers.length){
        e.target.disabled = true;
      }

    }, 500);
  }

  goOfferDetail(offer) {
    console.log(offer);
    // this.router.navigate(['/offer-detail']);
    this.router.navigate(['/offer-detail', offer.id]); // Passing with ID.
  }

}
