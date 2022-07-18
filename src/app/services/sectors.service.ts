/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { EmptyObject } from 'apollo-angular/types';

const GET_ALLSECTORS = gql`
query {
  getSectors {
    _id
    name
  }
}
`;

const GET_SECTOR = gql`
query getSectorDetail($id: String!){
  getSector(id: $id) {
    _id
    name
  }
}
`;

@Injectable({
  providedIn: 'root'
})
export class SectorsService {

  constructor(private apollo: Apollo) { }

  /**
   * Get All Sector from DB.
   */
   private _sectorsWatchQuery: QueryRef<any, EmptyObject>;

   qGetAllSectors(): QueryRef<any, EmptyObject> {
     this._sectorsWatchQuery = this.apollo.watchQuery({
         query: GET_ALLSECTORS,
     });

     return this._sectorsWatchQuery;
   }

  /**
   * Get one Sector (by ID) from DB.
   */
   private _sectorWatchQuery: QueryRef<any, EmptyObject>;

   qGetSector(idValue: any): QueryRef<any, EmptyObject> {
     this._sectorWatchQuery = this.apollo.watchQuery({
         query: GET_SECTOR,
         variables: {
           id: idValue,
         }
     });
     return this._sectorWatchQuery;
   }
}
