import { MessagingService } from './messaging.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';

const config = {
    apiKey: 'YOUR API KEY',
    authDomain: 'YOUR AUTH DOMAIN',
    databaseURL: 'YOUR DATABASE URL',
    projectId: 'YOUR PROJECT ID',
    storageBucket: 'STORAGE BUCKET',
    messagingSenderId: 'MESSAGEING SENDER ID'
};


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(config)
  ],
  providers: [MessagingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
