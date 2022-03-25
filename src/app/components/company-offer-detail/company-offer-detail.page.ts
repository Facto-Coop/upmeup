import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company-offer-detail',
  templateUrl: './company-offer-detail.page.html',
  styleUrls: ['./company-offer-detail.page.scss'],
})
export class CompanyOfferDetailPage implements OnInit {
  offer: any;
  offerID: any;
  sub;

  constructor(private aRoute: ActivatedRoute) { }

  ngOnInit() {
    // this.getDetails();
  }

  getDetails() {

   // Get the query string value from our route

   /* this.offerID = this.aRoute.snapshot.params.id;
    console.log(this.offerID);
    console.log(this.offer);

    this.sub = this.aRoute.paramMap.subscribe(params => {
      // const off = this.ofService.getOffers();
      // this.offer = off.find(p => p.id == this.offerID);

    });*/
  }

}
