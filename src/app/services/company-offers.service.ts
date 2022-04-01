import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

/*export interface Skills {
  id: string;
  name: string[];
}

const GET_SKILLNAME = gql`
  query getUserInfo($id: String!){
    getUser(id: $id) {
      _id
      name 
    }
  }
`;*/

@Injectable({
  providedIn: 'root'
})
export class CompanyOffersService {

  //private findSkillsQuery: QueryRef<{skill: Skills}, { name: string}>;

  constructor() { }

  /*this.charactersQuery = this.apollo.watchQuery({
    query: GET_SKILLNAME
  });

  async getSkills(name: string): Promise<Skills> {
    const result = await this.findSpeciesQuery.refetch({ name });
    return result.data.species;
  }*/
}
