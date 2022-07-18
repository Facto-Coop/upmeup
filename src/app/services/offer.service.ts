/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { EmptyObject } from 'apollo-angular/types';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Offer } from '../models/offer';

const GET_ALLOFFERS = gql`
query {
  getCompanyOffers {
    _id
    userId
    title
    eduLevel
    city
    jornada
    rangoSalarial
    remoto
    enrolled
    tipoContrato
    description
    createdDate
  }
}
`;

const GET_OFFER = gql`
query getDetailOffer($id: String!) {
  getOffer(id: $id) {
    _id
    userId
    title
    eduLevel
    city
    jornada
    rangoSalarial
    remoto
    enrolled
    tipoContrato
    description
    createdDate
  }
}
`;

const MUT_CREATEOFFER = gql`
  mutation createOfferMut($userId: String!, 
                          $title: String!, 
                          $city: String!, 
                          $jornada: String!, 
                          $rangoSalarial: String!, 
                          $remoto: String!,
                          $enrolled: Float!, 
                          $tipoContrato: String!,
                          $createdDate: DateTime!) {
    createOffer(
      createOfferDto: { 
        userId: $userId
        title: $title
        city: $city
        jornada: $jornada
        rangoSalarial: $rangoSalarial
        remoto: $remoto
        enrolled: $enrolled
        tipoContrato: $tipoContrato
        createdDate: $createdDate
      }    
    ) {
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

const MUT_EDITOFFER = gql`
  mutation editOfferMut(  $id: String!, 
                          $title: String!, 
                          $city: String!, 
                          $jornada: String!, 
                          $rangoSalarial: String!, 
                          $remoto: String!,
                          $tipoContrato: String!
                        ) {
    updateOffer( 
      id: $id
      offerInputs: { 
            title: $title
            city: $city
            jornada: $jornada
            rangoSalarial: $rangoSalarial
            remoto: $remoto
            tipoContrato: $tipoContrato
      }    
    ) {
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

const REFRESH = 1000;

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private apollo: Apollo) { }

  /**
   * Get All Offers from DB.
   */
  /*private _offersWatchQuery: QueryRef<any, EmptyObject>;

  qGetAllOffers(): QueryRef<any, EmptyObject> {
    this._offersWatchQuery = this.apollo.watchQuery({
        query: GET_ALLOFFERS,
        pollInterval: REFRESH
    });

    return this._offersWatchQuery;
  }*/

  /**
   * Get one Offer (by ID) from DB.
   */
  /*private _offerWatchQuery: QueryRef<any, EmptyObject>;

  qGetOffer(userId: any): QueryRef<any, EmptyObject> {
    this._offerWatchQuery = this.apollo.watchQuery({
        query: GET_OFFER,
        pollInterval: REFRESH,
        variables: {
          id: userId,
        }
    });
    return this._offerWatchQuery;
  }*/

  /**
   * Mutation to Create an Offer.
   * @returns new Offer
   */
 /* mCreateOffer(uId: any, iTitle: any, iCity: any, iJornada: any, iRango: any, iRemoto: any, iEnroll: any, iContrato: any, iDate: string) {
    return this.apollo.mutate({
        mutation: MUT_CREATEOFFER,
        variables: {
          userId: uId,
          title: iTitle,
          city: iCity,
          jornada: iJornada,
          rangoSalarial: iRango,
          remoto: iRemoto,
          enrolled: iEnroll,
          tipoContrato: iContrato,
          createdDate: iDate
        }
    }).pipe(
        map((data) => {
          this._offersWatchQuery?.refetch();
        })
    );
  }*/

  /**
   * Mutation to Edit an Offer.
   * @returns edited Offer
   */
  /*mEditOffer(offerId: any, iTitle: any, iCity: any, iJornada: any, iRango: any, iRemoto: any, iContrato: any) {
    return this.apollo.mutate({
        mutation: MUT_EDITOFFER,
        variables: {
            id: offerId,
            title: iTitle,
            city: iCity,
            jornada: iJornada,
            rangoSalarial: iRango,
            remoto: iRemoto,
            tipoContrato: iContrato
        }
    }).pipe(
        map((data) => {
          this._offersWatchQuery?.refetch();
        })
    );
  }*/

}

