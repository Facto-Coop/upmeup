/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { EmptyObject } from 'apollo-angular/build/types';
import { map } from 'rxjs/operators';

const GET_ALLSKILLS = gql`
query {
  getSoftskills {
    _id
    name
  }
}
`;

const GET_SKILL = gql`
query getSkillDetail($id: String!){
  getSkill(id: $id) {
    _id
    name
  }
}
`;

const REFRESH = 1000;

@Injectable({
  providedIn: 'root'
})
export class SoftskillsService {

  constructor(private apollo: Apollo) { }

  /**
   * Get All Skills from DB.
   */
   private _skillsWatchQuery: QueryRef<any, EmptyObject>;

   qGetAllSkills(): QueryRef<any, EmptyObject> {
     this._skillsWatchQuery = this.apollo.watchQuery({
         query: GET_ALLSKILLS,
         //pollInterval: REFRESH
     });

     return this._skillsWatchQuery;
   }

  /**
   * Get one Skill (by ID) from DB.
   */
  private _skillWatchQuery: QueryRef<any, EmptyObject>;

  qGetSkill(idValue: any): QueryRef<any, EmptyObject> {
    this._skillWatchQuery = this.apollo.watchQuery({
        query: GET_SKILL,
        //pollInterval: REFRESH,
        variables: {
          id: idValue,
        }
    });
    return this._skillWatchQuery;
  }

}
