/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { NgModule } from '@angular/core';

import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
//import { environment } from 'src/environments/environment';


//uri: `http://${environment.apiUrl}/graphql`,

export function createApollo(httpLink: HttpLink) {
    return {
      link: httpLink.create({
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
