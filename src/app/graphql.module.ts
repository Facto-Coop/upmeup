/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { NgModule } from '@angular/core';

import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { environment } from 'src/environments/environment';

const localUri = 'http://localhost:3000/graphql';
const ServerUri = 'http://api-factodev.upmeup.es';

export function createApollo(httpLink: HttpLink) {
  console.log('**** Env Uri: ', `http://${environment}`);
    return {
      link: httpLink.create({
        //uri: `http://${environment.apiUrl}/graphql`,
        uri: '/graphql'
      }),
      cache: new InMemoryCache(),
    };
}

@NgModule({
  exports: [ ApolloModule ],
  providers: [{
    provide: APOLLO_OPTIONS,
    useFactory: createApollo,
    deps: [HttpLink],
  }],
})
export class GraphQLModule {}
