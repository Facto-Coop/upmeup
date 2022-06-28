import { NgModule } from '@angular/core';

import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {InMemoryCache} from '@apollo/client/core';

const uri = '/api';

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function createApollo(httpLink: HttpLink) {
    return {
      link: httpLink.create({uri}),
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
