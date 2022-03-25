import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import gql from 'graphql-tag';


@Component({
  selector: 'app-company-offer',
  templateUrl: './company-offer.page.html',
  styleUrls: ['./company-offer.page.scss'],
})
export class CompanyOfferPage implements OnInit {
  //fakevar;

  offers: any[];
  error: any;
  loading = true;
  cOffers: any[] = [];
  userId = '';
  company = '';

  constructor(private apollo: Apollo, private router: Router) { }

  ngOnInit() {
    this.company = localStorage.getItem('user');
    this.userId = localStorage.getItem('userid');
    this.userQuery();
  }

    // Get info from DB.
    userQuery() {
      this.apollo
      .watchQuery({
        query: gql`
          {
            getCompanyOffers {
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
        `,
      }).valueChanges.subscribe((result: ApolloQueryResult<any> ) => {

        this.offers = result.data && result.data.getCompanyOffers;
        this.companyOffers();

        this.loading = result.loading;
        this.error = result.errors;
      });

    }

    companyOffers() {
      this.offers.forEach(item => {
        if(item.user_id === this.userId) {
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

}
