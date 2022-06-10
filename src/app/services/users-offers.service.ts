/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { EmptyObject } from 'apollo-angular/build/types';
import { map } from 'rxjs/operators';

const GET_USOFRS = gql`
  query {
    getUsersOffers {
      _id
      offer_id
      user_id
    }
  }
`;

const MUT_NEW_USERSOFFERS = gql`
mutation newRegister($createUsersOffersInput: CreateUsersOffersInput!) {
  createItem(input: $createUsersOffersInput) {
    _id
    offer_id
    user_id
  }
}
`;

@Injectable({
  providedIn: 'root'
})
export class UsersOffersService {

  constructor(private apollo: Apollo) { }

  /**
  * Get All Users-Offers from DB.
  */
  private _usoffsWatchQuery: QueryRef<any, EmptyObject>;

  qGetUsersOffers(): QueryRef<any, EmptyObject> {
    this._usoffsWatchQuery = this.apollo.watchQuery({
        query: GET_USOFRS,
    });

    return this._usoffsWatchQuery;
  }

  cUsersOffers(created: any) {
    return this.apollo.mutate({
      mutation: MUT_NEW_USERSOFFERS,
      variables: {
        createUsersOffersInput: created
      },
    }).pipe(
      map((data) => {
        this._usoffsWatchQuery?.refetch();
      })
    );
  }

}
