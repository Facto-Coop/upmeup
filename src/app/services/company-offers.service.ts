/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { EmptyObject } from 'apollo-angular/build/types';
import { map } from 'rxjs/operators';

// TODO: Add "userName {_id name}" to companyoffers and detail.
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
    requirements
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
    requirements
    createdDate
  }
}
`;

const MUT_CREATEOFFER = gql`
  mutation createOfferMut($userId: String!, 
                          $title: String!, 
                          $eduLevel: String!,
                          $city: String!,
                          $jornada: String!, 
                          $rangoSalarial: String!, 
                          $remoto: String!,
                          $enrolled: Float!, 
                          $tipoContrato: String!,
                          $description: String!,
                          $requirements: String!,
                          $createdDate: DateTime!) {
    createOffer(
      createOfferDto: { 
        userId: $userId
        title: $title
        eduLevel: $eduLevel
        city: $city
        jornada: $jornada
        rangoSalarial: $rangoSalarial
        remoto: $remoto
        enrolled: $enrolled
        tipoContrato: $tipoContrato
        description: $description
        requirements: $requirements
        createdDate: $createdDate
      }    
    ) {
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
      requirements
      createdDate
    }
  }
`;

const MUT_EDITOFFER = gql`
  mutation editOfferMut(  $id: String!, 
                          $title: String!, 
                          $eduLevel: String!,
                          $city: String!, 
                          $jornada: String!, 
                          $rangoSalarial: String!, 
                          $remoto: String!,
                          $tipoContrato: String!
                          $description: String!
                          $requirements: String!
                        ) {
    updateOffer( 
      id: $id
      offerInputs: { 
            title: $title
            eduLevel: $eduLevel
            city: $city
            jornada: $jornada
            rangoSalarial: $rangoSalarial
            remoto: $remoto
            tipoContrato: $tipoContrato
            description: $description
            requirements: $requirements
      }    
    ) {
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
      requirements
      createdDate
    }
  }
`;

const MUT_UPDOFFER_ENROLL = gql`
  mutation submitUpdateEnroll(
                                $id: String!, 
                                $updateValue: UpdateOfferEnrollInput!
                              ) {
    updateEnrollOffer(
      id: $id, 
      input: $updateValue
    ) {
      title
      city
      enrolled
    }
  }
`;

const REFRESH = 10000;

@Injectable({
  providedIn: 'root'
})
export class CompanyOffersService {

  constructor(private apollo: Apollo) { }

  /**
   * Get All Offers from DB.
   */
  private _offersWatchQuery: QueryRef<any, EmptyObject>;

  qGetAllOffers(): QueryRef<any, EmptyObject> {
    this._offersWatchQuery = this.apollo.watchQuery({
        query: GET_ALLOFFERS,
        //pollInterval: REFRESH
    });

    return this._offersWatchQuery;
  }

  /**
   * Get one Offer (by ID) from DB.
   */
  private _offerWatchQuery: QueryRef<any, EmptyObject>;

  qGetOffer(userId: any): QueryRef<any, EmptyObject> {
    this._offerWatchQuery = this.apollo.watchQuery({
        query: GET_OFFER,
        //pollInterval: REFRESH,
        variables: {
          id: userId,
        }
    });
    return this._offerWatchQuery;
  }

  /**
   * Mutation to Create an Offer.
   * @returns new Offer
   */
  mCreateOffer(uId: any, iTitle: any, iEduLevel: any, iCity: any, iJornada: any, iRango: any, iRemoto: any, 
    iEnroll: any, iContrato: any, iDescripcio: any, iRequirements: any, iDate: string) {
      return this.apollo.mutate({
        mutation: MUT_CREATEOFFER,
        variables: {
          userId: uId,
          title: iTitle,
          eduLevel: iEduLevel,
          city: iCity,
          jornada: iJornada,
          rangoSalarial: iRango,
          remoto: iRemoto,
          enrolled: iEnroll,
          tipoContrato: iContrato,
          description: iDescripcio,
          requirements: iRequirements,
          createdDate: iDate
        }
      }).pipe(
        map((data) => {
          this._offersWatchQuery?.refetch();
        })
      );
  }

  /**
   * Mutation to Edit an Offer.
   * @returns edited Offer
   */
  mEditOffer(offerId: any, iTitle: any, iEduLevel: any, iCity: any, iJornada: any, iRango: any, iRemoto: any, iContrato: any, iDescripcio: any, iRequirements: any) {
    return this.apollo.mutate({
        mutation: MUT_EDITOFFER,
        variables: {
            id: offerId,
            title: iTitle,
            eduLevel: iEduLevel,
            city: iCity,
            jornada: iJornada,
            rangoSalarial: iRango,
            remoto: iRemoto,
            tipoContrato: iContrato,
            description: iDescripcio,
            requirements: iRequirements
        }
    }).pipe(
        map((data) => {
          this._offersWatchQuery?.refetch();
        })
    );
  }

  mEditOfferEnroll(offerId: any, updated: any) {
    return this.apollo.mutate({
      mutation: MUT_UPDOFFER_ENROLL,
      variables: {
        id: offerId,
        updateValue: updated
      },
    }).pipe(
      map((data) => {
        this._offersWatchQuery?.refetch();
      })
    );
  }

}
