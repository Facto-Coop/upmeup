/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { CompanyOffersService } from 'src/app/services/company-offers.service';
import { SectorsService } from 'src/app/services/sectors.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.page.html',
  styleUrls: ['./offer-list.page.scss'],
})
export class OfferListPage implements OnInit {
  allOffers: any[] = [];
  allOffersList: any[] = [];
  userLoggedID = sessionStorage.getItem('userid');
  userLoggedSkills = JSON.parse(sessionStorage.getItem('uSelectedSkills'));

  userLogged = {
                 userID: this.userLoggedID,
                 values: this.userLoggedSkills
               };
  userOwnerOffer: any[] = [];
  uLoggedValues: any[] = [];
  sortOffersList: any[] = [];
  allUsers: any[] = [];
  sectorName: any;

  private topLimit = 15;
  private dataList: any = [];

  constructor( private router: Router,
               private compOfService: CompanyOffersService,
               private uService: UserService,
               private sectorService: SectorsService
              ) { }

  ngOnInit() {
    this.userArrayData(this.userLogged);
    this.qGetOffers();

    setTimeout(() => {
      this.compareLists(this.uLoggedValues, this.userOwnerOffer);
    }, 1000);
  }

  /** Create user array to compare strings */
  userArrayData(userData) {
    const data = userData.values;
    data.forEach(element => {
      this.uLoggedValues.push(element._id);
    });
  }

  /**
   * Get offers from DB.
   */
  qGetOffers() {
    this.compOfService.qGetAllOffers().valueChanges.pipe(
      map(result => result.data)
    ).subscribe((item) => {
      this.allOffers = item.getCompanyOffers;
      this.allOffers.forEach((el) => {
        this.allOffersList.push({ data: el, match: 0 });
         this.qGetUser(el.userId);
      });
    });
  }

  /** Get user owner from offer */
  qGetUser(userID) {
    this.uService.qGetUser(userID).valueChanges.pipe(
      map(result => result.data)
    ).subscribe((item) => {
      this.qGetSectorName(item.getUser.sector_id);

      const index = this.userOwnerOffer.findIndex(
        object => object.userID === item.getUser._id
      );

      if (index === -1 && item.getUser.valors.length > 0) {
        this.userOwnerOffer.push({
          userID: item.getUser._id,
          values: item.getUser.valors,
          match: 0
        });
      }
    });
  }

  /** Get the name of the sector */
  qGetSectorName(value) {
    this.sectorService.qGetSector(value).valueChanges.pipe(
      map(result => result.data)
    ).subscribe((item) => {
      this.sectorName = item.getSector.name;
    });
  }


  /** Compare every Logged-User value with Company Values */
  compareLists(uLogged, uOwnerOffer) {
    uLogged.forEach(item => {
      const userValue = item;

      uOwnerOffer.forEach((el) => {
        const ownerValue = el.values;
        if (ownerValue.includes(userValue)) {
          el.match = el.match + 1;
        }
      });
    });

    const result = this.addMatch(this.allOffersList, this.userOwnerOffer);

    // Order by match value:
    this.sortOffersList = result.sort((a, b) => (a.match > b.match) ? -1 : 1);
  }

  /**
   * Add match to all offers
   */
  addMatch(offerList, sortedList) {
    sortedList.forEach(sortItem => {

      offerList.forEach(el => {
        if(sortItem.userID === el.data.userId) {
          el.match = sortItem.match;
        }
      });
    });

    return offerList;
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

  // Go to offer detail
  goOfferDetail(offer) {
    const id = offer._id;
    this.router.navigate(['/offer-detail', id]); 
  }

  // Go to candidatures
  toCandidatures() {
    this.router.navigate(['/candidatures']);
  }

}
