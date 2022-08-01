/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { EmptyObject } from 'apollo-angular/types';
import { map } from 'rxjs/operators';

const GET_ALLCOMPET = gql`
query {
  getCompetencies {
  	_id
    name
  }
}
`;

const GET_COMPET = gql`
query getDetailCompet($id: String!) {
  getCompetence(id: $id) {
    _id
    name
  }
}
`;

const MUT_CREATECOMPET = gql`
mutation createCompet($name: String!) {
  createCompetence(
    competenciesDto: { 
      name: $name
    }    
  ) {
    _id
    name
  }
}
`;

@Injectable({
  providedIn: 'root'
})
export class CompetenceService {

  constructor(private apollo: Apollo) { }

  /**
   * Get All Competencies from DB.
  */
  private _competsWatchQuery: QueryRef<any, EmptyObject>;

  qGetCompetencies(): QueryRef<any, EmptyObject> {
    this._competsWatchQuery = this.apollo.watchQuery({
        query: GET_ALLCOMPET
    });

    return this._competsWatchQuery;
  }

  /**
   * Get one Competence (by ID) from DB.
  */
  private _competWatchQuery: QueryRef<any, EmptyObject>;

  qGetCompetence(userId: any): QueryRef<any, EmptyObject> {
    this._competWatchQuery = this.apollo.watchQuery({
        query: GET_COMPET,
        variables: {
          id: userId,
        }
    });
    return this._competWatchQuery;
  }

  /**
   * Mutation to Create a Compentence.
   * @returns new Competence
  */
  mCreateCompetence(iName: any) {
    return this.apollo.mutate({
        mutation: MUT_CREATECOMPET,
        refetchQueries: [{ query: GET_ALLCOMPET }],
        variables: {
          name: iName
        }
    }).pipe(map((data: any) => {
        this._competsWatchQuery?.refetch();
      })
    );
  }

  /*return this.apollo.mutate({
        mutation: MUT_CREATECOMPET,
        variables: {
          name: iName
        }
    }).pipe(
      map((data) => {
        this._competsWatchQuery?.refetch();
      });
    ).subscribe(result => {
      console.log({
        data: result,
      });
    });*/


}
