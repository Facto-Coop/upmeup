import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { OfferService } from '../../services/offer.service';
import { Offer } from '../../models/offer';
import * as moment from 'moment';

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.page.html',
  styleUrls: ['./offer-detail.page.scss'],
})
export class OfferDetailPage implements OnInit {
  offer: Offer;
  offerID: any;
  sub;
  date: Date;

  constructor(private aRoute: ActivatedRoute, private ofService: OfferService) { }

  ngOnInit() {
    this.getDetails();
  }

  getDetails() {
    // Get the query string value from our route
    this.offerID = this.aRoute.snapshot.params.id;
    //console.log(this.offerID);

    this.sub = this.aRoute.paramMap.subscribe(params => {
      const off = this.ofService.getOffers();
      this.offer = off.find(p => p.id == this.offerID);

      // TODO: Con datos reales y moment se solucionará.
      let indice = this.offer.createdDate.indexOf("T");
      let extraida = this.offer.createdDate.substring(0, indice);
      this.offer.createdDate = extraida;
    });

  }

}

