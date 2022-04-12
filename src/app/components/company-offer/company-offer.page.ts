import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';

const GET_ALLOFFERS = gql`
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
  selector: 'app-company-offer',
  templateUrl: './company-offer.page.html',
  styleUrls: ['./company-offer.page.scss'],
})
export class CompanyOfferPage implements OnInit, OnDestroy {
  //fakevar;

  offers: any[];
  error: any;
  loading = true;
  cOffers: any[] = [];
  userId = '';
  company = '';
  private querySubscription: Subscription;

  constructor(private apollo: Apollo, private router: Router) { }

  ngOnInit() {
    this.company = localStorage.getItem('user');
    this.userId = localStorage.getItem('userid');
    this.qUserQuery();
  }

    // Get info from DB.
    qUserQuery() {
      this.querySubscription = this.apollo.watchQuery({
        query: GET_ALLOFFERS
      }).valueChanges.subscribe((result: ApolloQueryResult<any> ) => {
        this.offers = result.data && result.data.getCompanyOffers;
        this.companyOffers();

        this.loading = result.loading;
        this.error = result.errors;
      });

    }

    companyOffers() {
      this.offers.forEach(item => {
        if(item.userId === this.userId) {
          this.cOffers.push({item});
           // console.log(this.cOffers);
        }
      });
    }

    goOfferDetail(offer) {
      /*this.fakevar = offer;
      console.log(this.fakevar);*/

      // eslint-disable-next-line no-underscore-dangle
      this.router.navigate(['/company-offer-detail', offer._id]);
    }

    ngOnDestroy() {
      this.querySubscription.unsubscribe();
    }
}
