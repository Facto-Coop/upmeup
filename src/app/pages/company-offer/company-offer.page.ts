import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';

import { CreateOfferPage } from '../create-offer/create-offer.page';
import { CompanyOffersService } from 'src/app/services/company-offers.service';
import { Offer } from 'src/app/models/offer';


@Component({
  selector: 'app-company-offer',
  templateUrl: './company-offer.page.html',
  styleUrls: ['./company-offer.page.scss'],
})
export class CompanyOfferPage implements OnInit {
  offers: Observable<Offer[]>;
  cOffers: any[] = [];
  userId = '';
  company = '';

    constructor(
              private router: Router,
              private mController: ModalController,
              private compOfService: CompanyOffersService
            ) { }

    ngOnInit() {
      this.company = sessionStorage.getItem('user');
      this.userId = sessionStorage.getItem('userid');
      this.qOffersQuery();
    }

    /**
     * Get offers from DB.
     */
    qOffersQuery() {
      this.compOfService.qGetAllOffers().valueChanges.pipe(
        map(result => result.data)
      ).subscribe((item) => {
        this.companyOffers(item.getCompanyOffers);
      });

    }

    /**
     * Get Offers (from user logged).
     */
    companyOffers(offersList) {
      this.cOffers = [];
      offersList.forEach(item => {
        if(item.userId === this.userId) {
          this.cOffers.push({item});
        }
      });
    }

    goOfferDetail(offer) {
      this.router.navigate(['/company-offer-detail', offer._id]);
    }

    /**
     * Modal to Create New Offer
     */
    async createModal() {
      const editModal = await this.mController.create({
        component: CreateOfferPage,
        animated: true,
        cssClass: 'modalCss'
      });
      await editModal.present();
    }

}
