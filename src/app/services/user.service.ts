/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { EmptyObject } from 'apollo-angular/build/types';
import apolloClient from 'apollo-client';
import { map } from 'rxjs/operators';

const GET_USER = gql`
  query getOneUser($id: String!) {
    getUser(id: $id) {
      _id
      name
      surname
      eduLevel
      city
      email
      tipo
      valors 
    }
  }
`;

const GET_ALLUSERS = gql`
  query {
    getUsers {
      _id
      name
      surname
      eduLevel
      city
      email
      tipo
      valors 
    }
  }
`;

const MUT_EDIT_USERSKILLS = gql`
mutation editUserSkills(
                          $id: String!,
                          $updateValue: UpdateUserSkillInput!
                        ) {

  updateUserSkills(
    id: $id,
    input: $updateValue
  ) {
    _id
    name
    surname
    email
    city
    eduLevel
    valors
  }
}
`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apollo: Apollo) { }

  /**
   * Get All Users from DB.
   */
   private _allUsersWatchQuery: QueryRef<any, EmptyObject>;

   qGetAllUsers(): QueryRef<any, EmptyObject> {
     this._allUsersWatchQuery = this.apollo.watchQuery({
         query: GET_ALLUSERS
     });

     return this._allUsersWatchQuery;
   }


  /**
   * Get one User (by ID) from DB.
   */
   private _oneUserWatchQuery: QueryRef<any, EmptyObject>;

   qGetUser(userId: any): QueryRef<any, EmptyObject> {
     this._oneUserWatchQuery = this.apollo.watchQuery({
         query: GET_USER,
         variables: {
           id: userId,
         }
     });
     return this._oneUserWatchQuery;
   }

   /*qGetUser(userId: any) {
    const request = apolloClient => apolloClient.query({
      query: GET_USER,
      variables: {
        id: userId,
      }
    })

    (async () => {
      const datos = await request(apolloClient);
      console.log(await datos);
    })();
  }*/


   mUserSkillUpdate(userId, skillsList) {
    const update = { valors: skillsList };

    return this.apollo.mutate({
      mutation: MUT_EDIT_USERSKILLS,
      variables: {
        id: userId,
        updateValue: update
      }
    }).pipe(
       map((data) => {
          this._oneUserWatchQuery?.refetch();
       })
    );

   }


  /*
  getUser() {
    //this.httpClient.get('http://localhost:3000/users').subscribe((data: {}) => {
    //  this.employeeData = data;
    //});

    //this.restApi.getEmployee(this.id).subscribe((data: {}) => {
    //  this.employeeData = data;
    //})
  }*/

}
