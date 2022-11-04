/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { NgModule } from '@angular/core';

import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
//import { environment } from 'src/environments/environment';

//uri: `http://${environment.apiUrl}/graphql`,
/*
const link = 'http://localhost:3000/graphql'
const slink = 'http://api-factodev.upmeup.es/graphql'
*/
let host = window.location.hostname;
let protocol = 'https://';

export function createApollo(httpLink: HttpLink) {
    if (host === 'localhost') {
      protocol = 'http://';
      host = host + ':3000';
    }
    console.log('***Connected to: ', protocol + host);
    return {
      link: httpLink.create({
        uri: protocol + host + '/graphql'
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
