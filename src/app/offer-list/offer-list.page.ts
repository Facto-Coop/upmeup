import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { OfferService } from '../services/offer.service';
import { Offer } from '../models/offer';

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

  constructor(private router: Router, private offerService: OfferService) {
  }

  ngOnInit() {
    this.offers = this.offerService.getOffers();
    this.dataList = this.offers.slice(0, this.topLimit);
  }

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
