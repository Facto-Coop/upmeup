import { NgModule } from '@angular/core';

import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {InMemoryCache} from '@apollo/client/core';

const uri = '//localhost:3000/graphql';
//const uri = 'https://48p1r2roz4.sse.codesandbox.io';

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
