import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from './graphql.module';
import { AuthService } from './services/auth.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

//import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'; //Añadido para probar

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        GraphQLModule,
        ServiceWorkerModule.register('./ngsw-worker.js', {
          enabled: environment.production,
          // Register the ServiceWorker as soon as the application is stable
          // or after 30 seconds (whichever comes first).
          // registrationStrategy: 'registerWhenStable:30000'
        })
    ],
    providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, AuthService],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(httpClient: HttpClient) {}
}

//platformBrowserDynamic().bootstrapModule(AppModule); //Añadido para probar
