/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { EmptyObject } from 'apollo-angular/build/types';
import { map } from 'rxjs/operators';

const GET_USERLOGIN = gql`
  query getLogUser($id: String!) {
    getUser(id: $id) {
      _id
      name
      email
      password
      tipo
    }
  }
`;

const GET_USER = gql`
  query getOneUser($id: String!) {
    getUser(id: $id) {
      _id
      name
      surname
      eduLevel
      city
      sector_id
      email
      tipo
      jobPosition
      lastJobTasks
      experience
      languages
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
      sector_id
      email
      tipo
      jobPosition
      lastJobTasks
      experience
      languages
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
    sector_id
    eduLevel
    jobPosition
    lastJobTasks
    experience
    languages
    valors
  }
}
`;

const MUT_EDIT_USER = gql`
mutation editUser (
                    $id: String!,
                    $name: String!,
                    $surname: String!,
                    $email: String!,
                    $city: String!,
                    $sector_id: String!,
                    $eduLevel: String!,
                    $jobPosition: String!,
                    $lastJobTasks: String!,
                    $experience: String!,
                    $languages: [String!]!
                  ) {

  updateUser(
    id: $id,
    userInputs: {
      name: $name
      surname: $surname
      email: $email
      city: $city
      sector_id: $sector_id
      eduLevel: $eduLevel
      jobPosition: $jobPosition
      lastJobTasks: $lastJobTasks
      experience: $experience
      languages: $languages
    }
  ) {
    _id
    name
    surname
    email
    city
    sector_id
    eduLevel
    jobPosition
    lastJobTasks
    experience
    languages
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

  /**
   * Get one User (by ID).
   */
  /* private _loginUsersWatchQuery: QueryRef<any, EmptyObject>;

   qValidateUser(userId: any): QueryRef<any, EmptyObject> {
     this._loginUsersWatchQuery = this.apollo.watchQuery({
         query: GET_USERLOGIN,
         variables: {
           id: userId,
         }
     });
     return this._loginUsersWatchQuery;
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

   mEditUser(userId, iName: any, iSurname: any, iEmail: any, iCity: any, iSector: any, iEduc: any, iJobPos: any, iLastJob: any, iExp: any, iLang: any) {
    return this.apollo.mutate({
        mutation: MUT_EDIT_USER,
        variables: {
          id: userId,
          name: iName,
          surname: iSurname,
          email: iEmail,
          city: iCity,
          sector_id: iSector,
          eduLevel: iEduc,
          jobPosition: iJobPos,
          lastJobTasks: iLastJob,
          experience: iExp,
          languages: iLang
        }
    }).pipe(
        map((data) => {
          this._oneUserWatchQuery?.refetch();
        })
    );
  }


}
