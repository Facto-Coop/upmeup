/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersOffersService } from 'src/app/services/users-offers.service';
import { CompanyOffersService } from 'src/app/services/company-offers.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-candidatures',
  templateUrl: './candidatures.page.html',
  styleUrls: ['./candidatures.page.scss'],
})
export class CandidaturesPage implements OnInit {
  userLoggedID = localStorage.getItem('userid');
  allUsersOffers: any[] = [];
  usersOffersList: any[] = [];
  enrolledOffers: any[] = [];

  constructor(
               private router: Router,
               private usOffServ: UsersOffersService,
               private offServ: CompanyOffersService
             ) { }

  ngOnInit() {
    this.qGetUsersOffers();
  }

  /**
   * Get users-offers from DB.
  */
  qGetUsersOffers() {
    this.usOffServ.qGetUsersOffers().valueChanges.pipe(
      map(result => {
        this.allUsersOffers = result.data.getUsersOffers;
        //console.log(result.data);
        for (const userOffer of this.allUsersOffers) {
          if(this.userLoggedID === userOffer.user_id) {
            this.qGetOffers(userOffer.offer_id);
          }
        }
      })
    ).subscribe((item) => {
      this.usersOffersList = [];
      //console.log(this.allUsersOffers);
    });
  }

  qGetOffers(offerID) {
    this.offServ.qGetOffer(offerID).valueChanges.pipe(
      map(result => result.data)
      ).subscribe((item) => {
        this.usersOffersList.push(item.getOffer);
        //console.log(this.usersOffersList);
    });
  }

  goOfferDetail(offer) {
    const id = offer._id;
    this.router.navigate(['/offer-detail', id]);
  }

}
